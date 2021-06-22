module.exports = (client, message) => {
    try {
        if (message.author.bot) return;
        if ((message.guild)&&(tortureUsers.includes(message.author.id))) message.delete();

<<<<<<< Updated upstream
        serverLocale = global.getServerLocale(message.guild.id, message.guild.name);
        serverLanguage = global.locale2language(serverLocale);
=======
        serverLanguageLocale = global.languageResolver(message.guild.name);
        serverLanguageName = global.languageNameResolver(serverLanguageLocale);
>>>>>>> Stashed changes
        
        for (i = 0; i < Object.keys(global.thanksWords).length; i++) {
            locale = Object.keys(global.thanksWords)[i];
            if ((locale == 'EN_GB')||(locale == serverLanguageLocale)) for (j = 0; j < global.thanksWords[locale].length; j++) if (message.content.includes(global.thanksWords[locale][j])) {
                client.commands['thanks'][0](client, message);
                break;
            }
        }
<<<<<<< Updated upstream
        if (message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(global.botPrefix)) {
            if (message.guild) {
                message.delete();
                console.log(Object.keys(client.commands.locales[serverLocale]))
                for (i = 0; i < Object.keys(client.commands.locales[serverLocale]).length; i++) {
                    var alias = global.removeAccents(Object.keys(client.commands.locales[serverLocale])[i]);
                    if (global.removeAccents(message.content) == global.botPrefix + alias) {
                        var commandName = client.commands.locales[serverLocale][Object.keys(client.commands.locales[serverLocale])[i]]['name']
                        if (!(client.commands.commands[commandName]['enabled'])) { message.reply("This command has been disabled").then((msg) => { msg.delete({timeout:15000}) }); return; }
                        if ((client.commands.commands[commandName]['admin'])&&(!(global.allowedUsers.includes(message.author.id)))) { message.reply("This is an admin command and you do not have authorisation to use it").then((msg) => { msg.delete({timeout:15000}) }); return; }
                        client.commands.commands[commandName]['fn'](client, message);
                        break;
                    }else if (global.removeAccents(message.content).startsWith(global.botPrefix + alias + ' ')) {
                        var args = message.content.split(' ');
                        args.shift();
                        var commandName = client.commands.locales[serverLocale][Object.keys(client.commands.locales[serverLocale])[i]]['name']
                        if (!(client.commands.commands[commandName]['enabled'])) { message.reply("This command has been disabled").then((msg) => { msg.delete({timeout:15000}) }); return; }
                        if ((client.commands.commands[commandName]['admin'])&&(!(global.allowedUsers.includes(message.author.id)))) { message.reply("This is an admin command and you do not have authorisation to use it").then((msg) => { msg.delete({timeout:15000}) }); return; }
                        client.commands.commands[commandName]['fn'](client, message, args);
                        return;
                    }
                }
            }else {
                for (i = 0; i < Object.keys(client.commands.locales).length; i++) {
                    var locale = Object.keys(client.commands.locales)[i];
                    for (i = 0; j < Object.keys(client.commands.locales[locale]).length; j++) {
                        var alias = global.removeAccents(Object.keys(client.commmands.guilds[locale])[j]);
                        if ((global.removeAccents(message.content) == global.botPrefix + alias)||(global.removeAccents(message.content).startsWith(global.botPrefix + alias + ' '))) {
                            console.log("DM commands not supported yet");
                            return;
                        }
                        if (global.removeAccents(message.content) == global.botPrefix + alias) {
                            var commandName = client.commands.locales[serverLocale][Object.keys(client.commmands.guilds[locale])[j]]['name']
                            if (!(client.commands.commands[commandName]['enabled'])) { message.reply("This command has been disabled").then((msg) => { msg.delete({timeout:15000}) }); return; }
                            if ((client.commands.commands[commandName]['admin'])&&(!(global.allowedUsers.includes(message.author.id)))) { message.reply("This is an admin command and you do not have authorisation to use it").then((msg) => { msg.delete({timeout:15000}) }); return; }
                            client.commands.commands[commandName]['fn'](client, message);
                            break;
                        }else if (global.removeAccents(message.content).startsWith(global.botPrefix + alias + ' ')) {
                            var args = message.content.split(' ');
                            args.shift();
                            var commandName = client.commands.locales[serverLocale][Object.keys(client.commmands.guilds[locale])[j]]['name']
                            if (!(client.commands.commands[commandName]['enabled'])) { message.reply("This command has been disabled").then((msg) => { msg.delete({timeout:15000}) }); return; }
                            if ((client.commands.commands[commandName]['admin'])&&(!(global.allowedUsers.includes(message.author.id)))) { message.reply("This is an admin command and you do not have authorisation to use it").then((msg) => { msg.delete({timeout:15000}) }); return; }
                            client.commands.commands[commandName]['fn'](client, message, args);
                            return;
                        }
                    }
                }
=======
        if(message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(global.botPrefix)) {
            broken = false;
            Object.keys(client.commands).forEach((item) => {
                if (!(broken)) {
                    var tidyItem = global.removeAccents(item);
                    if ((global.removeAccents(message.content) == '/' + tidyItem)||((global.removeAccents(message.content)).startsWith('/' + tidyItem + ' '))) {
                        var argsToPass = global.removeAccents(message.content).split(' ');
                        if (argsToPass.length) argsToPass.shift();
                        if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToPass); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside a server'], '#d7141a', '', '', false, '', '', '', true, 15000); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside DMs'], '#d7141a', '', '', false, '', '', '', true, 15000); }
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
                global.embedify(message.guild.name, message.channel, ['This command doesn\'t exist'], '#d7141a', '', '', false, '', '', '', true, 15000);
>>>>>>> Stashed changes
            }
            // for (i = 0; i < Object.keys(client.commands).length; i++) {
            //     commandName = global.removeAccents(Object.keys(client.commands)[i]);
            //     if ((global.removeAccents(message.content) == global.botPrefix + commandName)||((global.removeAccents(message.content)).startsWith(global.botPrefix + commandName + ' '))) {
            //         var argsToPass = global.removeAccents(message.content).split(' ');
            //         if (argsToPass.length) argsToPass.shift();
            //         if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToPass); else global.embedify(message.guild.name, message.channel, ['This command cannot be run from inside a server'], '#d7141a', '', '', false, '', '', '', true, 15000); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else global.embedify(message.guild.id, message.guild.name, message.channel, ['This command cannot be run from inside DMs'], '#d7141a', '', '', false, '', '', '', true, 15000); }
            //         return;
            //     }
            // }
            global.embedify(message.guild.id, message.guild.name, message.channel, ['This command doesn\'t exist'], '#d7141a', '', '', false, '', '', '', true, 15000);
        }
    }catch(err) { console.log(err) }
}
