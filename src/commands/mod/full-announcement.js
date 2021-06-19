const discord = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        if (global.allowedUsers.includes(message.author.id)) {
            if (args[0].includes("/")) message.reply("fuck you too"); else {
                var channels = [];
                client.guilds.cache.forEach((guild) => {
                    var sentInGuild = false;
                    guild.channels.cache.forEach((channel) => {
                        if ((!(sentInGuild))&&(channel.name.includes("announcements"))) {
                            channels.push(channel);
                            sentInGuild = true;
                        }
                    })
                })
                channels.forEach((channel) => { channel.send(args.join(" ")); })
                message.reply("All done!").then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) })
                if (message.guild) message.delete();
            }
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
