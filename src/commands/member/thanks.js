const discord = require('discord.js');
const fetch = require('node-fetch');

async function SaveToDB(questioner, answerer) {
    var answers = await Stats.findOneAndUpdate({ userID: answerer }, { $inc: { answers: 1 } }, {new: true});
    var questions = await Stats.findOneAndUpdate({ userID: questioner }, { $inc: { questions: 1 } }, {new: true});
}

module.exports = {
    run: async (client, message, args) => {
        if (!(message.mentions.members.first())) {
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .setDescription(':flag_cz: Prosím označ komu děkuješ!\n\n:flag_gb: Please mention who you want to thank!');
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }

        if (message.mentions.members.size > 5) {
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .setDescription(':flag_cz: TRANSLATION_NEEDED!\n\n:flag_gb: You cannot thank more than 5 people at once!');
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }

        var czechifyID = await fetch('https://najemi.cz/czechifyapi/userID.php?userID=' + message.author.id + '&userIDType=discord', {headers: {'Authorization': global.apiAuth[0]}});
        czechifyID = await czechifyID.json();
        if (czechifyID['error']) {
            console.log(czechifyID['error']);
            return
        }

        if (czechifyID['success']['output'][0]['Account ID']) czechifyID = czechifyID['success']['output'][0]['Account ID']; else { console.log(czechifyID); return; }

        var payload = JSON.stringify(message.mentions.members);
        var response = await fetch('https://najemi.cz/czechifyapi/words/?userID=' + czechifyID, {method: 'POST', body: JSON.stringify(payload), headers: {'Authorization': global.apiAuth[0]}});
        response = await response.json()

        console.log(response);



        return;

        if (message.mentions.members.first().id == message.author.id) {
            var emoji = await global.findEmoji(message.guild, 'thinkingbeer');
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .setDescription(':flag_gb: Who thanks themselves? <:' + emoji.name + ':' + emoji.id + '>\n:flag_cz: Kdo děkuje sám sobě? <:' + emoji.name + ':' + emoji.id + '>')
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }









        try {
            thanksDB = JSON.parse(await fetch("https://najemi.cz/czechifyapi/discord/thanks/?action=fetch").then(res => res.text()))
        }catch(error) {
            throw new Error('ThanksDB is invalid!');
        }
        if (thanksDB[message.author.id]) {
            if ((thanksDB[message.author.id]['thanked'].slice(-1).pop())&&(thanksDB[message.author.id]['thanked'].slice(-1).pop()['time'] + 300 > new Date().getTime() / 1000)&&(thanksDB[message.author.id]['thanked'].slice(-1).pop()['thanked'] == message.mentions.members.first())) {
                var embed = new discord.MessageEmbed()
                    .setColor("#ff3c36")
                    .setDescription(':flag_gb: You cannot thank the same person twice within a 5 minute period! :scream:\n:flag_cz: Nemůžete poděkovat stejné osobě dvakrát během 5 minut! :scream:')
                message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
                return;
            }else if ((thanksDB[message.author.id]['thanked'].slice(-1).pop())&&(thanksDB[message.author.id]['thanked'].slice(-1).pop()['time'] + 150 > new Date().getTime() / 1000)) {
                message.reply('You can only thank once every 150 seconds.')
                var embed = new discord.MessageEmbed()
                    .setColor("#ff3c36")
                    .setDescription(':flag_gb: You can only thank once every 150 seconds! :scream:\n:flag_cz: Můžete poděkovat pouze jednou za 150 sekund! :scream:')
                message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
                return;
            }
        }

        var thanksDB = await fetch("https://najemi.cz/czechifyapi/discord/thanks/?action=log&data=" + encodeURIComponent(JSON.stringify({ "thanker": message.author.id, "thanking": message.mentions.members.first().id, "message": 'https://discord.com/channels/' + message.guild.id + '/' + message.channel.id + '/' + message.id + '/' }))).then(res => res.text())

        var thanksDB = await fetch("https://najemi.cz/czechifyapi/discord/thanks/?action=fetch").then(res => res.text())
        thanksDB = JSON.parse(thanksDB);

        var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["cz_check", "cz_what"]), "name");

        var embed = new discord.MessageEmbed()
            .setColor("#ffa530")
            .setDescription('<@' + message.mentions.members.first().id + '>** • ' + thanksDB[message.mentions.users.first().id]['was_thanked'].length + ' <:' + emojis[0].name + ':' + emojis[0].id + '>**\n<@' + message.member.id + '>** • ' + thanksDB[message.member.id]['thanked'].length + ' <:' + emojis[1].name + ':' + emojis[1].id + '>**' )
        message.channel.send(embed).then((msg) => { msg.delete({ timeout: 30000 }).catch((e) => {}) });
    },
    descriptionCZ: "Poděkuj",
    descriptionEN: "Thank someone",
    allowedIn: ["guild"],
    czAlias: "děkuji",
    aliases: []
}
