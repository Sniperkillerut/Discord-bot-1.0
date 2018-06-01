const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const embed = new Discord.RichEmbed()
    .setAuthor('Bot info', '')
    .setThumbnail(client.user.avatarURL)
    .addField('Users', `I'm currently handling \`${client.users.size}\` users`, true)
    .addField('Guilds', `I'm in \`${client.guilds.size}\` guilds`, true)
    .addField('Joined at', `I joined this guild at \`${message.guild.joinedAt}\``, true)
    .addField('Last restart', `My last restart was at \`${client.readyAt}\``, true)
    .addField('Creator', 'I was created by <@143917043383533568> (@Sniperkiller#9709)', true)
    .addField('Player Timers', 'Player timers implemented from [TimePlayed Bot](https://github.com/iGotYourBack/TimePlayed/wiki)', true)
  return message.channel.send(embed)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'botinfo',
  category    : 'Info',
  description : 'Some Bot information',
  usage       : 'botinfo'
}