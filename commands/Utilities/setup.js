const Discord = require('discord.js')
const cooldown = new Set();
const config = require(`../../config.json`)

module.exports = {
    name: "setup",
    description: "Sets your server up with the bot and correct permissions",
    execute(message) {

      if(message.channel.type === 'dm') return

      if(!message.guild.me.hasPermission("MANAGE_ROLES", "MANAGE_MESSAGES"))  {
        return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
      }

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 60 seconds`);
        } else {

        const LEO = message.guild.roles.cache.find(role => role.name === 'LEO')
        const MEDICAL = message.guild.roles.cache.find(role => role.name === 'MEDICAL')
        const CIV = message.guild.roles.cache.find(role => role.name === 'CIV')
        const DISPATCH = message.guild.roles.cache.find(role => role.name === 'DISPATCH')
        const ALLDEPT = message.guild.roles.cache.find(role => role.name === 'All Departments')

        if (!message.member.hasPermission("ADMINISTRATOR")) {
          message.react("❌")
          message.channel.send(`<@${message.author.id}> Incorrect Permissions, You require Administrator to run this command`)
          return
        }
  
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
        .setTitle(`***Setup Menu - ${config['bot-name']}***`)
        .setDescription(`Setup initialized by <@${message.author.id}>`)
        .setColor('BLUE');
        message.channel.send(Embed);

        const guild = message.guild
        if (!LEO) guild.roles.create({
            data: {
              name: 'LEO',
              color: '#03a1cc',
            },
            reason: 'Setup command',
          }).catch(err => {
            return message.channel.send(`Cannot Create LEO Role`).then(msg => {
                setTimeout(() => msg.delete(), 10000)
              })
            })

          if (!MEDICAL) guild.roles.create({
            data: {
              name: 'MEDICAL',
              color: '#ff0000',
            },
            reason: 'Setup command',
        }).catch(err => {
          return message.channel.send(`Cannot Create Medical Role`).then(msg => {
              setTimeout(() => msg.delete(), 10000)
            })
          })

        if (!CIV) guild.roles.create({
            data: {
              name: 'CIV',
              color: '#0cff00',
            },
            reason: 'Setup command',
        }).catch(err => {
          return message.channel.send(`Cannot Create Civ Role`).then(msg => {
              setTimeout(() => msg.delete(), 10000)
            })
          })

        if (!DISPATCH) guild.roles.create({
            data: {
              name: 'DISPATCH',
              color: '#bb44ff',
            },
            reason: 'Setup command',
        }).catch(err => {
          return message.channel.send(`Cannot Create Dispatch Role`).then(msg => {
              setTimeout(() => msg.delete(), 10000)
            })
          })

          if (!ALLDEPT) guild.roles.create({
            data: {
              name: 'All Departments',
              color: '#ffffff',
            },
            reason: 'Setup command',
        }).catch(err => {
          return message.channel.send(`Cannot Create All Departments Role`).then(msg => {
              setTimeout(() => msg.delete(), 10000)
            })
          })
        //EMBEDS

        const setupComplete = new Discord.MessageEmbed()
        .setDescription(`This guild is now ready to be used!`)
        .setColor('BLUE');

        setTimeout(function(){ 
          if (DISPATCH || LEO || MEDICAL || CIV || ALLDEPT) {
            return message.channel.send(setupComplete)
          }
        }, 3000);

        cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 60000);
        }
    }
}