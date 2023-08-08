import { prisma } from "../app";

export const deleteUser = async (userId: string): Promise<void> => {
  await prisma.account.delete({
    where: {
      userId: userId
    }
  });
};
