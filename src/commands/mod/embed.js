const discord = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        if (message.guild) message.delete();
        var canDo = true;
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if (global.allowedUsers.includes(message.author.id)) {
            if (canDo) {
                args = message.content.split(' ');
                args.shift();
                var embed = new discord.MessageEmbed()
                    .setColor("#d7141a")
                    .setDescription(args.join(' '));
                message.channel.send(embed);
                message.reply("All done!").then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) })
            }else {
                var embed = new discord.MessageEmbed()
                    .setColor("#d7141a")
                    .addFields(
                        { name: '\u200B', value: 'flag_cz **/oznameni** *TvéOznámení*!' },
                        { name: '\u200B', value: 'flag_gb **/announcement** *YourAnnouncement*!' }
                    )
                    .setThumbnail("https://i.imgur.com/AveAmWu.gif");
                message.channel.send(embed)
            }
        }else{
            var embed = new discord.MessageEmbed()
                .setDescription(`**Nejsi velká holka**!`)
                .setColor('#ff3c36')
                .setAuthor("Podvodníku")
                .setImage("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed)
        }
    },
    descriptionCZ: "Embed Text!",
    descriptionEN: "Embed text!",
    allowedIn: ["guild"],
    czAlias: "embed",
    aliases: ['embed']
}
