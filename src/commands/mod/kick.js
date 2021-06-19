const discord = require('discord.js');

async function log(member) {
    var logChannel = await global.findChannels(0, member.guild, "logs", ["text"])
    let embed = new discord.MessageEmbed()
        .setDescription(`Uživatel ${member} (${member.id}) byl vyhozen`)
        .setColor('#ff3c36')
    logChannel[1].send(embed);
}

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if (!(message.member.hasPermission('KICK_MEMBERS'))) {
            var embed = new discord.MessageEmbed()
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Nech toho!`)
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }else if (message.mentions.members.first()) {
            if (message.member.roles.highest.rawPosition > message.mentions.members.first().roles.highest.rawPosition) {
                if ((message.mentions.members.first().kickable)&&(message.mentions.members.first().roles.highest.rawPosition < message.guild.me.roles.highest.rawPosition)) {
                    var toKick = message.mentions.members.first()
                    var toKick1 = message.mentions.users.first()
                    var embed = new discord.MessageEmbed()
                        .setDescription("**Jupí** :tada:")
                        .setColor('#ff3c36')
                        .setAuthor(`Uživatel ${toKick1.tag} byl vyhozen!`)
                        .setThumbnail("https://imgur.com/c7HCgta");
                    message.channel.send(embed).then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    toKick.send("https://i.imgur.com/mIcC1fp.gif").then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    setTimeout(function() { toKick.kick(); }, 500)
                    log(message, toKick);
                }else {
                    var embed = new discord.MessageEmbed()
                        .setDescription("**Podvodníku**")
                        .setColor('#ff3c36')
                        .setAuthor(`Nech toho!`)
                        .setThumbnail("https://i.imgur.com/AveAmWu.gif");
                    message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
                }
            }else {
                var embed = new discord.MessageEmbed()
                    .setDescription("**Podvodníku**")
                    .setColor('#ff3c36')
                    .setAuthor(`Nech toho!`)
                    .setThumbnail("https://i.imgur.com/AveAmWu.gif");
                message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
            }
        }
    },
    descriptionCZ: "Vykopnout člena",
    descriptionEN: "Kick a member",
    allowedIn: ["guild"],
    czAlias: "výkopnout",
    aliases: ['kick', 'vykopnout']
}
