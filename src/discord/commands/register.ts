
import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { command } from '../type';

export const register: command = {
  data: new SlashCommandBuilder().setName('register').setDescription('register your account'),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('pong!');
  },
}
