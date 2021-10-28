const Discord = require('discord.js')
const client = new Discord.Client();
const cooldown = new Set()

module.exports = {
    name: "bodycam",
    Description: "Equips and turns on your bodycam",
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

    
          message.delete()

            const lockcar = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setTitle(`Starts recording`)
            .setDescription(`<@${message.author.id}> Starts recording with there bodycam`)
            .setColor('GREEN');

            message.channel.send(lockcar)

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            
        }
}}