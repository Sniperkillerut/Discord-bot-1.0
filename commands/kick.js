exports.run = (client, message, args) => {
  const mod_role = message.guild.roles.find('name', 'staff')
  if (!message.member.roles.has(mod_role.id)) {
    return message.reply('You must be staff t use this command')
  }
  if (message.mentions.users.size === 0) {
    return message.reply('you must mention a user to kick')
  }
  const kick_member = message.guild.member(message.mentions.users.first())
  if (!kick_member) {
    return message.reply('invalid user')
  }
  if (message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
    return message.reply('I dont have kick permissions on this server')
  }
  kick_member.kick().then(member => {
    message.reply(`User ${member.user.username} succefully kicked`)
  }).catch(console.error)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'Moderator'
}

exports.help = {
  name        : 'kick',
  category    : 'Miscelaneous',
  description : 'Kicks the mentioned user',
  usage       : 'kick <mention>'
}