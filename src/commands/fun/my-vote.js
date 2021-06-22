const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (global.votes[message.author.id]) message.reply('You have voted for ' + global.votes[message.author.id]); else message.reply('You have not voted for anyone.');
    },
    descriptionCZ: "my-vote",
    descriptionEN: "my-vote",
    allowedIn: ["dm"],
    czAlias: "my-vote",
    aliases: ['my-vote']
}
