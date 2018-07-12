import Discord from 'discord.js';
import logger from '../logger';

const prefix = '!';

export const run = () => {
  const client = new Discord.Client();

  client.on('ready', () => {
    logger.info(`Running on: ${client.guilds.map(guild => guild.name)}`);
  });

  client.login(process.env.DISCORD_TOKEN);

  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (command === 'args-info') {
      args.length > 0
        ? message.channel.send(`Command name: ${command}\nArguments: ${args}`)
        : message.channel.send(
            `You didn't provide any arguments, ${message.author}!`,
          );
    }

    if (command === 'avatar') {
      if (!message.mentions.users.size) {
        return message.channel.send(
          `Your avatar: ${message.author.displayAvatarURL}`,
        );
      }
      const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: ${user.displayAvatarURL}`;
      });
      message.channel.send(avatarList);
    }

    if (command === 'prune') {
      const amount = parseInt(args[0], 10) + 1;

      if (isNaN(amount)) {
        return message.reply("that doesn't seem to be a valid number.");
      }

      if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
      }
      try {
        message.channel.bulkDelete(amount, true);
      } catch (error) {
        logger.error(error);
      }
    }

    if (command === 'kick') {
      if (!message.mentions.users.size) {
        return message.reply('you need to tag a user in order to kick them!');
      }
      const taggedUser = message.mentions.users.first();
      message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }

    if (command === 'ping') {
      message.channel.send('pong');
    }

    if (command === 'server') {
      message.channel.send(`This server's name is: ${message.guild.name}`);
    }

    if (command === 'user') {
      message.channel.send(
        `Your username: ${message.author.username}\nYour ID: ${
          message.author.id
        }`,
      );
    }
  });
};
