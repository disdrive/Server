import { prisma } from '../app';
import { hashPassword } from '@/utils';

export const registerUser = async (userId: string, password: string, discordChannelId: string): Promise<void> => {
  await prisma.account.create({
    data: {
      userId: userId,
      password: await hashPassword(password),
      discordChannelId: discordChannelId,
    },
  });
};
