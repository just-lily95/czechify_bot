discord = require('discord.js');
const fetch = require('node-fetch');

async function lots_of_messages_getter(channel, limit = 120) {
    //console.log('Running: ' + channel.name)
    var sum_messages = [];
    let last_id;
    while (true) {
        var options = { limit: 100 };
        if (last_id) options.before = last_id;
        var messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;
        if ((messages.size != 100)||(sum_messages.length >= limit - 50)) break;
    }
    //console.log('Done: ' + channel.name)
    return sum_messages;
}

async function getInactiveUsers1(guild) {
    var channels = await guild.channels.cache;
    var textChannels = [];
    //var historyChannelID = guild.channels.find(channel => channel.name === "H")
    var allowedCategories = [/*'777607479474520104', '434223601776853002'*/];
    var allowedChannels = ['782685540934877234'/*, '782687544818794506', '767360279423221790'*/];
    channels.forEach((channel) => { if (((allowedCategories.includes(channel.parentID))||(allowedChannels.includes(channel.id)))&&(channel.type == 'text')) { textChannels.push(channel); } })
    var messageSets = [];
    textChannels.forEach(async(textChannel) => {
        //console.log(textChannel.name)
        var messages = lots_of_messages_getter(textChannel);
        //console.log('messages loaded: ' + textChannel.name);
        messages = messages.then((x) => { messageSets.push(messages) });
        //console.log('done: ' + textChannel.name)
        console.log(messageSets.length)
    });
    await setInterval(function() {
        console.log(messageSets.length)
        if (messageSets.length == textChannels.length) { console.log('returning'); return messageSets; }
    }, 1000)
}

async function getInactiveUsers(guild) {
    var messageSets = await getInactiveUsers1(guild);
    console.log(messageSets);





}

async function randomStuff(arr2) {
    allMsgs = [];
    await arr2.forEach(async(msgs) => { await arr3.forEach(async(msg) => { await arr3.push(await msg.author.id); }); })
    return allMsgs
}

