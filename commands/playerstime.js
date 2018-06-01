const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!message.mentions.users.first()) {
    const timePlayedWeek = client.timePlayed(message.author.id, message.settings.defaultGame, '7d')
    const timePlayedDay = client.timePlayed(message.author.id, message.settings.defaultGame, 'today')
    const timePlayedAll = client.timePlayed(message.author.id, message.settings.defaultGame)

    if (timePlayedAll === 0) {
      return message.reply(`You haven't (according to Discord) ever played ${message.settings.defaultGame} since I measured your playtime!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.author.id}.txt`)}\`)*`)
    }
    /*if (timePlayedCustom >= 0) {
      let string = `${client.convertSince(since)}, you've played \`${client.timeConvert(timePlayedCustom)}\` ${message.settings.defaultGame}!`
      if (sinceWarning == true) {
        string += `\n**Warning**: this information is inaccurate, because I started measuring your playtime later than the time you specified.\n(measuring started ${client.MSDays(Math.abs(new Date() - new Date(fs.readFileSync(`./data/startDates/${message.author.id}.txt`))))} days ago)`
      }
      return message.reply(string)
    }*/
    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}'s ${message.settings.defaultGame} playtime`, message.author.avatarURL)
      .setColor(3447003)
      .setFooter(`"Total" measured from ${fs.readFileSync(`./data/startDates/${message.author.id}.txt`)}`)
      .setThumbnail(client.getThumbnail(message.settings.defaultGame))
    if (timePlayedWeek === -2) {
      embed.addField('Last week', 'Your data hasn\'t been logged for a week, so I can\'t show you this information!')
    }
    else {
      embed.addField('Last week', `You've played \`${client.timeConvert(timePlayedWeek)}\` ${message.settings.defaultGame} this week`)
    }
    if (timePlayedDay === -2) {
      embed.addField('Today', 'Your data hasn\'t been logged for a day, so I can\'t show you this information!')
    }
    else {
      embed.addField('Today', `You've played \`${client.timeConvert(timePlayedDay)}\` ${message.settings.defaultGame} today`)
    }
    embed.addField('Total', `You've played \`${client.timeConvert(timePlayedAll)}\` ${message.settings.defaultGame} in total (see footer)`)
    message.channel.send({ embed })
  }
  else {
    if (message.mentions.users.first().bot) {
      return message.reply('Sorry, I don\'t log the playtime of bots!')
    }
    const timePlayedWeek = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, '7d')
    const timePlayedDay = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, 'today')
    const timePlayedAll = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame)
    if (timePlayedAll === 0) {
      return message.reply(`${message.mentions.users.first().username} hasn't (according to Discord) ever played ${message.settings.defaultGame} since I measured his playtime!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`)}\`)*`)
    }
    /*if (timePlayedCustom >= 0) {
      let string = `${client.convertSince(since)}, ${mention.username} has played \`${client.timeConvert(timePlayedCustom)}\` ${message.settings.defaultGame}!`
      if (sinceWarning === true) {
        string += `\n**Warning**: this information is inaccurate, because I started measuring ${message.mentions.users.first().username}'s playtime later than the time you specified.\n(measuring started ${client.MSDays(Math.abs(new Date() - new Date(fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`))))} days ago)`
      }
      return message.reply(string)
    }*/
    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.mentions.users.first().username}'s ${message.settings.defaultGame} playtime`, message.mentions.users.first().avatarURL)
      .setColor(3447003)
      .setFooter(`"Total" measured from ${fs.readFileSync(`./data/startDates/${message.author.id}.txt`)}`)
      .setThumbnail(client.getThumbnail(message.settings.defaultGame))
    if (timePlayedWeek === -2) {
      embed.addField('Last week', `${message.mentions.users.first().username}'s data hasn't been logged for a week, so I can't show you this information!`)
    }
    else {
      embed.addField('Last week', `${message.mentions.users.first().username} has played \`${client.timeConvert(timePlayedWeek)}\` ${message.settings.defaultGame} this week`)
    }
    if (timePlayedDay === -2) {
      embed.addField('Today', `${message.mentions.users.first().username}'s' data hasn't been logged for a day, so I can't show you this information!`)
    }
    else {
      embed.addField('Today', `${message.mentions.users.first().username} has played \`${client.timeConvert(timePlayedDay)}\` ${message.settings.defaultGame} today`)
    }
    embed.addField('Total', `${message.mentions.users.first().username} has played \`${client.timeConvert(timePlayedAll)}\` ${message.settings.defaultGame} in total (see footer)`)
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
  name        : 'playerstime',
  category    : 'Timer',
  description : 'players time played',
  usage       : 'playerstime'
}