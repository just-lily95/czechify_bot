const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        global.canVoteFor.push(args.shift());
        message.delete();
        var emojis = await global.findEmojis(message.guild, 1, ["cz_check"]);
        var embed = new discord.MessageEmbed()
            .setColor('#fffff')
            .setDescription(args.join(' '))
        var ReactionMessage = await message.channel.send(embed)
        console.log(global.canVoteFor)
    },
    descriptionCZ: "Add a candidate",
    descriptionEN: "Add a candidate",
    allowedIn: ["guild"],
    czAlias: "add-candidate",
    aliases: ['add-candidate']
}
