const discord = require('discord.js');

async function log(member) {
    var logChannel = await global.findChannels(0, member.guild, "logs", ["text"])
    let embed = new discord.MessageEmbed()
        .setDescription(`Uživatel ${member} (${member.id}) byl zakázán`)
        .setColor('#ff3c36')
    logChannel[1].send(embed);
}

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if (!(message.member.hasPermission('BAN_MEMBERS'))) {
            var embed = new discord.MessageEmbed()
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Nech toho!`)
                .setThumbnail("https://i.imgur.com/mIcC1fp.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }else if (message.mentions.members.first()) {
            if (message.member.roles.highest.rawPosition > message.mentions.members.first().roles.highest.rawPosition) {
                if ((message.mentions.members.first().bannable)&&(message.mentions.members.first().roles.highest.rawPosition < message.guild.me.roles.highest.rawPosition)) {
                    var toBan = message.mentions.members.first()
                    var toBan1 = message.mentions.users.first()
                    var embed = new discord.MessageEmbed()
                        .setDescription("**Jupí** :tada:")
                        .setColor('#ff3c36')
                        .setAuthor(`Uživatel ${toBan1.tag} byl zabanován!`)
                        .setThumbnail("https://i.imgur.com/mIcC1fp.gif");
                    message.channel.send(embed).then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    toBan.send("https://i.imgur.com/mIcC1fp.gif").then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    setTimeout(function() { toBan.ban(); }, 500)
                    log(message, toBan);
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
    descriptionCZ: "Zabanovat",
    descriptionEN: "Ban",
    allowedIn: ["guild"],
    czAlias: "banovat",
    aliases: ['banovat', 'ban']
}
