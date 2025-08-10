"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { AUTH_RELAY, DOMAIN, SIWE_URI } from "@/constants";
import { useAppDispatch } from "@/utils";
import { setUser } from "@/redux/user.slice";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const [farcasterConnectUrl, setFarcasterConnectUrl] = useState<string>();
  const [channelToken, setChannelToken] = useState<string>();
  const [nonce, setNonce] = useState<string>();
  const [retry, setRetry] = useState<"getUser" | "createUser">();
  const [startRetry, setStartRetry] = useState(false);
  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [getUrl, setGetUrl] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [isFarcasterModal, setIsFarcasterModal] = useState(false);
  const [isError, setIsError] = useState<string>();
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const continueLoopRef = useRef(true);

  const resetPolling = useCallback(() => {
    setIsPolling(false);
    setFarcasterConnectUrl(undefined);
    setChannelToken(undefined);
    setNonce(undefined);
  }, []);

  // //////////////////////////////////////////////////////////////////
  // Get User If they exist
  // ///////////////////////////////////////////////////////////////////
  const getUser = useCallback(async () => {
    try {
      if (!address) return;
      setIsFetching(true);
      setRetry(undefined);
      setStartRetry(false);
      const response = await fetch(`/api/get-user?address=${address}`);

      if (!response.ok) {
        setIsFetching(false);
        setIsFarcasterModal(true);

        if (response.status === 404) {
          setUserFound(false);
          setGetUrl(true);
          return;
        }

        setRetry("getUser");
        setIsError("Something went wrong");
        console.error(response.statusText);
        return;
      }

      const { user } = await response.json();
      dispatch(setUser(user));
      console.log(user);

      console.log("/dashboard");
      router.push("/dashboard");
    } catch {
      setRetry("getUser");
      setIsError("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }, [address, dispatch, router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (retry === "getUser" && startRetry) {
      getUser();
    }
  }, [retry, getUser, startRetry]);

  // //////////////////////////////////////////////////////////////////
  // Get Farcaster Connect URL
  // ///////////////////////////////////////////////////////////////////
  const fetchFarcasterConnectUrl = useCallback(async () => {
    if (!getUrl) return;

    if (!address) {
      setIsError("Please connect wallet");
      return;
    }
    if (farcasterConnectUrl) return;

    try {
      setIsFetching(true);

      const response = await fetch(`${AUTH_RELAY}/v1/channel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siweUri: SIWE_URI,
          domain: DOMAIN,
        }),
      });

      if (!response.ok) {
        setIsError("Something went wrong");
        console.error(response.statusText);
        return;
      }

      const { connectUri, nonce, channelToken } = await response.json();

      setFarcasterConnectUrl(connectUri);
      setNonce(nonce);
      setChannelToken(channelToken);
      setIsPolling(true);

      console.log("data", { connectUri, nonce, channelToken });
      setGetUrl(false);
    } catch (error) {
      console.error("Error fetching Farcaster URL:", error);
      setIsError("Unable to get Farcaster URL");
    } finally {
      setIsFetching(false);
    }
  }, [
    getUrl,
    address,
    setIsError,
    setIsFetching,
    setFarcasterConnectUrl,
    setNonce,
    setChannelToken,
    setIsPolling,
    setGetUrl,
    farcasterConnectUrl,
  ]);
  useEffect(() => {
    fetchFarcasterConnectUrl();
  }, [fetchFarcasterConnectUrl]);

  // //////////////////////////////////////////////////////////////////
  // Create user in the database
  // ///////////////////////////////////////////////////////////////////
  const createUser = useCallback(
    async ({
      displayName,
      fid,
      pfpUrl,
      username,
    }: {
      displayName: string;
      fid: string;
      pfpUrl: string;
      username: string;
    }) => {
      try {
        setIsFetching(true);

        const createUserResponse = await fetch("/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            displayName,
            fid,
            pfpUrl,
            username,
          }),
        });

        if (!createUserResponse.ok) {
          setIsError(createUserResponse.statusText);
          console.error(createUserResponse.statusText);
          setIsFetching(false);
          return;
        }

        const { user } = await createUserResponse.json();

        dispatch(setUser(user));
        resetPolling();
        setIsFarcasterModal(false);
        toast.success("Account created successfully");
        router.push("/dashboard");
      } catch (err) {
        console.error("Error creating user:", err);
        setIsError("Failed to create user");
      } finally {
        setIsFetching(false);
      }
    },
    [address, dispatch, resetPolling, router], // dependencies
  );

  // //////////////////////////////////////////////////////////////////
  // Polling
  // ///////////////////////////////////////////////////////////////////

  const polling = useCallback(async () => {
    if (!continueLoopRef.current) return;

    if (!address) {
      setIsError("Please connect wallet");
      setIsPolling(false);
      return;
    }

    if (!nonce || !isPolling || !channelToken) {
      setIsPolling(false);
      return;
    }

    try {
      const response = await fetch(`${AUTH_RELAY}/v1/channel/status`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${channelToken}`,
          channelToken,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsError("Timeout, please try again");
          setGetUrl(true);
          resetPolling();
          return;
        }
        setIsError("Something went wrong");
        console.error(response.statusText, { channelToken, nonce });
        setIsPolling(false);
        return;
      }

      const { displayName, fid, pfpUrl, username, state } =
        await response.json();
      console.log({ state });

      if (state === "pending") return;
      continueLoopRef.current = false;

      createUser({ displayName, fid, pfpUrl, username });
    } catch (error) {
      console.error("Polling error:", error);
      setIsError("Something went wrong while polling");
      setIsPolling(false);
    }
  }, [
    address,
    nonce,
    isPolling,
    channelToken,
    createUser,
    resetPolling,
    setGetUrl,
  ]);

  // start polling
  useEffect(() => {
    if (!isPolling) return;
    let id: NodeJS.Timeout;
    if (isPolling) id = setInterval(polling, 2000);

    return () => clearInterval(id);
  }, [isPolling, polling]);

  return {
    createUser,
    polling,
    resetPolling,
    userFound,
    getUrl,
    isFetching,
    isPolling,
    isFarcasterModal,
    isError,
    farcasterConnectUrl,
    setFarcasterConnectUrl,
    channelToken,
    setChannelToken,
    nonce,
    setNonce,
    setIsFarcasterModal,
    retry,
    startRetry,
    setStartRetry,
  };
}
