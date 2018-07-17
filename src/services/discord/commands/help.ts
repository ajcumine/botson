import { Message } from 'discord.js';
import { PREFIX } from '../';
import logger from '../../logger';
import commands, { Command } from './';

export const execute = async (message: Message, args: string[]) => {
  const data: string[] = [];
  if (!args.length) {
    data.push("Here's a list of all my commands:");
    data.push(
      Object.keys(commands)
        .map(commandKey => `\`${PREFIX}${commandKey}\``)
        .join(`, `),
    );
    data.push(
      `\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command!`,
    );

    try {
      await message.author.send(data, { split: true });
      if (message.channel.type === 'dm') return;
      return message.reply("I've sent you a DM with all my commands!");
    } catch (error) {
      logger.error(`Could not send help DM to ${message.author.tag}.\n`, error);
      message.reply("it seems like I can't DM you! Do you have DMs disabled?");
    }
  }

  const commandName = args[0];
  const command = commands[commandName];

  if (!command) {
    return message.reply("that's not a valid command!");
  }

  data.push(`**Name:** ${commandName}`);
  data.push(`**Description:** ${command.description}`);
  if (command.usage) {
    data.push(`**Usage:** \`${PREFIX}${commandName} ${command.usage}\``);
  }

  return message.channel.send(data, { split: true });
};

const help: Command = {
  execute,
  description:
    'Provide a list of all the bot commands or specific info for a single command',
  argsRequired: false,
  guildOnly: false,
  usage: '[command name]',
};

export default help;
