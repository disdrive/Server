import { prisma } from '../app';

export const registerUser = async (userId: string, password: string, discordChannelId: string): Promise<void> => {
  await prisma.account.create({
    data: {
      userId,
      password,
      discordChannelId
    },
  });
};
