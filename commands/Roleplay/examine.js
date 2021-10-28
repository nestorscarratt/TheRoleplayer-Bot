const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "examine",
    Description: "Checks a user for injures",
    execute(message){

      if(message.channel.type === 'dm') return

      const member = message.author

      const LEO = message.guild.roles.cache.find(role => role.name === 'LEO')
      const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')

    if (!LEO || ALLDEPT) {
        return message.channel.send(`This guild is not setup, Try running **/setup**`)
    }

    if (!message.member.roles.cache.has(MEDICAL.id || ALLDEPT.id)) return message.channel.send (`<@${message.author.id}>, Incorrect Permissions. You require MEDICAL/All Departments For this command`)

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
            const examine = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setTitle(`Checking for injures`)
            .setDescription(`<@${message.author.id}> is checking <@${member.id}> for injures`)
            .setColor('GREEN');

            message.channel.send(examine)

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            }
        }
}}