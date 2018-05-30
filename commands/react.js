exports.run = async (client, message, args) => {
  // await message.react(client.emojis.find('name', '100'))
  const emoj = await client.emojis.random()
  message.react(emoj)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'react',
  category    : 'Miscelaneous',
  description : 'Reacts to the last message',
  usage       : 'react'
}