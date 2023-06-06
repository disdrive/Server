import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../type';

export const test: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('test command'),
  execute: async (interaction) => {
    await interaction.reply('pong!');
  },
}
