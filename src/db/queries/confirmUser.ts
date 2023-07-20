import { prisma } from "../app";
import { comparePasswords } from "@/utils/comparePasswords";

export const confirmUser = async (userId: string, password: string): Promise<boolean> => {
  const account = await prisma.account.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!account) {
    return false;
  }
  if (await comparePasswords(password, account.password)) {
    return true;
  } else {
    return false;
  }
};
