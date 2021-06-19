async function handleSlashCommands(interaction) {
    if (interaction['data']) {
        var commandName = interaction['data']['name'].cu()
        if (client.commands[commandName]) client.commands[commandName][0](client); else console.log('Command no longer exists');
    }else console.log('An interaction error has occured');
}

module.exports = { f: handleSlashCommands }