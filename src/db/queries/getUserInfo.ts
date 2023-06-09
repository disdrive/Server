import { prisma } from "../app";

export const getUserInfo = async (userId: string) => {
  const user = await prisma.account.findUnique({ where: { userId } });
  return user;
}
