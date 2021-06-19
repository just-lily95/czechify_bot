const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = async (client, oldMember, newMember) => {
    var logChannel = await global.findAChannel(0, oldMember.member.guild, "voice-logs");

    var deafenLogs = await global.findAChannel(0, oldMember.member.guild, "mute-logs");

    if (!(logChannel)) return;

    if ((oldMember.channel)&&(newMember.channel)&&(oldMember.channel.id == newMember.channel.id)) {
        /*
        var msg = '';

        var muteLogs = await global.findAChannel(0, oldMember.member.guild, "mute-logs");

        if (!(muteLogs)) return;

        var changes = [];
        if ((oldMember.selfMute)&&(!(newMember.selfMute))) changes.push('self_unmute'); else if ((!(oldMember.selfMute))&&(newMember.selfMute)) changes.push('self_mute');
        if ((oldMember.selfDeaf)&&(!(newMember.selfDeaf))) changes.push('self_undeafen'); else if ((!(oldMember.selfDeaf))&&(newMember.selfDeaf)) changes.push('self_deafen');
        if ((oldMember.serverMute)&&(!(newMember.serverMute))) changes.push('server_unmute'); else if ((!(oldMember.serverMute))&&(newMember.serverMute)) changes.push('server_mute');
        if ((oldMember.serverDeaf)&&(!(newMember.serverDeaf))) changes.push('server_undeafen'); else if ((!(oldMember.serverDeaf))&&(newMember.serverDeaf)) changes.push('server_deafen');

        console.log(changes);

        changes = JSON.parse(JSON.stringify(changes));

        if (changes == []) {
            return;
        }else {
            console.log(changes);
            if (changes == ['self_mute']) {
                msg = ' muted themselves in ' + newMember.channel.name;
                console.log(msg)
            }else if (changes == ['self_deafen']) {
                msg = ' is cheating in ' + newMember.channel.name;
                console.log(msg)
            }else if (changes == ['self_mute', 'self_deafen']) {
                msg = ' deafened themselves in ' + newMember.channel.name;
                console.log(msg)
            }else if (changes == ['server_mute']) {
                msg = ' was muted by an admin or doesnt have permissions to speak in ' + newMember.channel.name;
                console.log(msg)
            }else if (changes == ['server_mute', 'server_deafen']) {
                msg = ' was muted and deafened in one swift action in ' + newMember.channel.name;
                console.log(msg)
            }else if (changes == ['server_deafen']) {
                msg = ' was deafened by an admin or doesnt have permissions to listen in ' + newMember.channel.name;
                console.log(msg)
            }else {
                console.log('ffs')
                console.log(changes)
            }
        }

        console.log('msg: ' + msg)

        let embed = new Discord.MessageEmbed()
            .setDescription(`${oldMember.member} ` + msg)
            .setColor('#61ff6e')
        muteLogs.send(embed);
        */
        return;
    }

    if (oldMember.channel === null) {
        if (!(newMember.channel === null)) {
            let embed = new Discord.MessageEmbed()
                .setDescription(`${oldMember.member} joined ` + newMember.channel.name)
                .setColor('#61ff6e')
            logChannel.send(embed);
        }
    }else if (newMember.channel === null) {
        let embed = new Discord.MessageEmbed()
            .setDescription(`${oldMember.member} left ` + oldMember.channel.name)
            .setColor('#fc2c03')
        logChannel.send(embed);
    }else {
        let embed = new Discord.MessageEmbed()
            .setDescription(`${oldMember.member} moved from ` + oldMember.channel.name + ` to ` + newMember.channel.name)
            .setColor('#e5f50f')
        logChannel.send(embed);
    }

    var states = Object.fromEntries(oldMember.guild.voiceStates.cache);
    var VCs = await global.findChannels(3, oldMember.member.guild, [""], ["voice"])
    var data = {};
    VCs.forEach((vc) => {
        data[vc.id] = { name: vc.name, members: [] };
        vc.members.forEach((member) => { if ((states[member.id])&&(!((states[member.id].serverMute)||(states[member.id].serverDeaf)||(states[member.id].selfMute)||(states[member.id].selfDeaf)))) data[vc.id]['members'].push(member.id); })
    })
    await fetch("https://najemi.cz/czechifyapi/discord/stats?action=log&guild=" + oldMember.member.guild.id + "&data=" + encodeURI(JSON.stringify(data))).then(res => res.text())
}
