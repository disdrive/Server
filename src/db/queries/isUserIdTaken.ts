import { prisma } from "../app";

export const isUserIdTaken = async (userId: string): Promise<boolean> => {
  const account = await prisma.account.findUnique({
    where: {
      userId: userId
    }
  });
  return account !== null;
};
