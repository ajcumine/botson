import Discord from 'discord.js';
import logger from '../logger';
import commands from './commands';

export const PREFIX = '!';

export const run = () => {
  const client = new Discord.Client();

  client.on('ready', () => {
    logger.info(`Running on: ${client.guilds.map(guild => guild.name)}`);
  });

  client.login(process.env.DISCORD_TOKEN);

  client.on('message', message => {
    if (
      process.env.PEACH_REACTION_TRIGGER &&
      message.content.toLowerCase().includes(process.env.PEACH_REACTION_TRIGGER)
    ) {
      message.react('🍑');
    }

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift();

    if (!commandName || !commands[commandName]) return;

    try {
      const command = commands[commandName];

      if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('This command cannot be run inside DMs!');
      }

      if (command.argsRequired && !args.length) {
        let reply = 'this command requires arguments';
        if (!!command.usage) {
          reply += `\nThe proper usage would be: \`${PREFIX}${commandName} ${
            command.usage
          }\``;
        }

        return message.reply(reply);
      }

      command.execute(message, args);
    } catch (error) {
      logger.error(error);
      message.reply('there was an error trying to execute that command');
    }
  });
};
