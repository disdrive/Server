import { prisma } from "../app";

export const confirmUser = async (userId: string, password: string): Promise<boolean> => {
  const account = await prisma.account.findUnique({
    where: {
      userId: userId,
    },
  });
  if (account && account.password === password) {
    return true;
  } else {
    return false;
  }
};
