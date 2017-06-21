const Discord = require('../node_modules/discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === '!oho') {
	console.log(message.client.voiceChannel);
    message.reply(message.author.id);
  }
});

client.login('');