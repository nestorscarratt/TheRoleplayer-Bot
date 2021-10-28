// THIS CODE WAS DEVELOPED BY EXH0 AND REMASTERED BY RxFlex#7837
// VIEW PUBLIC REP - https://github.com/Rx-Flex0/TheRoleplayer-Bot

const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "admit",
    Description: "Admits a user to the hospital",
    execute(message){

      if(message.channel.type === 'dm') return

      const MEDICAL = message.guild.roles.cache.find(role => role.name === 'MEDICAL')
      const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')

    if (!MEDICAL || !ALLDEPT) {
        return message.channel.send(`This guild is not setup, Try running **/setup**`)
    }

    if (!message.member.roles.cache.has(MEDICAL.id || ALLDEPT.id)) return message.channel.send (`<@${message.author.id}>, Incorrect Permissions. You require MEDICAL/All Departments For this command`)

      const member = message.author

      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }
        

      if (cooldown.has(message.author.id)) {
          message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
          } else {

        const args = message.content.slice("/".length).trim().split(/ +/g);
        const admitTime = args.slice(2).join(" ")

        if(!admitTime) {
            message.react("❌")
            message.channel.send(`<@${message.author.id}>, Try using a correct time parameter **/admit @user 100**`)
          return
        }

        const member = message.mentions.members.first()
        if(!member) {
          message.react("❌")
          message.channel.send(`<@${message.author.id}>, Try Mentioning a valid member of this server`)
          return
        }
            
          message.delete()

          if(admitTime) {
            const admit = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setTitle('Admitted!')
            .setDescription(`<@${message.author.id}> Has admitted <@${member.id}> to hospital for ${admitTime} seconds`)
            .setColor('GREEN');

            message.channel.send(admit)

            member.send(`<@${member.id}>, You have been placed in hospital for ${admitTime} seconds`).catch((err) => message.channel.send(`<@${member.id}> I cannot DM you!`));

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            }
        }
}}