const discord = require('discord.js');

async function prompt(message, role, roles) {
    var embed = new discord.MessageEmbed()
        .setColor("#ffa530")
        .addFields({ name: '\u200B', value: ':flag_cz: Czech získat roli <@&' + role.id + '>?' }, { name: '\u200B', value: ':flag_gb: Do you want to get the role <@&' + role.id + '>?' });
    var msg = await message.channel.send(embed);
    await global.react(msg, ['✅', '❎']);
    const filter = (reaction, user) => { return ((["✅", "❎"].includes(reaction.emoji.name))&&(user.id === message.author.id)); };
    const collector = msg.createReactionCollector(filter, { max: 1, time: time });
    collector.on('collect', async (reaction, reactionCollector) => {
        if (reaction.emoji.name == "✅") {
            roles.forEach((role) => { if (message.member.roles.cache.has(role.id)) message.member.roles.remove(role); })
            message.member.roles.add(role)
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields({ name: '\u200B', value: ':flag_cz: Pocházíš z ' + role.name + '!' }, { name: '\u200B', value: ':flag_gb: You are from ' + role.name + '!' });
            reaction.message.edit(embed).then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) })
            reaction.message.reactions.removeAll()
        }else {
            reaction.message.delete()
        }
    });
}

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var foundStuff = false;
        if (args[0].includes("/")){
            var embed = new discord.MessageEmbed()
                .setColor("#d7141a")
                .addFields({ name: '\u200B', value: `:flag_cz: Napiš **/pocházímz JménoZeměAnglicky**!` }, { name: '\u200B', value: `:flag_gb: Write **/imfrom CountryNameInEnglish**!` })
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }
        var rolesCanBeRequested = await global.findRoles(message.guild, 1, ['16775680']);
        var possibleRoles = [];
        rolesCanBeRequested.forEach((role) => { if ((role.name.cu().includes(args.join(' ').cu()))||(args.join(' ').cu().includes(role.name.cu()))) possibleRoles.push(role); })
        var x = true;
        possibleRoles.forEach((role) => {
            if ((x)&&(role.name.cu() == args.join(' ').cu())) {
                prompt(message, role, rolesCanBeRequested)
                foundStuff = true;
                return;
            }
        })
        if (!(foundStuff)) {
            var smallestLenDiff = Infinity;
            possibleRoles.forEach((role) => {
                if (role.name.cu().length >= args.join(' ').cu().length) var lenDiff = role.name.cu().length - args.join(' ').cu().length; else var lenDiff = args.join(' ').cu().length - role.name.cu().length;
                if (lenDiff < smallestLenDiff) smallestLenDiff = lenDiff;
            })
            var x = true;
            possibleRoles.forEach((role) => {
                if (x) {
                    if (role.name.cu().length >= args.join(' ').cu().length) var lenDiff = role.name.cu().length - args.join(' ').cu().length; else var lenDiff = args.join(' ').cu().length - role.name.cu().length;
                    if (smallestLenDiff == lenDiff) {
                        prompt(message, role, rolesCanBeRequested)
                        foundStuff = true;
                        return;
                    }
                }
            })
        }
        if (!(foundStuff)) {
            var embed = new discord.MessageEmbed()
                .setColor("#d7141a")
                .addFields({ name: '\u200B', value: `:flag_cz: Ještě nemáme tu zemi!` }, { name: '\u200B', value: `:flag_gb: We don't have that country yet!` })
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) })
        }
    },
    descriptionCZ: "Nastav si svou zemi",
    descriptionEN: "Set your country",
    allowedIn: ["guild"],
    czAlias: "pocházímz",
    aliases: ['imfrom', 'jsemz', 'pochazimz', 'iamfrom']
}
