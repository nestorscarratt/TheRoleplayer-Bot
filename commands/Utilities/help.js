const Discord = require('discord.js')
const cooldown = new Set();
const config = require(`../../config.json`)

module.exports = {
    name: "help",
    description: "Displays a help menu",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`);
        } else {

        const help = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
        .setTitle(`Help Menu - ${config['bot-name']}`)
        .setDescription(`Hello <@${message.author.id}>, For a list of all my commands use \`/commands\``)
        .addField(`**Commands**`, `Use \`/commands\``)
        .addField(`**Statistics**`, `Use command \`/stats\``)
        .setColor('#36393F');
        message.channel.send(help)

        
        cooldown.add(message.author.id);
            setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 10000);
    }

    }
}