const Discord = require('discord.js')
const cooldown = new Set();
const config = require(`../../config.json`)

module.exports = {
    name: "stats",
    description: "Displays The bots current statistics",
    execute(message, client){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`);
        } else {

        var ping = new Date().getTime() - message.createdTimestamp
        var apiping = Math.round(client.ws.ping)

        // Change this to the last time your bot was updated
        const v = "27/10/2021 - 12:40"

        const stats = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
        .setTitle(`Stats - ${config['bot-name']}`)
        .setDescription(`Last Updated: **${v}**`)
        .addField(`**Bot Latency**`, `${ping}ms`)
        .addField(`**API Latency**`, `${apiping}ms`)
        .addField(`**Guilds**`, `${client.guilds.cache.size} Servers`)
        .addField(`**Users**`, `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members`)
        .setFooter(`Bot Developed By RxFlex#7837`)
        .setColor(`#36393F`);
        message.channel.send(stats);

        
        cooldown.add(message.author.id);
            setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 10000);
    }
  }
}