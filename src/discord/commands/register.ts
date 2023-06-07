import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/discord';
import { isUserIdTaken } from '../../db';
import { registerUser } from '../../db';

export const register: Command = {
  data: new SlashCommandBuilder().setName('register').setDescription('register your account')
    .addStringOption(option => option.setName('userid').setDescription('Use at least 6 characters.').setRequired(true))
    .addStringOption(option => option.setName('password').setDescription('Use at least 6 characters, including both numbers and letters').setRequired(true)),
  execute: async (interaction) => {
    const userId = interaction.options.getString('userid');
    const password = interaction.options.getString('password');
    if (!userId || !password) {
      // await interaction.reply('Please input userid and password.');
      return;
    }

    // error handling
    let error = false;
    let errorMessages = '';
    if (userId.length < 6) {
      error = true;
      errorMessages += 'Please make your user ID at least 6 characters long.\n';
    }
    if (await isUserIdTaken(userId)) {
      error = true;
      errorMessages += 'Please use a different user ID. That one is already taken.\n';
    }
    if (password.length < 6) {
      error = true;
      errorMessages += 'Please make your password at least 6 characters long.\n';
    }
    if (!/\d/.test(password)) {
      error = true;
      errorMessages += 'Please include at least one number in your password.\n';
    }
    if (!/[a-zA-Z]/.test(password)) {
      error = true;
      errorMessages += 'Please include at least one letter in your password.\n';
    }
    if (error) {
      await interaction.reply(errorMessages);
      return;
    }

    try {
      await registerUser(userId, password, interaction.channelId as string);
      await interaction.reply('Your account has been registered.');
      return;
    } catch (error) {
      await interaction.reply('Sorry, there was an error trying to register your account. Please try again later.\nerror: \n```\n' + error + '\n```');
      return;
    }
  }
}
