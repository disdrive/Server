import { Client, Events } from 'discord.js';
import { client } from './app';
import { commands } from './commands'
import type { command } from './type';

client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
  c.application?.commands
    .set(Array.from(commands.map((command: command) => command.data)))
    .then(() => {
      console.log('Commands set.');
    });
});
