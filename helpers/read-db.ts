import { db } from "@/lib/db";

export const getUserByAddress = async (address: string) => {
  const user = await db.user.findUnique({
    where: {
      walletAddress: address,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
