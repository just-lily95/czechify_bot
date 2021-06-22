const discord = require('discord.js');
const fetch = require('node-fetch');



module.exports = {
    run: async (client, message, args) => {
        message.delete();

        // var text = await data.text();
        // message.reply(text);

        return;

        var czechifyID = await fetch('https://najemi.cz/czechifyapi/userID.php?userID=' + message.author.id + '&userIDType=discord', {headers: {'Authorization': global.apiAuth[0]}});
        czechifyID = await czechifyID.json();
        if (czechifyID['error']) {
            console.log(czechifyID['error']);
            return
        }
        if (czechifyID['success']['output'][0]['Account ID']) czechifyID = czechifyID['success']['output'][0]['Account ID']; else { console.log(czechifyID); return; }

        var wordData = await fetch('https://najemi.cz/czechifyapi/words/?action=giveWord&userID=' + czechifyID, {headers: {'Authorization': global.apiAuth[0]}});
        wordData = await wordData.json();

        if (wordData['error']) {
            if (wordData['error']['code'] == 500) { console.log(wordData); return; }
            var currentError = wordData['error']['errors'][wordData['error']['errors'].length - 1];
            if (currentError['flag'] == 'TOO_FAST') {
                var data = await fetch('http://localhost/translate.php?fromLang=EN_GB&toLang=CS_CZ&text=' + encodeURI('You already have **all** the words!'));
                var text = await data.text();
                message.reply(text);
                return;
                var remainingTimeEN = '';
                if (currentError['time'] > 60) {
                    remainingTimeEN = Math.floor(currentError['time'] / 60) + ' minutes and ' + Math.round(currentError['time'] % 60) + ' seconds';
                    remainingTimeCS = Math.floor(currentError['time'] / 60) + ' minuty a ' + Math.round(currentError['time'] % 60) + ' sekund';
                }else {
                    remainingTimeEN = currentError['time'] + ' seconds';
                    remainingTimeCS = currentError['time'] + ' sekund';
                }
                global.embedify(message, ['Too fast! You can get a new word in'], '#ff3c36', '', '', true);
                var embed = new discord.MessageEmbed()
                    .setColor("#ff3c36")
                    .setDescription(':flag_cz: Příliš brzo! Nové slovo dostaneš za ' + remainingTimeCS + '!\n\n:flag_gb: Too fast! You can get a new word in ' + remainingTimeEN + '!')
                    .setFooter(message.member.displayName + '\n' + message.content, message.member.user.displayAvatarURL())
                message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            }else if (currentError['flag'] == 'HAS_ALL') {
                global.embedify(message, ['You already have **all** the words!'], '#59ea00', '', '', true);
            }else console.log(currentError);
        }else if ((wordData['success'])&&(wordData['success']['code'] == 200)) {
            var recentOutput = wordData['success']['output'][wordData['success']['output'].length - 1];
            if (recentOutput['message'] == 'Word added.') {
                var word = recentOutput['word_data'];
                let embed = new discord.MessageEmbed()
                    .setColor("#59ea00")
                    .setFooter(message.member.displayName + '\n' + message.content, message.member.user.displayAvatarURL())
                    .setTitle("Máš nové slovo")
                    .setDescription(':flag_cz: Teď máš slovo **' + global.titleCase(word.word_target) + '**!\n\n:flag_gb: You now have the word **' + global.titleCase(word.word_base) + '**!')
                message.channel.send(embed);
            }else console.log(recentOutput);
        }else console.log(wordData);
    },
    descriptionCZ: "Získej nové slovo",
    descriptionEN: "Get a new word",
    allowedIn: ["guild"],
    czAlias: "slovo",
    aliases: ['give', 'giveword', 'newword', 'noveslovo', 'slovo', 'slovodej', 'word']
}
