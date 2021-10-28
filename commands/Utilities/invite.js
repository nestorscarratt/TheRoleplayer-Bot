const Discord = require('discord.js')
const cooldown = new Set();

module.exports = {
    name: "invite",
    description: "Gives invite menu",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`);
        } else {

        const inv = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
        .setDescription(`<@${message.author.id}>, This is a public bot, Check out the code (here)[https://github.com/Rx-Flex/theroleplayer-bot]`)
        .setColor('#36393F');
        message.channel.send(inv)

        
        cooldown.add(message.author.id);
            setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 10000);
    }

    }
}