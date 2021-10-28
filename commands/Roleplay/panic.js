const Discord = require('discord.js')
const client = new Discord.Client()
const cooldown = new Set()

module.exports = {
    name: "panic",
    Description: "Panic Button - LEO + MEDICAL",
    execute(message) {

    if(message.channel.type === 'dm') return

    const LEO = message.guild.roles.cache.find(role => role.name === 'LEO')
    const MEDICAL = message.guild.roles.cache.find(role => role.name === 'MEDICAL')
    const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')

  if (!LEO || !ALLDEPT || !MEDICAL) {
      return message.channel.send(`This guild is not setup, Try running **/setup**`)
  }

  if(!message.member.roles.cache.some(role => role.name === 'LEO'|| role.name === 'MEDICAL' || role.name === 'All Departments')) return message.channel.send (`<@${message.author.id}>, Incorrect Permissions. You require MEDICAL/LEO/All Departments For this command`)

    const args = message.content.slice("/".length).split(/ +/);

    const member = message.author

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
      return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
    }

    if (message.member.roles.cache.has(`878010044778684486`)) {
      message.react("❌")
      member.send(`<@${message.author.id}> You cannot execute that command in **${message.guild.name}**`)
      return
    }

    if (cooldown.has(message.author.id)) {
        message.channel.send(`<@${message.author.id}>, Your panic button is unavailable for another 120 seconds`)
    } else {   
        
    const DISPATCH = message.guild.roles.cache.find(role => role.name === 'DISPATCH')

    const emergency = args.slice(1).join(" ")
    if(!emergency) return message.channel.send(`<@${message.author.id}>, Try using correct arguments **/panic Yellow Jack: Shots fired**`)
    
    message.delete()

    message.channel.send(`<@&${DISPATCH.id}>`)

    const call = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
    .setTitle('***Panic Button Pressed***')
    .setDescription(`<@${message.author.id}> Has used there panic button`)
    .addField('**Panic Description**', emergency)
    .setColor('GREEN');

    message.channel.send(call)

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 50000);
    }
}
}