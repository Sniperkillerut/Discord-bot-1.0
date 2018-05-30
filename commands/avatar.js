exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (message.mentions.users.size === 0) {
    message.reply(message.author.avatarURL)
    return
  }
  message.reply(message.mentions.users.first().avatarURL)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'avatar',
  category    : 'Miscelaneous',
  description : 'Return the user\'s avatar',
  usage       : 'avatar'
}