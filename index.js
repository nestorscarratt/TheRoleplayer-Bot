// THIS CODE WAS DEVELOPED BY EXH0 AND REMASTERED BY RxFlex#7837
// VIEW PUBLIC REP - https://github.com/Rx-Flex0/TheRoleplayer-Bot

const Discord = require('discord.js');

const client = new Discord.Client()

const config = require('./config.json');

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const roleplay = fs.readdirSync('./commands/Roleplay').filter(file => file.endsWith('.js'));

for (const file of roleplay) {
    const command = require(`./commands/Roleplay/${file}`);
    client.commands.set(command.name, command);
}

const utilities = fs.readdirSync('./commands/Utilities').filter(file => file.endsWith('.js'));

for (const file of utilities) {
    const command = require(`./commands/Utilities/${file}`);
    client.commands.set(command.name, command);
}

client.login(config.token);

client.on("ready", () => {
    console.log(`[START] ${client.user.tag} has loaded`)
});

// These are the messages the bot will display as the status (Auto Changes Every 10 Seconds)
const activities_list = [
    `Status 1`,
    `Status 2`,
    `Status 3`,
    ]; 
    
    client.on('ready', () => {
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            client.user.setActivity(activities_list[index], { type: 'WATCHING' }); 
        }, 10000);
    });

    client.on('message', message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
        const args = message.content.slice(config.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        if (!client.commands.has(command)) return;
    
        try {
            client.commands.get(command).execute(message, client, args, Discord)
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    });