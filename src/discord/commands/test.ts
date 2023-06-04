import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { command } from '../type';

export const test: command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('test command'),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('pong!');
  },
}
