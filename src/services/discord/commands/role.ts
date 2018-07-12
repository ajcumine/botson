import logger from '../../logger';
import { Command } from './';

const role: Command = {
  argsRequired: true,
  description: 'Change a users role',
  usage: '<user> <role>',
  guildOnly: true,
  execute(message, args) {
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
  },
};

export default role;
