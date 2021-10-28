const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "jail",
    Description: "Places a user in jail",
    execute(message){

      if(message.channel.type === 'dm') return

      const LEO = message.guild.roles.cache.find(role => role.name === 'LEO')
      const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')

    if (!LEO || !ALLDEPT) {
        return message.channel.send(`This guild is not setup, Try running **/setup**`)
    }

    if(!message.member.roles.cache.some(role => role.name === 'LEO'|| role.name === 'All Departments')) return message.channel.send (`<@${message.author.id}>, Incorrect Permissions. You require LEO/All Departments For this command`)

      const member = message.author

      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }
        

      if (cooldown.has(message.author.id)) {
          message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
          } else {

        const args = message.content.slice("/".length).trim().split(/ +/g);
        const jailTime = args.slice(2).join(" ")

        if(!jailTime) {
            message.react("❌")
            message.channel.send(`<@${message.author.id}>, Try using a correct time parameter **/jail @user 100**`)
          return
        }

        const member = message.mentions.members.first()
        if(!member) {
          message.react("❌")
          message.channel.send(`<@${message.author.id}>, Try Mentioning a valid member of this server`).then(msg => {
            setTimeout(() => msg.delete(), 5000)
          })
          return
        }
            
          message.delete()

          if(jailTime) {
            const jail = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setTitle('Placed in jail')
            .setDescription(`<@${message.author.id}> Has placed <@${member.id}> into jail for ${jailTime} seconds`)
            .setColor('GREEN');

            message.channel.send(jail)

            member.send(`<@${member.id}>, You have been placed in jail for ${jailTime} seconds`).catch((err) => message.channel.send(`<@${member.id}> I cannot DM you!`));

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            }
        }
}}