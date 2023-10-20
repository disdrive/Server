import { AttachmentBuilder } from "discord.js";
import { client } from "./app";

export const uploadFile = async (channelId: string, filePath: string) => {
  const attachment = new AttachmentBuilder(filePath);
  const channel = client.channels.cache.get(channelId);
  if (channel === undefined) throw new Error("Channel not found");
  if (!channel.isTextBased()) throw new Error("Channel is not text based");
  const message = await channel.send({ files: [attachment] });

  return message.attachments.first()?.url || "";
};
