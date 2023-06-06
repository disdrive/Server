import { Client, GatewayIntentBits, Events, Interaction, ChatInputCommandInteraction } from 'discord.js';
import dotenv from 'dotenv';
import { commands } from './commands'

dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
  c.application?.commands
    .set(commands.map((command) => command.data))
    //.set(Array.from(commands.map((command) => command.data)))
    .then(() => {
      console.log('Commands set.');
    });
});

client.addListener(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const commandName = interaction.commandName;
  const command = commands.find((command) => command.data.name === commandName);
  if (!command) {
    console.log('commands not found');
    return;
  }
  try {
    // execute command
    await command.execute(interaction as ChatInputCommandInteraction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});
