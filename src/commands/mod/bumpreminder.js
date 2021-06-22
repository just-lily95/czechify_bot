const discord = require('discord.js');

async function IsBumped(message){
    if (global.isbumped){
        global.embedify(message.guild.name, message.channel, 'Not yet! Too fast!', '#d7141a', '', '', false, '', '', '', true, 15000);
    }else{
        global.isbumped = true;
        setTimeout(function() {
            global.embedify(message.guild.name, message.channel, 'It\' time!', '#d7141a');
        }, 2 * 60 * 60 * 1000);
    }
}
module.exports = {
    run: async (client, message, args) => {
        IsBumped(message)
    },
    descriptionCZ: "Připomenout bamp",
    descriptionEN: "Bump reminder",
    allowedIn: ["guild"],
    czAlias: "N/A",
    aliases: ['bumpreminder', "N/A"]
}
