exports.run = async (client, message, args) => {
  const num_array = args.map(n => parseInt(n))
  const total = num_array.reduce((p, c) => p + c)
  return message.channel.send(total)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'add',
  category    : 'Miscelaneous',
  description : 'Add a series of numbers',
  usage       : 'add 4 5 6 7 8 ...'
}