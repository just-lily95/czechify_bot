const discord = require('discord.js');

module.exports = async (client, member) => {
    if (tortureUsers.includes(member.id)) { member.kick(); console.log('A wild ' + member.user.tag + ' has been removed from existence'); return; }

    serverLocale = global.languageResolver(member.guild.name);
    serverLanguageName = global.languageNameResolver(serverLocale);
    
    var logChannel = await global.findChannels(0, member.guild, 'member-logs', ['text']);
    global.embedify(member.guild.name, logChannel[0], ['<@' + member.id + '> ', 'has joined the server', '\nUserID: ', member.id], '#d7141a', await global.translatify('EN_GB', serverLocale, 'Member Joined'), '', true, '', member.user.tag, member.user.displayAvatarURL());

    if (member.user.bot) return;

    welcome = await global.translatify('EN_GB', serverLocale, ['Welcome']);

    var welcomeChannel = await global.findChannels(3, member.guild, ['👋'], ['text']);

<<<<<<< Updated upstream
    global.embedify(member.guild.id, member.guild.name, member, global.initialWelcomeMessageText(member.guild.name, welcomeChannel[0].id), '#d7141a', welcome + '!');

    //if (channel[Object.keys(channel)[0]]) channel[Object.keys(channel)[0]].send(welcome + ' <@' + member.id + '!').then(msg => msg.delete()).catch((e) => {})

    member.roles.add(await global.findARole(member.guild, 0, 'Learning ' + serverLanguage));

    //var emojis = global.sortByKey(await global.findEmojis(member.guild, 1, ['_beginner', '_intermediate', '_advanced', '_fluent', '_native_speaker']), 'name');
    //msg = await global.embedify(member.guild.id, member.guild.name, channel, ['**<@' + member.id + '>, ', 'React to this message to set your ' + serverLanguage + ' level and proceed to the server', '\n\n<_:' + emojis[1] + '> ', '**Beginner** - I\'m just starting to learn', '\n\n<_:' + emojis[3] + '> ', '**Intermediate** - I can construct sentences', '\n\n<_:' + emojis[0] + '> ', '**Advanced** - Talking isn\'t a problem for me', '\n\n<_:' + emojis[2] + '> ', '**Fluent** - Czech is my second self', '\n\n<_:' + emojis[4] + '> ', '**Native speaker** - I was born in the Czech Republic'], '#d7141a', welcome + '!')
=======
    global.embedify(member.guild.name, member, global.initialWelcomeMessageText(member.guild.name, welcomeChannel[0].id), '#d7141a', welcome + '!');

    //if (channel[Object.keys(channel)[0]]) channel[Object.keys(channel)[0]].send(welcome + ' <@' + member.id + '!').then(msg => msg.delete()).catch((e) => {})

    member.roles.add(await global.findARole(member.guild, 0, 'Learning ' + serverLanguageName));

    //var emojis = global.sortByKey(await global.findEmojis(member.guild, 1, ['_beginner', '_intermediate', '_advanced', '_fluent', '_native_speaker']), 'name');
    //msg = await global.embedify(member.guild.name, channel, ['**<@' + member.id + '>, ', 'React to this message to set your ' + serverLanguageName + ' level and proceed to the server', '\n\n<_:' + emojis[1] + '> ', '**Beginner** - I\'m just starting to learn', '\n\n<_:' + emojis[3] + '> ', '**Intermediate** - I can construct sentences', '\n\n<_:' + emojis[0] + '> ', '**Advanced** - Talking isn\'t a problem for me', '\n\n<_:' + emojis[2] + '> ', '**Fluent** - Czech is my second self', '\n\n<_:' + emojis[4] + '> ', '**Native speaker** - I was born in the Czech Republic'], '#d7141a', welcome + '!')
>>>>>>> Stashed changes
    //global.react(msg, [emojis[1], emojis[3], emojis[0], emojis[2], emojis[4]]);
    //msg.changeLevelMessage = true;
}
