const discord = require('discord.js');
const fetch = require('node-fetch');
var langResolver = {"cs": "cz", "en": "gb"};

async function translateText(data, data1) {
    data['folder_id'] = "b1g1drn8ercdap54db6k";
    const response = await fetch('https://translate.api.cloud.yandex.net/translate/v2/translate', {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + data1},
        body: JSON.stringify(data)
    });
    return response;
}

async function getToken() {
    const response = await fetch("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
        method: 'POST',
        body: JSON.stringify({ yandexPassportOauthToken: 'AgAAAAArFTmlAATuwTETRou8_UK4pEP9V4uUyNs' })
    });
    return response.json();
}

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var canDo = true;
        if (global.translateToken.time < parseInt(new Date().getTime() / 1000) - 21600000) {
            var newToken = await getToken();
            if (newToken['iamToken']) global.translateToken = { token: newToken['iamToken'], time: parseInt(new Date().getTime() / 1000) }
        }
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if (canDo) {
            var targetLanguage = args[0];
            delete args[0];
            var translation = await translateText({texts: [args.join(" ").trim()], targetLanguageCode: targetLanguage}, global.translateToken.token).then(res => text = res.text())
            if (JSON.parse(translation)['translations']) {
                var toLang = targetLanguage;
                var fromLang = JSON.parse(translation)['translations'][0]['detectedLanguageCode'];
                translation = JSON.parse(translation)['translations'][0]['text'];
                var emojiTo = toLang;
                var emojiFrom = fromLang;
                Object.keys(langResolver).forEach((key) => { if (key == toLang) emojiTo = langResolver[toLang]; })
                Object.keys(langResolver).forEach((key) => { if (key == fromLang) emojiFrom = langResolver[fromLang]; })
                var embed = new discord.MessageEmbed()
                    .setDescription(`:flag_${emojiFrom}: ${args.slice(1).join(' ')}\n\u200B\n:flag_${emojiTo}: ${translation}\n\u200B`)
                    .setColor('#f2ffff')
                    .setFooter(message.author.username, message.author.displayAvatarURL());
                message.channel.send(embed).then((msg) => { msg.delete({ timeout: 30000 }).catch((e) => {}) });
            }else{
                var embed = new discord.MessageEmbed()
                    .setColor("#d7141a")
                    .addFields(
                        { name: '\u200B', value: ':flag_cz: **/translate** *JazykovýKód(ISO639-1)* *TváVěta*!' },
                        { name: '\u200B', value: ':flag_gb: **/translate** *LanguageCode(ISO693-1)* *YourSentence*!' }
                    )
                    .setThumbnail("https://i.imgur.com/AveAmWu.gif");
                message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            }
        }else{
            var embed = new discord.MessageEmbed()
                .setColor("#d7141a")
                .addFields(
                    { name: '\u200B', value: ':flag_cz: **/translate** *JazykovýKód(ISO639-1)* *TváVěta*!' },
                    { name: '\u200B', value: ':flag_gb: **/translate** *LanguageCode(ISO693-1)* *YourSentence*!' }
                )
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Přelož něco",
    descriptionEN: "Translate something",
    allowedIn: ['guild', 'dm'],
    czAlias: "přeložit",
    aliases: ['translate', 'tra', 'prelozit', 'preloz', 'preklad', 'tr']
}
