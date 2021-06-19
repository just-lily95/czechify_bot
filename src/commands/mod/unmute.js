const discord = require('discord.js');

async function log(member) {
    var logChannel = await global.findChannels(0, member.guild, "logs", ["text"])
    let embed = new discord.MessageEmbed()
        .setDescription(`Uživatel ${member} (${member.id}) byl odtlumen`)
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
                    var roleToGive = await global.findARole(message.guild, 0, 'Ztlumeno');
                    if ((roleToGive)&&(message.mentions.members.first().roles.cache.has(roleToGive.id))) {
                        var embed = new discord.MessageEmbed()
                            .setDescription("**Jupí** :tada:")
                            .setColor('#ff3c36')
                            .setAuthor(`Uživatel ${toMute1.tag} byl odtlumen!`)
                            .setThumbnail("https://i.imgur.com/h3h973z.gif");
                        message.channel.send(embed).then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                        toMute.send("https://i.imgur.com/h3h973z.gif").then((msg) => { msg.delete({ timeout: 15000 }).catch((e) => {}) });
                        setTimeout(async function() {
                            if (!(message.mentions.members.first().roles.cache.has(roleToGive))) message.mentions.members.first().roles.remove(roleToGive);
                        }, 500)
                        log(message, toMute);
                    }else{
                        console.log(message.mentions.members.first().roles.cache.has(roleToGive.id))
                    }
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
    descriptionCZ: "Odtlum člena",
    descriptionEN: "Unmute a member",
    allowedIn: ["guild"],
    czAlias: "odtlumit",
    aliases: ['unmute', 'odtlumit', 'otevritpusu']
}
