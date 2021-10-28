const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "pulse",
    description: "Checks someones pulse",
    execute(message){

      if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

      const member = message.author

      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
        } 
        else {
            
          const member = message.mentions.members.first()
          if(!member) {
            message.react("❌")
            message.channel.send(`<@${message.author.id}>, Try Mentioning a valid member of this server`)
            return
          }

        message.delete()
        
        if(member) {
        const cpr = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
        .setTitle('Checking Pulse')
        .setDescription(`<@${message.author.id}> Attempts to Checks <@${member.id}>'s pulse and is now waiting for a result`)
        .setColor('GREEN');

        message.channel.send(cpr)

        cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 10000);
        }
    }
        
    }
}