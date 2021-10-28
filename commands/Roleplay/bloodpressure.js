const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "bloodpressure",
    Description: "Checks a users blood pressure",
    execute(message){

      if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

      const member = message.author

      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }
        

      if (cooldown.has(message.author.id)) {
          message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
          } else {


        const member = message.mentions.members.first()
        if(!member) {
          message.react("❌")
          message.channel.send(`<@${message.author.id}>, Try Mentioning a valid member of this server`)
          return
        }
            
          message.delete()

          if(member) {
            const bp = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setTitle('Checking Blood Pressure')
            .setDescription(`<@${message.author.id}> Attaches a blood pressure monitor to <@${member.id}> and is now waiting for a reading`)
            .setColor('GREEN');

            message.channel.send(bp)

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            }
        }
}}