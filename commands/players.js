exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const userArray = []
  let stringCount = 0
  let realCount = 0
  let string = ''
  let morePeople = false

  message.guild.members.forEach(function (user, id) {
    if (user.presence.game === null) {
      return
    }
    if (stringCount >= 20) {
      if (user.presence.game.name.toLowerCase() === message.settings.defaultGame.toLowerCase()) {
        realCount++
      }
      morePeople = true
      return
    }
    if (user.presence.game.name.toLowerCase() === message.settings.defaultGame.toLowerCase()) {
      string += `- ${user.user.tag}\n`
      realCount++
      stringCount++

    }
  })

  if (stringCount === 0) {
    string = `Nobody is playing ${message.settings.defaultGame}, you'll have to play with yourself :rolling_eyes:\n` + string
  }
  if (stringCount === 1) {
    string = `**${stringCount} person is playing ${message.settings.defaultGame}:**\n` + string
  }
  if (stringCount > 1) {
    string = `**${stringCount} people are playing ${message.settings.defaultGame}:**\n` + string
  }
  if (morePeople === true) {
    string += `**And ${realCount - stringCount} more people, but I can't send a longer message!**`
  }
  message.channel.send(string)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'players',
  category    : 'Timer',
  description : 'Player Playing Playable Game.',
  usage       : 'players'
}