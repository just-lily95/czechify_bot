const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var response = await fetch("https://www.sms-vtipy.tk/").then(res => res.text())
        var jokes = [];
        response.split('<div style="display: inline-block; max-width: 25vw;"><h5 align="left" style="margin: 5px 0 0 0;">').forEach((entry) => { if ((entry.includes('</h5></div><br>\n'))&&(entry.split('</h5></div><br>\n')[0].length < 2000)) jokes.push(entry.split('</h5></div><br>\n')[0]); })
        var joke = jokes[Math.floor(Math.random() * jokes.length)];
        while (joke.includes("<br />")) joke = joke.replace("<br />", "\n");

        if (global.translateToken.time < parseInt(new Date().getTime() / 1000) - 21600000) {
            var newToken = await getToken();
            if (newToken['iamToken']) global.translateToken = { token: newToken['iamToken'], time: parseInt(new Date().getTime() / 1000) }
        }
        var englishJoke = JSON.parse(await translateText({texts: [joke], targetLanguageCode: 'en'}, global.translateToken.token).then(res => text = res.text()));

        console.log(englishJoke);

        return;

        var embed = new discord.MessageEmbed()
            .setDescription(':flag_cz: ' + joke + "\n\n" + ':flag_gb: ' + englishJoke)
            .setColor('#d7141a')
        message.channel.send(embed).then((msg) => { msg.delete({ timeout: 60000 }).catch((e) => {}) })
    },
    descriptionCZ: "Poslat vtip",
    descriptionEN: "Send a joke",
    allowedIn: ['guild', 'dm'],
    czAlias: "vtip",
    aliases: ['joke', 'vtipy', "vtip"]
}
