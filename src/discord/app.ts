import { Client, GatewayIntentBits, Events } from 'discord.js';
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
    .set(Array.from(commands.map((command) => command.data)))
    .then(() => {
      console.log('Commands set.');
    });
});

client.login(process.env.DISCORD_TOKEN);
