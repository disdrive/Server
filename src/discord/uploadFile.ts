import { AttachmentBuilder } from "discord.js";
import { client } from "./app";

export const uploadFile = async (channelId: string, filePath: string) => {
  const attachment = new AttachmentBuilder(filePath);
  const channel = client.channels.cache.get(channelId);
  if (channel === undefined) return false;
  if (!channel.isTextBased()) return false;
  await channel.send({ files: [attachment] });
};
