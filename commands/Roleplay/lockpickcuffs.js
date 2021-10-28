const cooldown = new Set();
const Discord = require('discord.js');

module.exports = {
    name: "lockpickcuffs",
    description: "Begins to lockpick cuffs",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        const member = message.author

        const CIV = message.guild.roles.cache.find(role => role.name === 'CIV')
        const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')
  
      if (!CIV || !ALLDEPT) {
          return message.channel.send(`This guild is not setup, Try running **/setup**`)
      }
  
      if(!message.member.roles.cache.some(role => role.name === 'CIV'|| role.name === 'All Departments')) return message.channel.send (`<@${message.author.id}>, Incorrect Permissions. You require CIV/All Departments For this command`)
  
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
          return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
        }

        
           if (cooldown.has(message.author.id)) {
                message.channel.send(`<@${message.author.id}>, You can lockpick again in 25 seconds`)
            } else {
            
            message.delete()
            const ulcar = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(`<@${message.author.id}> Has started to lockpick there cuffs. **Wait 40 seconds**`)
            .setColor('GREEN');

            message.channel.send(ulcar)

            cooldown.add(message.author.id);
            setTimeout(() => {
            message.channel.send(`<@${message.author.id}>, Lockpick complete`)
              cooldown.delete(message.author.id);
            }, 40000);
        }

    }
}