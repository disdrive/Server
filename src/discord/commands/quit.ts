import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { command } from '../type';

export const quit: command = {
  data: new SlashCommandBuilder().setName('quit').setDescription('quit your account')
    .addStringOption(option => option.setName('userid').setRequired(true))
    .addStringOption(option => option.setName('password').setRequired(true)),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const userId = interaction.options.getString('userid');
    const password = interaction.options.getString('password');
    if (!userId || !password) {
      // await interaction.reply('Please input userid and password.');
      return;
    }

    // if (confirmUser(userId, password)) {
    //   await interaction.reply('User id or password is incorrect.');
    // }

    try {
      // await deleteUser(userId, password);
      await interaction.reply('You have successfully quit your account.');
      return;
    } catch (error) {
      await interaction.reply('Sorry, there was an error trying to quit your account. Please try again later.\nerror: \n```\n' + error + '\n```');
      return;
    }
  }
}
