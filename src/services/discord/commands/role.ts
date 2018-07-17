import { Message } from 'discord.js';
import { Command } from '.';

export const execute = (message: Message, args: string[]) => {
  const taggedUser = message.mentions.users.first();
  const selectedRole = args.slice(1).join(' ');
  const guildRoles = message.guild.roles;
  if (guildRoles.find(gr => gr.name === selectedRole)) {
    message.channel.send(`You tried to set ${taggedUser} to ${selectedRole}`);
  } else {
    message.reply(
      `the role ${selectedRole} does not exist, available server roles are: ${guildRoles
        .map(gr => `${gr.name}`)
        .join(', ')}`,
    );
  }
};

const role: Command = {
  execute,
  argsRequired: true,
  description: 'Change a users role',
  usage: '<user> <role>',
  guildOnly: true,
};

export default role;
