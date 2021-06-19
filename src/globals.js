const fetch = require('node-fetch');

global.apiAuth = ['4d624be15055ca2a9b14d5acc23b358bf14e06fb65fb89be915b1eb5553d5a90'];
global.votes = {};
global.tortureUsers = ['597186801777508380', '792832833340309524', '816776337980653629', '815295491746431027', '813868232255078460', '814647259206647899', '812822785884815400', '809837433193365537', '807623846110167090', '774728124330934333', '817149740084363308', '488417311653625858'];
global.canVoteFor = [];
global.isBumped = false;
global.allowedUsers = ['243425689376653312', '270973904359653387', '298873046696067072'];

global.react = async function(msg, emojis) { try { emojis.forEach((emoji) => msg.react(emoji)) }catch{ } }
global.removeAccents = function(str) { return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

global.initialWelcomeMessageText = function(guildName, welcomeChannelID) {
    serverLanguageName = global.locale2language(global.getServerLocale(guildName))
    return ['__**', 'Welcome to', ' ', guildName, '**, ', 'the ' + serverLanguageName + ' learning server', '__', '!', '\n', '\n • ', 'First, set your ' + serverLanguageName + ' level by using the `/level` command in ', ' <#' + welcomeChannelID + '>', '!', '\n • ', 'Check out our YouTube channel', ': ', 'https://youtube.com/LearnCzech/'];
}

async function fetchEssentialInfo() {
    global.thanksWords = await fetch('http://localhost/getThanksData.php');
    global.thanksWords = await global.thanksWords.json();
    global.botPrefix = await fetch('http://localhost/getBotPrefix.php');
    global.botPrefix = await global.botPrefix.text();
    global.serverLocaleInfo = await fetch('http://localhost/getServerLocaleInfo.php');
    global.serverLocaleInfo = await global.serverLocaleInfo.json();
}

fetchEssentialInfo();
setInterval(function() { fetchEssentialInfo(); }, 60000);

String.prototype.l = function() { return this.toLowerCase(); }
String.prototype.cu = function() { return global.removeAccents(this.toLowerCase()); }
String.prototype.rr = function(t, t1 = '', pm = 100) {
    x = this;
    p = 0;
    while (this.includes(t)) {
        p++;
        if (pm > 50) break;
        x = x.replace(t, t1);
    }
    return x;
}
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
global.embedify = async function(guildID, guildName, channel, text, color, title = '', author = '', footer = false, content = '', displayName = '', avatarURL = '', _delete = false, deleteTimer = 0) {
    var languageTo = global.getServerLocale(guildID, guildName);
    var flag1 = global.flagResolver(languageTo);
    var flag2 = global.flagResolver('EN_GB');
    var translatedText = await global.translatify('EN_GB', languageTo, text);
    var embed = new discord.MessageEmbed()
        .setDescription(flag1 + ' ' + translatedText + '\n\n' + flag2 + ' ' + text.join(''))
        .setColor(color)
    if (title) embed.setTitle(title)
    if (author) embed.setAuthor(author)
    if (footer) embed.setFooter(displayName + '\n' + content, avatarURL)
    var msg = await channel.send(embed);
    if (_delete) msg.delete({timeout:deleteTimer});
    return msg;
}
global.id2locale = function(guildID) {
    if (global.serverLocaleInfo['id2locale']) return global.serverLocaleInfo['name2locale'][guildID]; else return false;
}
global.name2locale = function(guildName) {
    if (global.serverLocaleInfo['name2locale']) return global.serverLocaleInfo['name2locale'][guildName]; else return false;
}
global.locale2language = function(locale) {
    if (global.serverLocaleInfo['locale2language']) return global.serverLocaleInfo['locale2language'][locale]; else return false;
}
global.flagResolver = function(langCode) {
    return ':flag_' + langCode.split('_')[1].l() + ':';
}
global.translatify = async function(fromLang, toLang, text) {
    var response = await fetch('http://localhost/translate.php?fromLang=' + fromLang + '&toLang=' + toLang + '&text=' + encodeURIComponent(JSON.stringify(text)));
    console.log('http://localhost/translate.php?fromLang=' + fromLang + '&toLang=' + toLang + '&text=' + encodeURIComponent(JSON.stringify(text)))
    var text = await response.text();
    if (text == 'None') { console.log('http://localhost/translate.php?fromLang=' + fromLang + '&toLang=' + toLang + '&text=' + encodeURIComponent(JSON.stringify(text))); console.log('TRANSLATION NOT FOUND IN DB'); }
    return text;
}
global.getServerLocale = function(guildID, guildName) {
    var locale = global.id2locale(guildID);
    if (locale) return locale;
    return global.name2locale(guildName);
}
module.exports = { };
