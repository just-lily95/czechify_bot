const discord = require('discord.js');

async function log(member) {
    var logChannel = await global.findChannels(0, member.guild, "logs", ["text"])
    let embed = new discord.MessageEmbed()
        .setDescription(`Uživatel ${member} (${member.id}) byl ztlumen`)
        .setColor('#ff3c36')
    logChannel[1].send(embed);
}

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if (!(message.member.hasPermission('MUTE_MEMBERS'))) {
            var embed = new discord.MessageEmbed()
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Nech toho!`)
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }else if (message.mentions.members.first()) {
            if (message.member.roles.highest.rawPosition > message.mentions.members.first().roles.highest.rawPosition) {
                if ((message.mentions.members.first().kickable)&&(message.mentions.members.first().roles.highest.rawPosition < message.guild.me.roles.highest.rawPosition)) {
                    var toMute = message.mentions.members.first()
                    var toMute1 = message.mentions.users.first()
                    var embed = new discord.MessageEmbed()
                        .setDescription("**Jupí** :tada:")
                        .setColor('#ff3c36')
                        .setAuthor(`Uživatel ${toMute1.tag} byl ztlumen!`)
                        .setThumbnail("https://i.imgur.com/75ENcTO.gif");
                    message.channel.send(embed).then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    toMute.send("https://i.imgur.com/75ENcTO.gif").then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                    setTimeout(async function() {
                        var roleToGive = await global.findARole(message.guild, 0, 'Ztlumeno');
                        if (!(message.mentions.members.first().roles.cache.has(roleToGive.id))) message.mentions.members.first().roles.add(roleToGive);
                    }, 500)
                    log(message, toMute);
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
    descriptionCZ: "Ztlum člena",
    descriptionEN: "Mute a member",
    allowedIn: ["guild"],
    czAlias: "ztlumit",
    aliases: ['mute', 'ztlumit', 'zavritpusu']
}
