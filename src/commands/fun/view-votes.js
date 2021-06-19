const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        var data = {};
        global.canVoteFor.forEach((i) => { data[i] = 0; })
        Object.keys(global.votes).forEach((v) => { if (data[global.votes[v]]) data[global.votes[v]] = 1; else data[global.votes[v]]++; })
        Object.keys(data).forEach((i) => { message.channel.send(i + ' has ' + data[i] + ' votes') })
    },
    descriptionCZ: "view-votes",
    descriptionEN: "view-votes",
    allowedIn: ["guild", "dm"],
    czAlias: "view-votes",
    aliases: ['view-votes']
}
