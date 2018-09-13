// setup requirements
const {
    Client
} = require("discord.js");
const axios = require("axios");
const config = require("./config.json");
const students = require("./students.json");
const {
    execFile
} = require('child_process');

// create client
const client = new Client();

// function to change a student's status
function changeStatus(statusString) {
    // name, status, info, returnTime
    let args = statusString.split(":");
    var getString = "http://attendance.pscs.org/log.php?crypt=" + config.attendance_pw + "&studentid=" + students.student_ids[args[0]] + "&statusid=" + config.status_ids[args[1]];
    if (args[2] != "none")
        getString += "&info=" + args[2];
    if (args[3] != "none")
        getString += "&returntime=" + args[3];
    console.log(getString);
    axios.get(getString);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("with the db :wink:");
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.channel.send('pong');

    } else if (msg.content.startsWith(config.prefix + "changeStatus")) {
        let args = msg.content.split(" ");
        let statusString = "";
        for (var i = 1; i < args.length; i++) {
            statusString += args[i] + ":";
        }
        changeStatus(statusString);

    } else if (msg.content.startsWith(config.prefix + 'offsite')) {
        if (msg.content.split(" ").length != 2) {
            msg.channel.send("Please provide a name, like this 'offsite Alex'");
        } else {
            const child = execFile('python3', ['./api/offsite.py', msg.content.split(" ")[1]], (error, stdout) => {
                if (error) {
                    throw error;
                }
                msg.channel.send(stdout);
            });
        }
    }
});


client.login(config.token);
// perms int
// 108544

// invite link
// https://discordapp.com/oauth2/authorize?client_id=357592220611641344&scope=bot&permissions=108544