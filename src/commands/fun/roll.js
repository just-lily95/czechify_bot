const discord = require('discord.js');

function isInteger(value) { return /^\d+$/.test(value); }

module.exports = {
    run: async(client, message, args)  => {
        message.delete();
        var canDo = true;
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if ((!(canDo))||(!(isInteger(args[0])))) var max = 6; else var max = parseInt(args[0]);
        var rollDice = Math.floor(Math.random() * max) + 1;
        var rickRoll = (Math.floor(Math.random() * 50) + 1 == 25);
        if (rickRoll) {
            message.channel.send('https://i.imgur.com/2khqMrF.gif').then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) })
            message.channel.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ').then((msg) => { msg.delete({ timeout: 212000 }).catch((e) => {}) })
        }else {
            var embed = new discord.MessageEmbed()
                .setDescription("**Nepodporujeme hazardováni**")
                .setColor('#dbe9ff')
                .setAuthor(`Hodil jsi ${rollDice}`)
                .setThumbnail("https://i.imgur.com/BXtTdLS.png");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Hodit kostkou",
    descriptionEN: "Roll a dice",
    allowedIn: ['guild', 'dm'],
    czAlias: "hod",
    aliases: ['roll', 'rolldice', 'diceroll', 'hod', 'dice']
}
