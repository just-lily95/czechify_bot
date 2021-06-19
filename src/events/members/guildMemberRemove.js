const discord = require('discord.js');

module.exports = async (client, member) => {
<<<<<<< Updated upstream
    serverLocale = global.getServerLocale(member.guild.id, member.guild.name);
=======
    serverLocale = global.languageResolver(member.guild.name);
>>>>>>> Stashed changes
    var logChannel = await global.findChannels(0, member.guild, "member-logs", ["text"])
    global.embedify(member.guild.name, logChannel[0], ['<@' + member.id + '> ', 'has left the server', '\nUserID: ', member.id], '#d7141a', await global.translatify('EN_GB', serverLocale, 'Member Left'), '', true, '', member.user.tag, member.user.displayAvatarURL());
}
