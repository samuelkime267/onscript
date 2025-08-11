"use client";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "@/utils";
import { setUser } from "@/redux/user.slice";
import { useRouter } from "next/navigation";
import { useAuthenticate } from "@coinbase/onchainkit/minikit";

export default function useLogin() {
  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState<string>();

  const { address } = useAccount();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { signIn } = useAuthenticate();
  const handleSignIn = async () => {
    if (!address || isFetching) return;
    setIsFetching(true);
    const result = await signIn();

    if (result) {
      try {
        const fidMatch = result.message.match(/farcaster:\/\/fid\/(\d+)/);
        const fid = fidMatch ? Number(fidMatch[1]) : null;

        if (!fid) {
          console.error("FID not found in message");
          return;
        }

        const response = await fetch(`/api/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fid, address }),
        });

        if (!response.ok) {
          setIsError(response.statusText);
          return;
        }

        const { user } = await response.json();
        dispatch(setUser(user));

        console.log("/dashboard");
        router.push("/dashboard");
      } catch {
        setIsError("Something went wrong");
      } finally {
        setIsFetching(false);
      }
    }
  };

  // //////////////////////////////////////////////////////////////////
  // Get User If they exist
  // ///////////////////////////////////////////////////////////////////
  const getUser = useCallback(async () => {
    try {
      if (!address || userFound !== null || isFetching) return;
      setIsFetching(true);
      const response = await fetch(`/api/get-user?address=${address}`);

      if (!response.ok) {
        setIsFetching(false);
        if (response.status === 404) {
          setUserFound(false);
          return;
        }

        setIsError(response.statusText);
        return;
      }

      const { user } = await response.json();
      dispatch(setUser(user));
      router.push("/dashboard");
    } catch {
      setIsError("Something went wrong");
      setIsFetching(false);
    }
  }, [address, dispatch, router, userFound, isFetching]);

  useEffect(() => {
    if (address) getUser();
  }, [getUser, address]);

  return {
    userFound,
    isFetching,
    isError,
    handleSignIn,
    getUser,
  };
}
