const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (message.guild) message.delete();
        if (global.canVoteFor.includes(args[0])) {
            global.votes[message.author.id] = args.join(' ')
            message.author.send('You have voted for ' + args.join(' '))
        }else {
            message.author.send('Please specify the name of a valid candidate, candidates: ' + global.canVoteFor.join('; '));
        }
        console.log(global.votes)
    },
    descriptionCZ: "Hlasovat",
    descriptionEN: "Vote",
    allowedIn: ["guild", "dm"],
    czAlias: "hlasovat",
    aliases: ['vote', 'hlasovat']
}
