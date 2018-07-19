import { Message } from 'discord.js';
import { Command } from './';

export const execute = (message: Message) => {
  message.channel.send('Pong.');
};

const ping: Command = {
  execute,
  argsRequired: false,
  description: 'Ping!',
  guildOnly: false,
};

export default ping;
