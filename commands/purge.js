exports.run = async (bot, msg, args) => {
  const user = (msg.mentions.users.first() || bot.users.get(args[0]) || null)
  const amount = user ? parseInt(msg.content.trim().split(/ +/g)[2], 10) : parseInt(msg.content.trim().split(/ +/g)[1], 10)
  if (!amount) {return msg.reply('Must specify an amount to delete!').then(msg.delete(2000))}
  if (!amount && !user) {return msg.reply('Must specify a user and amount, or just an amount, of messages to purge!').then(msg.delete(2000))}
  await msg.delete()
  let messages = await msg.channel.fetchMessages({ limit: 100 })
  if (user) {
    messages = messages.array().filter(m => m.author.id === user.id)
    bot.logger.cmd(`[CMD] ${msg.author} Purged ${amount} messages from channel ${msg.channel}`)
    messages.length = amount
  }
  else {
    messages = messages.array()
    messages.length = amount
  }
  messages.map(async m => { await m.delete().catch(console.error) })
}

exports.conf = {
  enabled   : true,
  guildOnly : true,
  aliases   : [],
  permLevel : 0
}

exports.help = {
  name        : 'purge',
  description : 'Deletes messages from anyone in the channel (requires Manage Messages)',
  usage       : 'purge [number of messages]'
}