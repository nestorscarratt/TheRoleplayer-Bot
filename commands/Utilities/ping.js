const Discord = require('discord.js')
const cooldown = new Set()

module.exports = {
    name: "ping",
    Description: "Pings the bot",
    execute(message){

      if(message.channel.type === 'dm') return

      const member = message.author
        
      if (cooldown.has(message.author.id)) {
          message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`)
          } else {

            var ping1 = new Date().getTime() - message.createdTimestamp
            const ping = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(`Pong! \`${ping1}\`**ms**`)
            .setColor('BLUE');

            message.channel.send(ping)

            cooldown.add(message.author.id);
            setTimeout(() => {
              cooldown.delete(message.author.id);
            }, 10000);
            }
        }
}