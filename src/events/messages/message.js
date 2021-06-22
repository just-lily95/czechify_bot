module.exports = (client, message) => {
    try {
        if(message.author.bot) return;
        if ((message.guild)&&(tortureUsers.includes(message.author.id))) { console.log("Shit spewing from " + message.author.tag + "'s mouth has been prevented from seeing the light of day"); message.delete(); }

        serverLocale = global.getServerLocale(message.guild.id, message.guild.name);
        serverName = global.locale2language(serverLocale);
        
        for (i = 0; i < Object.keys(global.thanksWords).length; i++) {
            locale = Object.keys(global.thanksWords)[i];
            if ((locale == 'EN_GB')||(locale == serverLocale)) for (j = 0; j < global.thanksWords[locale].length; j++) if (message.content.includes(global.thanksWords[locale][j])) {
                client.commands['thanks'][0](client, message);
                break;
            }
        }
        if(message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(global.botPrefix)) {
            broken = false;
            Object.keys(client.commands).forEach((item) => {
                if (!(broken)) {
                    var tidyItem = global.removeAccents(item);
                    if ((global.removeAccents(message.content) == '/' + tidyItem)||((global.removeAccents(message.content)).startsWith('/' + tidyItem + ' '))) {
                        var argsToPass = global.removeAccents(message.content).split(' ');
                        if (argsToPass.length) argsToPass.shift();
                        if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToPass); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside a server'], '#d7141a', '', '', false, '', '', '', true, 15000); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else global.embedify(message.guild.id, message.guild.name, message.channel, ['This command cannot be run from inside DMs'], '#d7141a', '', '', false, '', '', '', true, 15000); }
                        broken = true;

        thanksWords.forEach((word) => { if ((!(found))&&(global.removeAccents(message.content.toLowerCase()).includes(word))) client.commands['thanks'][0](client, message); });
        if(message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(PREFIX)) {

            serverLanguageLocale = global.languageResolver(message.guild.name);
            serverLanguageName = global.languageNameResolver(serverLanguageLocale);

            for (i = 0; i < Object.keys(global.thanksWords).length; i++) {
                locale = Object.keys(global.thanksWords)[i];
                if ((locale == 'EN_GB')||(locale == serverLanguageLocale)) for (j = 0; j < global.thanksWords[locale].length; j++) if (message.content.includes(global.thanksWords[locale][j])) {
                    client.commands['thanks'][0](client, message);
                    break;
                }
            }
            if(message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(global.botPrefix)) {
                broken = false;
                Object.keys(client.commands).forEach((item) => {
                    if (!(broken)) {
                        var tidyItem = global.removeAccents(item);
                        if ((global.removeAccents(message.content) == '/' + tidyItem)||((global.removeAccents(message.content)).startsWith('/' + tidyItem + ' '))) {
                            var argsToParse = global.removeAccents(message.content.substring(message.content.indexOf(' ') + 1).substring(item)).split(" ");
                            if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToParse); else message.reply("This command cannot be run from inside a guild"); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else message.reply("This command cannot be run from inside DMs"); }

                            var argsToPass = global.removeAccents(message.content).split(' ');
                            if (argsToPass.length) argsToPass.shift();
                            if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToPass); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside a server'], '#d7141a', '', '', false, '', '', '', true, 15000); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside DMs'], '#d7141a', '', '', false, '', '', '', true, 15000); }
                            broken = true;
                        }
                    }
                })

                if (!(broken)) {
                    if (message.guild) message.delete();
                    message.reply("This command doesn't exist").then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
                }
            })

            if (!(broken)) {
                if (message.guild) message.delete();
                global.embedify(message.guild.id, message.guild.name, message.channel, ['This command doesn\'t exist'], '#d7141a', '', '', false, '', '', '', true, 15000);
            }
        }
    }catch(err) { console.log(err) }
}
