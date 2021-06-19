const discord = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        if (global.allowedUsers.includes(message.author.id)) {
            eval(args.join(' '));
        }else{
            var embed = new discord.MessageEmbed()
                .setDescription(`**Nejsi velká holka**!`)
                .setColor('#ff3c36')
                .setAuthor("Podvodníku")
                .setImage("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) })
        }
    },
    descriptionCZ: "Poslat velké oznamení",
    descriptionEN: "Send a big announcement",
    allowedIn: ["guild", "dm"],
    czAlias: "velké-oznámení",
    aliases: ['full-announcement', "velke-oznameni"]
}
