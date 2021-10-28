const cooldown = new Set();
const refuel = new Set();
const Discord = require('discord.js');

module.exports = {
    name: "refuel",
    description: "Refuel Your Vehicle",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        const member = message.author
  
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))  {
          return message.react("❌").then(member.send(`<@${message.author.id}> Incorrect Permissions, I require manage messages. For more information view my docs https://docs.theroleplayer.cf/permissions`))
        }

        
           if (cooldown.has(message.author.id)) {
                message.channel.send(`<@${message.author.id}>, You cannot refuel your vehicle for another 5 mins`).then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
            } else {
            
            message.delete()
            const ulcar = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic:true }))
            .setDescription(`<@${message.author.id}> Started to refuel there vehicle, Wait 10 seconds`)
            .setColor('GREEN');

            message.channel.send(ulcar)

            cooldown.add(message.author.id);
            setTimeout(() => {
            message.channel.send(`<@${message.author.id}>, Refuel Completed. I will dm you once you need to refuel again`)
              cooldown.delete(message.author.id);
            }, 10000);

            refuel.add(message.author.id);
            setTimeout(() => {
            member.send(`<@${message.author.id}>, Your gas light just came on. You require more fuel!`).catch((err) => message.channel.send(`<@${message.author.id}>, Your gas light just came on. You require more fuel`));
              refuel.delete(message.author.id);
            }, 300000);
        }

    }
}