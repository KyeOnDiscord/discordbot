const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv-flow').config();
const config = {
  prefix: process.env.PREFIX,
  token: process.env.TOKEN,
  status: process.env.STATUS,
  sTATUSTYPE: process.env.STATUSTYPE
};
const prefix = config.prefix;
const token = config.token;
const statustype = config.sTATUSTYPE;
const status = config.status;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!` + '\nCurrent Status: ' + statustype + " " + status);
    client.user.setStatus('dnd')
	client.user.setActivity(status, { type: statustype });
});
client.on('message', message => {
if (message.author.bot) return;
if (message.content.indexOf(prefix) !==0) return;
if (!message.content.startsWith(prefix) || message.author.bot) return;
if(message.channel.name == undefined)  return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (command === "status") {
  let status = args[0];
  message.delete()
  if (status === "online") {
	  client.user.setStatus('online')
    return;
  }
  if (status === "offline") {
	  client.user.setStatus('invisible')
    return;
  }
  if (status === "idle") {
	  client.user.setStatus('idle')
    return;
  }
  if (status === "dnd") {
	  client.user.setStatus('dnd')
    return;
  }
  if (status === "help") {
	  message.channel.send('>>> **Status Command** \n Usage `!status <Status Type>` \n Status Types: `online | dnd | idle | offline`');
    return;
  }
  message.reply("That's not a valid status!");
  }

if (command === "say") {
  message.delete();
  let reason = args.slice(0).join(" ");
  message.channel.send(reason);
}

  if (command === "embed") {
    message.delete();
    let reason = args.slice(0).join(" ");
    const heart = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setDescription(reason)
    message.channel.send(heart);
    }

if (command === "setstatus") {
  message.delete();
    let type1 = args[0];
  let reason = args.slice(1).join(" ");
  client.user.setActivity(reason, { type: type1 });
}

});
client.login(token);
