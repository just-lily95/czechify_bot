const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
        message.delete();
        var ownerRole = await global.findARole(message.guild, 0, "Owner");
        if (message.member.roles.cache.has(ownerRole.id)){
            if (message.mentions.members.first()) {
                if (message.mentions.members.first().user.bot) {
                    var embed = new discord.MessageEmbed()
                        .setDescription(`**Tohle je bot!**`)
                        .setColor('#ff3c36')
                        .setAuthor("Proč bys to dával botovi??")
                        .setThumbnail("https://i.imgur.com/mIcC1fp.gif");
                    message.channel.send(embed).then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
                }else {
                    var memberId = message.mentions.users.first();
                    var mentionedMember = message.guild.members.cache.get(memberId.id);
                    message.member.roles.remove(ownerRole);
                    mentionedMember.roles.add(ownerRole);

                    var embed = new discord.MessageEmbed()
                        .setDescription(`**${message.member.displayName}** předal __vlastnictví serveru__ dříve obyčejnému uživateli **${mentionedMember.displayName}**!`)
                        .setColor('#ffa530')
                        .setAuthor("👏 🎉")
                        .setThumbnail(mentionedMember.user.displayAvatarURL());
                    message.channel.send(embed).then((msg) => { msg.delete({ timeout: 21600000 }).catch((e) => {}) });
                }
            }else {
                var embed = new discord.MessageEmbed()
                    .setDescription(`**Musíš někoho označit!**`)
                    .setColor('#ff3c36')
                    .setAuthor("Takhle to nefunguje")
                    .setThumbnail("https://i.imgur.com/mIcC1fp.gif");
                message.channel.send(embed).then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
            }
        }else{
            var embed = new discord.MessageEmbed()
                .setDescription(`**Nejsi majitelem serveru**!`)
                .setColor('#ff3c36')
                .setAuthor("Podvodníku")
                .setThumbnail("https://i.imgur.com/mIcC1fp.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Predat vlastnictvi server",
    descriptionEN: "Transfer server ownership",
    allowedIn: ['guild'],
    czAlias: "předatvlastnictví",
    aliases: ['transferownership', 'predatvlastnictvi']
}
