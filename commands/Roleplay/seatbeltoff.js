const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "seatbeltoff",
    Description: "Removes your seatbelt",
    execute(message){

      if(message.channel.type === 'dm') return

      const member = message.author

      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }
        

      if (cooldown.has(message.author.id)) {
          message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
          } else {

    
          message.delete()

            const useatbelt = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(`<@${message.author.id}> Has unstrapped there seatbelt`)
            .setColor('GREEN');

            message.channel.send(useatbelt)

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            
        }
}}