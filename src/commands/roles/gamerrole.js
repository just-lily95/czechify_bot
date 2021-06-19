const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        var voiceRole = await global.findARole(message.guild, 0, "Game" + await global.v(message));
        if (message.member.roles.cache.has(voiceRole.id)) {
            message.member.roles.remove(voiceRole);
            var embed = new discord.MessageEmbed()
                .setColor(voiceRole.color)
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Už nemáš roli **Gamer**! Nesoudím tě 👎` },
                    { name: ':flag_gb:\u200B', value: `You don't have the **Gamer** role anymore! I'm not judging you 👎` }
                )
                .setFooter(message.member.displayName, message.member.user.displayAvatarURL());
            message.channel.send(embed);
            message.delete();
        } else {
            message.member.roles.add(voiceRole);
            var embed = new discord.MessageEmbed()
                .setColor(voiceRole.color)
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Teď máš roli **Gamer**! Dobrá volba 👍` },
                    { name: ':flag_gb:\u200B', value: `You now have the **Gamer** role! Good choice! 👍` }
                )
                .setFooter(message.member.displayName, message.member.user.displayAvatarURL());

            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            message.delete();
        }
    },
    descriptionCZ: "Přidat nebo odebrat roli Gamer",
    descriptionEN: "Add or remove the Gamer role",
    allowedIn: ["guild"],
    czAlias: "hráč",
    aliases: ['gamerrole', 'game', 'gamer', 'iamagamer', 'iamaproudgamer']
}
