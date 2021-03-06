import Discord from 'discord.js';
import help from './help';
import ping from './ping';
import prune from './prune';
import role from './role';

export interface Command {
  description: string;
  argsRequired: boolean;
  usage?: string;
  guildOnly: boolean;
  execute: (message: Discord.Message, args: string[]) => void;
}

export interface Commands {
  [key: string]: Command;
}

const commands: Commands = {
  help,
  ping,
  prune,
  role,
};

export default commands;
