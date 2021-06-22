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

        var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["_beginner", "_intermediate", "_advanced", "_fluent", "_native_speaker"]), "name");
        const time = 60000
        var embed = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setDescription(`**${message.member}, Zareaguj na zprávu pro zvolení své úrovně!\n\u200b**`)
            .addFields(
                { name: `${emojis[1]} **Beginner** - I'm just starting to learn`, value: `${emojis[1]} **Začátečník** - Teprve se začínám učit` },
                { name: '\u200B', value: '\u200B' },
                { name: `${emojis[3]} **Intermediate** - I can construct sentences`, value: `${emojis[3]} **Středně pokročilá** - Můžu sestavovat věty` },
                { name: '\u200B', value: '\u200B' },
                { name: `${emojis[0]} **Advanced** - Talking isn't a problem for me`, value: `${emojis[0]} **Pokročilá** - Mluvení pro mne není problém` },
                { name: '\u200B', value: '\u200B' },
                { name: `${emojis[2]} **Fluent** - Czech is my second self`, value: `${emojis[2]} **Plynná** - Čeština je mé druhé já` },
                { name: '\u200B', value: '\u200B' },
                { name: `${emojis[4]} **Native speaker** - That's apparent :sunglasses:`, value: `${emojis[4]} **Rodilý mluvčí** - No to je jasné :sunglasses:` },
            )
        var ReactionMessage = await message.channel.send(embed)
        await global.react(ReactionMessage, [emojis[1], emojis[3], emojis[0], emojis[2], emojis[4]]);
        ReactionMessage.changeLevelMessage = true;
        setTimeout(function() { ReactionMessage.delete(); }, time);
    },
    descriptionCZ: "Nastav si úroveň češtiny",
    descriptionEN: "Set your Czech level!",
    allowedIn: ["guild"],
    czAlias: "úroveň",
    aliases: ['changelevel', 'uroven', 'level', 'lvl']
}
