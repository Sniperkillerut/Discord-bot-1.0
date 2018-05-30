exports.run = (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {return message.reply('Arrooo???')}
  message.channel.send(args.join(' '))
  message.delete()
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'speak',
  category    : 'Miscelaneous',
  description : 'Makethe bot say something',
  usage       : 'say hello!'
}