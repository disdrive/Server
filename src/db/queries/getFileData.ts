import { prisma } from "../app";

export const getFileData = async (accountId: string, key: string) => {
  const fileData = await prisma.fileData.findFirst({
    where: {
      accountId,
      key
    }
  });

  return fileData;
};
