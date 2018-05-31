const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!message.mentions.users.first()) {
    if (args[0]) {
      return message.reply('Please mention someone to view their status')
    }
    let gameOfNiet
    if (message.author.presence.game === undefined) {
      gameOfNiet = 'According to Discord you aren\'t playing a game.'
    }
    else {
      gameOfNiet = `You're currently playing: **${message.author.presence.game.name}**`
    }
    const userStatus = client.convertPresence(message.author, 'game')
    const embedColor = client.convertPresence(message.author, 'color')
    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}'s status`, client.user.avatarURL)
      .setColor(embedColor)
      .setThumbnail(message.author.avatarURL)
      .addField('Presence', `Your Discord profile status is set to: **${userStatus}**`)
      .addField('Game', `${gameOfNiet}`)
    message.channel.send({ embed })
  }
  else if (message.mentions.users.first() === message.author) {
    message.reply(`Please use \`${message.settings.prefix}status\` without a mention to view your own status.`)
  }
  else {
    let gameOfNiet
    if (!message.mentions.users.first().presence.game) {
      gameOfNiet = `According to Discord *${message.mentions.users.first().username}* isn't playing a game.`
    }
    else {
      gameOfNiet = `*${message.mentions.users.first().username}* is currently playing: **${message.mentions.users.first().presence.game.name}**`
    }
    const userStatus = client.convertPresence(message.mentions.users.first(), 'game')
    const embedColor = client.convertPresence(message.mentions.users.first(), 'color')

    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.mentions.users.first().username}'s status`, client.user.avatarURL)
      .setColor(embedColor)
      .setThumbnail(message.mentions.users.first().avatarURL)
      .addField('Presence', `${message.mentions.users.first().username}'s profile status is set to: **${userStatus}**`)
      .addField('Game', `${gameOfNiet}`)
    message.channel.send({ embed })
  }
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'playerstatus',
  category    : 'timer',
  description : 'Current status of a player',
  usage       : 'playerstatus'
}