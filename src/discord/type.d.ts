import { ChatInputCommandInteraction } from "discord.js";

export type command = {
  data: { name: string; description: string };
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
