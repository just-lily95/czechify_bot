module.exports.checkCommandModule = (cmdName, cmdModule) =>
{
    if (!cmdModule.hasOwnProperty('run')) throw new Error('\x1b[31m' + cmdName + ".js does not have a 'run' function defined" + '\x1b[0m');
    if (!cmdModule.hasOwnProperty('descriptionCZ')) throw new Error('\x1b[31m' + cmdName + ".js does not have a 'descriptionCZ' variable defined" + '\x1b[0m');
    if (!cmdModule.hasOwnProperty('descriptionEN')) throw new Error('\x1b[31m' + cmdName + ".js does not have a 'descriptionEN' variable defined" + '\x1b[0m');
    if (!cmdModule.hasOwnProperty('allowedIn')) throw new Error('\x1b[31m' + cmdName + ".js does not have an 'allowedIn' variable defined" + '\x1b[0m');
    if (!cmdModule.hasOwnProperty('czAlias')) throw new Error('\x1b[31m' + cmdName + ".js does not have a 'czAlias' variable defined" + '\x1b[0m');
    if (!cmdModule.hasOwnProperty('aliases')) throw new Error('\x1b[31m' + cmdName + ".js does not have an 'aliases' variable defined" + '\x1b[0m');
    return true;
}

module.exports.checkProperties = (cmdName, cmdModule) => {
    if (!(typeof cmdModule.run == 'function')) throw new Error('\x1b[35m' + "(" + cmdName + ".js => run is not a function" + '\x1b[0m');
    if (!(typeof cmdModule.descriptionCZ == "string")) throw new Error('\x1b[35m' + "(" + cmdName + ".js => descriptionCZ) is not a string" + '\x1b[0m');
    if (!(typeof cmdModule.descriptionEN == "string")) throw new Error('\x1b[35m' + "(" + cmdName + ".js => descriptionEN) is not a string" + '\x1b[0m');
    if (!(Array.isArray(cmdModule.allowedIn))) throw new Error('\x1b[35m' + "(" + cmdName + ".js => allowedIn) is not an array" + '\x1b[0m');
    if (!(typeof cmdModule.czAlias == "string")) throw new Error('\x1b[35m' + "(" + cmdName + ".js => czAlias) is not a string" + '\x1b[0m');
    if (!(Array.isArray(cmdModule.aliases))) throw new Error('\x1b[35m' + "(" + cmdName + ".js => aliases) is not an array" + '\x1b[0m');
    return true;
}
