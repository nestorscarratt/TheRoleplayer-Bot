const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = {
    name: 'announce',
    description: 'Sends an announcement',
    execute(message){
        const args = message.content.slice(config.prefix.length).split(/ +/);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`<@${message.author.id}> You do not have permission to use that command`)

        const msg = args.slice(1).join(" ")
        if(!msg) return message.channel.send(`<@${message.author.id}> Incorrect usage, **${config.prefix}announce <message>**`)

        if(message) {
            message.delete()

            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(msg)
            .setColor(`BLUE`)
            .setFooter(`${message.guild.name}`, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
}