const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(config.token);
// perms int 
// 108544

// invite link 
// https://discordapp.com/oauth2/authorize?client_id=357592220611641344&scope=bot&permissions=108544