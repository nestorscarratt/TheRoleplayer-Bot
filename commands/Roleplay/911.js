// THIS CODE WAS DEVELOPED BY EXH0 AND REMASTERED BY RxFlex#7837
// VIEW PUBLIC REP - https://github.com/Rx-Flex0/TheRoleplayer-Bot

const Discord = require('discord.js')
const client = new Discord.Client()
const cooldown = new Set()

module.exports = {
    name: "911",
    Description: "Calls 911",
    execute(message) {

    if(message.channel.type === 'dm') return

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
        message.channel.send(`<@${message.author.id}>, 911 is unavailable for another 120 seconds`)
    } else {   
        
    const DISPATCH = message.guild.roles.cache.find(role => role.name === 'DISPATCH')

    const emergency = args.slice(1).join(" ")
    if(!emergency) return message.channel.send(`<@${message.author.id}>, Try using correct arguments **/911 Fire in yellow jack**`)
    
    message.delete()

    message.channel.send(`<@&${DISPATCH.id}>`)

    const call = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
    .setTitle('Dialing 911...')
    .setDescription(`<@${message.author.id}> Is calling 911, an operator will be with you soon`)
    .addField('**Emergency**', emergency)
    .setColor('GREEN');

    message.channel.send(call)

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 50000);
    }
}
}