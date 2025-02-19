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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function awaitCommandsLoad(client) {
    x = false;
    setInterval(function() {
        if (Object.keys(client.commands.locales).length > 0) {
            count = Object.keys(client.commands.locales).length;
            setInterval(function() {
                if (Object.keys(client.commands.locales).length == count) x = true;
            }, 500)
        }
    }, 100)
    while (!(x)) {
        await sleep(100);
        console.log('Awaiting commands load...');
    }
    console.log("Commands loaded");
    return;
}

global.statusCycle = 0;
global.hiddenCategories = {"mod": true}
global.hiddenCommands = {'bumpreminder': true, "thanks": true, 'add': true, 'check-servers': true}
module.exports = async (client) => {
    console.log(client.user.tag + ' funguje');

    cmds = {}

    Object.keys(client.commands).forEach((cmd) => {
        cmds[client.commands[cmd][5]] = cmd;
        cmds[client.commands[cmd][6]] = cmd;
    })
    /*
    var app = client.api.applications(client.user.id);
    client.guilds.cache.forEach(async (guild) => {
        app.guilds(guild.id);
        //var x = await app.commands.post({data: {name: 'help', description: 'Test command'}});
        var x = await app.commands.get();
        console.log(x);
    })
    */

    await awaitCommandsLoad(client);

    console.log(client.commands);

    client.ws.on('INTERACTION_CREATE', global.imports[1].f)

    setInterval(function() {
        global.statusCycle++;
        guilds = [];
        client.guilds.cache.forEach((guild) => { guilds.push(guild.name); })
        if (global.statusCycle == 1) {
            client.user.setActivity("/help", { type: 'LISTENING' });
        }else if (global.statusCycle == 2){
            var members = 0;
            client.guilds.cache.forEach((guild) => { members = members + guild.memberCount; })
            client.user.setActivity(' ' + members + ' members', { type: 'WATCHING' })
            //client.user.setActivity('in ' + client.guilds.cache.size + " server" + p)
        }else if (global.statusCycle == 3) {
            var cmds = [];
            Object.keys(client.commands.commands).forEach((cmd) => {
                cmd = client.commands[cmd];
                // console.log(cmd[5]);
                if ((!((global.hiddenCategories[cmd[2]])||(global.hiddenCommands[cmd[5]])))&&(!(cmds.includes(cmd[5])))) cmds.push(cmd[5]);
                // console.log(JSON.stringify(cmds));
            })
            client.user.setActivity("/" + Object.keys(client.commands.commands)[Math.floor(Math.random() * Object.keys(client.commands.commands).length)], { type: 'LISTENING' })
            global.statusCycle = 1;
        }
    }, 15000)

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            var welcomeChannel = await global.findChannels(3, guild, ['👋'], ['text']);
            if (welcomeChannel.length) {
                var role = await global.findARole(guild, 0, "Learning Czech");
                welcomeChannel[0].send('<@&' + role.id + '>').then((msg) => { msg.delete().catch((e) => {}) });
                global.embedify(guild.id, guild.name, welcomeChannel[0], ['Please set your Czech level by using the `/level` command'], '#d7141a', 'Vítej! Pro odemčení serveru si nastav úroveň češtiny!', '', false, '', '', '', true, 3600000);
            }
        })
    }, 3600000)

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            serverLocale = global.getServerLocale(guild.id, guild.name);
            serverLanguageName = global.locale2language(serverLocale);
            // create invite for all guilds which dont have a locale :smile:
            // GuildChannel.createInvite()
            // console.log(guild.channels.cache); //im not sure why i put this here, absolutely no clue, maybe to fetch vitejte messages and like check if there are any just sitting there
            if (!(serverLocale)) throw new Error('Server Locale could not be found for ' + guild.name + '/' + guild.id)

            var roles = global.sortByKey(await global.findRoles(guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
            if (!(roles.length == 6)) return;
            var ms = {};
            var members = await guild.members.fetch();
            members.forEach((member) => {
                ms[member.id] = member;
            })
            members.forEach(async (member) => {
                var hasARole = false;
                roles.forEach(async (role) => { if ((member.roles.cache.has(role.id))||(member.user.bot)) hasARole = true; })
                if ((!(hasARole))&&(roles[0])&&(roles[1])&&(roles[2])&&(roles[3])&&(roles[4])&&(roles[5])) {
                    var welcomeChannel = await global.findChannels(3, guild, ['👋'], ['text']);
                    global.embedify(guild.id, guild.name, member, global.initialWelcomeMessageText(guild.name, welcomeChannel.id), '#d7141a', 'Vítej, ' + member.displayName + '!');
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
