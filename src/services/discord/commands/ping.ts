import { Command } from './';

export const execute = message => {
  message.channel.send('Pong.');
};

const ping: Command = {
  execute,
  argsRequired: false,
  description: 'Ping!',
  guildOnly: false,
};

export default ping;
