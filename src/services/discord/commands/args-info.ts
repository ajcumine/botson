import { Command } from './';

const argsInfo: Command = {
  argsRequired: true,
  description: 'Information about the arguments provided.',
  guildOnly: false,
  execute(message, args) {
    message.channel.send(
      `Arguments: ${args}\nArguments length: ${args.length}`,
    );
  },
};

export default argsInfo;
