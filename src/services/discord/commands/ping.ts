import { Command } from './';

const ping: Command = {
  argsRequired: false,
  description: 'Ping!',
  guildOnly: false,
  execute(message, args) {
    message.channel.send('Pong.');
  },
};

export default ping;
