import { Message } from 'discord.js';
import { Command } from './';

export const execute = (message: Message, args: string[]) => {
  const amount = parseInt(args[0], 10) + 1;
  if (isNaN(amount)) {
    return message.reply("that doesn't seem to be a valid number.");
  }

  if (amount <= 1 || amount > 100) {
    return message.reply('you need to input a number between 1 and 99.');
  }
  message.channel.bulkDelete(amount, true);
};

const prune: Command = {
  execute,
  description: 'Deletes a suppiled number of messages in the current channel',
  guildOnly: false,
  argsRequired: true,
  usage: '<number>',
};

export default prune;
