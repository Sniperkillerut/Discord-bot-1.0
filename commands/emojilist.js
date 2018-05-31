exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const emojiList = await message.guild.emojis.map(e => e.toString()).join(' ')
  message.channel.send('This server emojis:')
  message.channel.send(emojiList)
  if (message.author.id === client.config.ownerID) {
    const emojiList2 = await client.emojis.map(e => e.toString()).join(' ')
    message.channel.send('All the bot emojis:')
    message.channel.send(emojiList2)
  }

}

exports.conf = {
  enabled   : true,
  guildOnly : true,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'emojilist',
  category    : 'Miscelaneous',
  description : 'Lists all the emojis in the guild',
  usage       : 'emojilist'
}