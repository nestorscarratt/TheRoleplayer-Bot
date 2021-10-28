const cooldown = new Set();
const Discord = require('discord.js');

module.exports = {
    name: "hotwire",
    description: "Hotwires your current vehicle",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        const member = message.author
  
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
          return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
        }

        
           if (cooldown.has(message.author.id)) {
                message.channel.send(`<@${message.author.id}>, You can hotwire again in 25 seconds`)
            } else {
            
            message.delete()
            const ulcar = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(`<@${message.author.id}> Has started to hotwire a vehicle. **Wait 25 seconds**`)
            .setColor('GREEN');

            message.channel.send(ulcar)

            cooldown.add(message.author.id);
            setTimeout(() => {
            message.channel.send(`<@${message.author.id}>, Hotwire complete`)
              cooldown.delete(message.author.id);
            }, 25000);
        }

    }
}