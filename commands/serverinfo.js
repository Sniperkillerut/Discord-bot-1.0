const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setDescription(`${message.guild.name}'s Information and Details`)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
    .addField('Members', `${message.guild.members.filter(member => member.user.bot).size} bots of ${message.guild.memberCount} members.`)
    .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice / ${message.guild.channels.filter(chan => chan.type === 'text').size} text`)
    .addField('Roles', message.guild.roles.map(role => role.name).join(', '))
  message.channel.send({ embed })
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'serverinfo',
  category    : 'Miscelaneous',
  description : 'Shows this server information',
  usage       : 'serverinfo'
}