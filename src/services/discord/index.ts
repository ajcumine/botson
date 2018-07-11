import Discord from 'discord.js';

export const run = () => {
  const client = new Discord.Client();

  client.on('ready', () => {
    console.log('Ready!');
  });

  client.login(process.env.DISCORD_TOKEN);

  client.on('message', message => {
    if (message.content === '!ping') {
      message.channel.send('pong');
    }
  });
};