global.temp = 1;
global.hiddenCategories = {"mod": true}
global.hiddenCommands = {'bumpreminder': true, "thanks": true, 'add': true, 'check-servers': true}
module.exports = async (client) => {
    console.log(client.user.tag + ' funguje');
  
    global.thanksWords = await fetch('http://localhost/getThanksData.php');
    global.thanksWords = await global.thanksWords.json();
    global.botPrefix = await fetch('http://localhost/getBotPrefix.php');
    global.botPrefix = await global.botPrefix.text();

    console.log(global.thanksWords)
  
    global.thanksWords = await fetch('http://localhost/getBotPrefix.php');
    global.thanksWords = await global.thanksWords.json();
    global.botPrefix = await fetch('http://localhost/getBotPrefix.php');
    global.botPrefix = await global.botPrefix.text();

    client.ws.on('INTERACTION_CREATE', global.imports[1].f)

    setInterval(function() {
        guilds = [];
        client.guilds.cache.forEach((guild) => { guilds.push(guild.name) })
        // console.log(JSON.stringify(guilds));

        modes = guilds.length + 2;

        if (global.temp == 1) {
            client.user.setActivity("/pomoc", { type: 'LISTENING' });
            global.temp = 2;
        }else if (global.temp == 2){
            var members = 0;
            client.guilds.cache.forEach((guild) => { members = members + guild.memberCount; })
            //if (!(client.guilds.cache.size == 1)) p = 's'; else p = '';
            if (!(members == 1)) p = 's'; else p = '';
            client.user.setActivity(' ' + members + ' member' + p, { type: 'WATCHING' })
            //client.user.setActivity('in ' + client.guilds.cache.size + " server" + p)
            global.temp = 3;
        }else if (global.temp == 3) {
            var cmds = [];
            Object.keys(client.commands).forEach((cmd) => {
                cmd = client.commands[cmd];
                // console.log(cmd[5]);

                if ((cmd[2])&&(cmd[5])) if (!((global.hiddenCategories[cmd[2]])||(global.hiddenCommands[cmd[5]]))) if (!(cmds.includes(cmd[5]))) cmds.push(cmd[5]);
                // console.log(JSON.stringify(cmds));
            })
            client.user.setActivity("/" + cmds[Math.floor(Math.random() * cmds.length)], { type: 'LISTENING' })
            global.temp = 1
        }
    }, 15000)

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            var channel = await global.findAChannel(0, guild, "vitejte");
            if (channel) {
                var role = await global.findARole(guild, 0, "Learning Czech");
                channel.send('<@&' + role.id + '>').then((msg) => { msg.delete().catch((e) => {}) });
                global.embedify(guild.name, channel, ['Please set your Czech level by using the `/level` command'], '#d7141a', 'Vítej! Pro odemčení serveru si nastav úroveň češtiny!', '', false, '', '', '', true, 60000);
            }
        })
    }, 60000)

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            serverLanguageLocale = global.languageResolver(guild.name);
            serverLanguageName = global.languageNameResolver(serverLanguageLocale);

            var roles = global.sortByKey(await global.findRoles(guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
            if (!(roles.length == 6)) return;
            var ms = {};
            var members = await guild.members.fetch();
            members.forEach((member) => {
                ms[member.id] = member;
                var hasARole = false;
                roles.forEach(async (role) => { if ((member.roles.cache.has(role.id))||(member.user.bot)) hasARole = true; })
                if ((!(hasARole))&&(roles[0])&&(roles[1])&&(roles[2])&&(roles[3])&&(roles[4])&&(roles[5])) {
                    global.embedify(member.guild.name, member, global.initialWelcomeMessageText(member.guild.name, serverLanguageName), '#d7141a', 'Vítej, ' + member.displayName + '!');
                    member.roles.add(roles[4])
                }
            })
            var roleToCheck = await global.findARole(guild, 0, 'Learning Czech');
            var roleToGive = await global.findARole(guild, 0, 'Pending Kick 1');
            var timeNow = Math.round(new Date().getTime() / 1000);
            timeBeforeKick = 7890000;
            roleToCheck.members.forEach((member) => { if (!(member.roles.cache.has(roleToGive.id))) if (timeNow - timeBeforeKick > Math.round(member.joinedTimestamp / 1000)) member.roles.add(roleToGive); else ; else if (timeNow - timeBeforeKick < Math.round(member.joinedTimestamp / 1000)) member.roles.remove(roleToGive); })

            return;
            //var rolesToCheck = await global.sortByKey(await global.findRoles(guild, 0, ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native Speaker']), 'name');
            console.log('err');
            await getInactiveUsers(guild);
            return;
            var haveSent = [];
            var allMsgs = [];
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            var channels = await guild.channels.cache;
            var letRun = false;
            await channels.forEach(async(channel) => { if (await channel.type == 'text') arr1.push(channel); })
            await arr1.forEach(async(channel) => { await arr2.push(await lots_of_messages_getter(channel)); console.log('err'); })
            console.log(arr2);
            var arr2 = await Promise.all(arr2);
            await arr2.forEach(async(msgs) => { await msgs.forEach(async(msg) => { await allMsgs.push(msg.author.id); }); })
            console.log(allMsgs.length);
            var allMsgs = allMsgs.filter(function(item, pos, self) { return self.indexOf(item) == pos; })
            console.log(allMsgs.length);
        })
    }, 15000)

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            var roleToCheck = await global.findARole(guild, 0, 'Pending Kick 1');
            var timeNow = Math.round(new Date().getTime() / 1000);
            timeBeforeKick = 7890000;
            var x = 0;
            roleToCheck.members.forEach((member) => {
                if (member.user.lastMessageID) if (timeNow - timeBeforeKick < Math.round(member.user.lastMessageID / 1000)) if (x <= 25) { x++; member.kick(); console.log('Cleaning...'); } else ; else if (x <= 25) { x++; member.kick(); console.log('Cleaning...'); }
            })
        })
    }, 604800000)
};
