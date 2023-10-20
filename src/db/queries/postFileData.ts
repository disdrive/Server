import { prisma } from "../app";

export const postFileData = async (accountId: string, name: string, key: string, discordUrl: string) => {
  await prisma.fileData.create({
    data: {
      accountId,
      name,
      key,
      discordUrl,
      date: new Date()
    }
  });
};
