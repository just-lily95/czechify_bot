function getApp(guildID) {
    const app = client.api.applications(client.user.id)
    if (guildID) app.guilds(guildID);
    return app;
}

async function handleSlashCommands(interaction) {
    console.log(interaction)
}

module.exports = { f: handleSlashCommands }