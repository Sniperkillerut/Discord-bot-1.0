exports.run = async (client, msg, args) => {
  const [replyTo, ...replyText] = args
  if (!replyTo || replyTo.trim().length < 1 || !replyText || replyText.length < 1) {
    return msg.reply('You must specify a message ID to reply to and your message')
  }
  const messages = await msg.channel.fetchMessages({ limit: 1, around: replyTo }).catch(() => {
    client.logger.error(console.error)
    msg.reply('Invalid message ID')
  })
  const replyToMsg = messages.first()
  msg.channel.send(replyText.join(' '), {
    embed: {
      color  : 3447003,
      author : {
        name     : `${replyToMsg.author.username} (${replyToMsg.author.id})`,
        icon_url : replyToMsg.author.avatarURL
      },
      description: replyToMsg.content
    }
  })
    .then(() => msg.delete())
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 0
}

exports.help = {
  name        : 'reply',
  description : 'Replies to a message by ID, by embedding the original below your response. Requires embed permissions!',
  usage       : 'reply [message ID]'
}

//TODO: fix when empty