const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        serverLocale = global.getServerLocale(message.guild.id, message.guild.name);
        serverLanguage = global.locale2language(serverLocale);
        welcome = await global.translatify('EN_GB', serverLocale, ['Welcome']);
        var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ['_beginner', '_intermediate', '_advanced', '_fluent', '_native_speaker']), 'name');
        msg = await global.embedify(message.guild.id, message.guild.name, message.channel, ['**<@' + message.member.id + '>, ', 'Choose a colour below to set your ' + serverLanguage + ' level', '**\n\n<:_:' + emojis[1] + '> ', '**Beginner** - I\'m just starting to learn', '\n\n<:_:' + emojis[3] + '> ', '**Intermediate** - I can construct sentences', '\n\n<:_:' + emojis[0] + '> ', '**Advanced** - Talking isn\'t a problem for me', '\n\n<:_:' + emojis[2] + '> ', '**Fluent** - Czech is my second self', '\n\n<:_:' + emojis[4] + '> ', '**Native speaker** - This one is obvious'], '#d7141a', welcome + '!')
        global.react(msg, [emojis[1], emojis[3], emojis[0], emojis[2], emojis[4]]);
        msg.changeLevelMessage = true;
    },
    descriptionCZ: "Nastav si úroveň češtiny",
    descriptionEN: "Set your Czech level!",
    allowedIn: ["guild"],
    czAlias: "úroveň",
    aliases: ['changelevel', 'uroven', 'level', 'lvl']
}
