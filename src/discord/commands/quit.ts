import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../type';
import { confirmUser } from '../../db/index';
import { deleteUser } from '../../db/index';

export const quit: Command = {
  data: new SlashCommandBuilder().setName('quit').setDescription('quit your account')
    .addStringOption(option => option.setName('userid').setRequired(true))
    .addStringOption(option => option.setName('password').setRequired(true)),
  execute: async (interaction) => {
    const userId = interaction.options.getString('userid');
    const password = interaction.options.getString('password');
    if (!userId || !password) {
      // await interaction.reply('Please input userid and password.');
      return;
    }

    if (await confirmUser(userId, password)) {
      await interaction.reply('User id or password is incorrect.');
    }

    try {
      await deleteUser(userId, password);
      await interaction.reply('You have successfully quit your account.');
      return;
    } catch (error) {
      await interaction.reply('Sorry, there was an error trying to quit your account. Please try again later.\nerror: \n```\n' + error + '\n```');
      return;
    }
  }
}
