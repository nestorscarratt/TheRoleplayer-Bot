// THIS IS A SPECIAL PAGE
// YOU MUST CHANGE ALL THE PREFIXS TO YOUR CORRECT PREFIX
// CURRENTLY THE ARE ALL SET TO "/"





const Discord = require('discord.js')
const cooldown = new Set();
const paginationEmbed = require('discord.js-pagination');
const config = require(`../../config.json`)

module.exports = {
    name: "commands",
    description: "Displays all commands",
    execute(message){

        if(message.channel.type === 'dm') return message.channel.send(`You can only execute commands in a server!`)

        if (cooldown.has(message.author.id)) {
            message.channel.send(`<@${message.author.id}>, You can use this command again in 10 seconds`);
        } else {

            const paginationEmbed = require('discord.js-pagination');
 
            // Footers arent needed, this is added by the module
            const { MessageEmbed } = require('discord.js');
            const startPage = new MessageEmbed()
            .setTitle(`Commands - ${config['bot-name']}`)
            .setDescription(`Here is a list of all commands you can use with The Bot!`)
            .addField(`**Full List**`, `https://github.com/Rx-Flex/theroleplayer-bot/blob/main/README.md#commands`)
            .addField(`**Usage**`, `You can run the command and it will give you a usage`)
            .setColor('#36393F');
            const page1 = new MessageEmbed()
            .setTitle(`Roleplay`)
            .setDescription(`List of all commands under the "Roleplay" module`)
            .addFields(
                { name: '911', value: 'Calls 911 and pings dispatch'},
                { name: '/admit', value: 'Admits a user to hospital'},
                { name: '/cpr', value: 'Attempts to pefrom cpr'},
                { name: '/grabs', value: 'Grabs or restrains a person'},
                { name: '/grab', value: 'Grabs an item'},
                { name: '/jail', value: 'Places a user in jail'},
                { name: '/do', value: 'Peforms an action'},
                { name: '/drink', value: 'Drink your favourite drinks!'},
                { name: '/lockcar', value: 'Locks your car'},
                { name: '/unlockcar', value: 'Unlocks your car'},
                { name: '/seatbelt', value: 'Secures you with a seatbelt'},
                { name: '/seatbeltoff', value: 'Removes your seatbelt'},
                { name: '/eat', value: 'Eats food contents'},
                { name: '/bodycam', value: 'Turns your bodycam on'},
                { name: '/bodycamoff', value: 'Turns your bodycam Off'},
                { name: '/hotwire', value: 'Starts to hotwire a vehicle'},
                { name: '/lockpickcuffs', value: 'Attempts to lock pick your cuffs'},
                { name: '/ooc', value: 'Talks out of roleplay'},
                { name: '/examine', value: 'Examines a person for injures'},
                { name: '/bloodpressure', value: 'Checks a persons BP'},
                { name: '/pulse', value: 'Does a rough pulse check'},
                { name: '/search', value: 'Searches a user'},
                { name: '/panic', value: 'Activates your panic button'},
                { name: '/refuel', value: 'Refuel your vehicle'},
                //space { name: '\u200B', value: '\u200B' },
                //inline { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .setColor('#36393F');

            const page2 = new MessageEmbed()
            .setTitle(`Details`)
            .setDescription(`List of all commands under the "Detail" module`)
            .addFields(
                { name: '/help', value: 'Displays a help menu'},
                { name: '/commands', value: 'This command/ display all commands'},
                { name: '/ping', value: 'Tests the bots latency'},
                { name: '/support', value: 'Gives a link to our support server'},
                { name: '/stats', value: 'Shows TheRoleplayers Stats'},
                { name: '/docs', value: 'Links our help/info documents'},
                { name: '/setup', value: 'Sets up your server with correct roles'},
                //space { name: '\u200B', value: '\u200B' },
                //inline { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .setColor('#36393F');

            // Create an array of embeds
            pages = [
            startPage,
            page1,
            page2,
            ];

            // first 2 args are required
            paginationEmbed(message, pages);

        cooldown.add(message.author.id);
            setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 10000);
    }

    }
}