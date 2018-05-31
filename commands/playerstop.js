const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!message.mentions.users.first()) {
    const timePlayedWeek = client.timePlayed(message.author.id, message.settings.defaultGame, '7d')
    const timePlayedDay = client.timePlayed(message.author.id, message.settings.defaultGame, 'today')
    const timePlayedAll = client.timePlayed(message.author.id, message.settings.defaultGame)
    if (args[0]) {
      return message.reply(`Please mention someone to view their personal leaderboard\n*e.a.: ${message.settings.prefix}playersTop @xVaql*`)
    }
    if (timePlayedAll === 0) {
      return message.reply(`You haven't (according to Discord) ever played ${message.settings.defaultGame} since I measured your playtime, so there's nothing to show you!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.author.id}.txt`)}\`)*`)
    }
    const placeWeek = client.getTopList('7d', message.guild.id).map(topListWeek => topListWeek.id).indexOf(message.author.id) + 1
    const placeDay = client.getTopList('today', message.guild.id).map(topListDay => topListDay.id).indexOf(message.author.id) + 1
    const placeAll = client.getTopList('', message.guild.id).map(topListAll => topListAll.id).indexOf(message.author.id) + 1
    const embed = new Discord.RichEmbed()
      .setAuthor('Your personal leaderboard', message.author.avatarURL)
      .setColor(0x00AE86)
      .setFooter(`Leaderboard updated at: ${fs.readFileSync(`./data/cache/${message.guild.id}/date.txt`)}`)
      .setThumbnail(client.getThumbnail(message.settings.defaultGame))
    if (message.settings.rankingChannel !== 'none') {
      embed.setDescription(`Check the top ${message.settings.leaderboardAmount} users in the ${message.settings.rankingChannel} channel`)
    }
    if (client.timePlayed(message.author.id, message.settings.defaultGame, '7d') === 0) {
      embed.addField('Weekly', `You haven't played ${message.settings.defaultGame} this week!`)
    }
    else {
      embed.addField('Weekly', `In the week list you are ranked: **${client.ordinalSuffix(placeWeek)}** *(${client.timeConvert(timePlayedWeek)})*`)
    }
    if (client.timePlayed(message.author.id, message.settings.defaultGame, 'today') === 0) {
      embed.addField('Daily', `You haven't played ${message.settings.defaultGame} today!`)
    }
    else {
      embed.addField('Daily', `In the day list you are ranked: **${client.ordinalSuffix(placeDay)}** *(${client.timeConvert(timePlayedDay)})*`)
    }
    embed.addField('Total', `In the total list you are ranked: **${client.ordinalSuffix(placeAll)}** *(${client.timeConvert(timePlayedAll)})*`)
    message.channel.send({ embed })
  }
  else {
    if (message.mentions.users.first().bot) {
      return message.reply('Sorry, I don\'t log the playtime of bots!')
    }
    if (client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame) === 0) {
      return message.reply(`${message.mentions.users.first().username} hasn't (according to Discord) ever played ${message.settings.defaultGame} since I measured his playtime!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`)}\`)*`)
    }

    const timePlayedWeek = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, '7d')
    const timePlayedDay = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, 'today')
    const timePlayedAll = client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame)

    const placeWeek = client.getTopList('7d', message.guild.id).map(topListWeek => topListWeek.id).indexOf(message.mentions.users.first().id) + 1
    const placeDay = client.getTopList('today', message.guild.id).map(topListDay => topListDay.id).indexOf(message.mentions.users.first().id) + 1
    const placeAll = client.getTopList('', message.guild.id).map(topListAll => topListAll.id).indexOf(message.mentions.users.first().id) + 1
    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.mentions.users.first().username}'s personal leaderboard`, message.mentions.users.first().avatarURL)
      .setColor(0x00AE86)
      .setFooter(`Leaderboard updated at: ${fs.readFileSync(`./data/cache/${message.guild.id}/date.txt`)}`)
      .setThumbnail(client.getThumbnail(message.settings.defaultGame))
    if (message.settings.rankingChannel !== 'none') {
      embed.setDescription(`Check the top ${message.settings.leaderboardAmount} users in the ${message.settings.rankingChannel} channel`)
    }
    if (client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, '7d') === 0) {
      embed.addField('Weekly', `${message.mentions.users.first().username} hasn't played ${message.settings.defaultGame} this week!`)
    }
    else {
      embed.addField('Weekly', `In the week list ${message.mentions.users.first().username} is ranked: **${client.ordinalSuffix(placeWeek)}** *(${client.timeConvert(timePlayedWeek)})*`)
    }
    if (client.timePlayed(message.mentions.users.first().id, message.settings.defaultGame, 'today') === 0) {
      embed.addField('Daily', `${message.mentions.users.first().username} hasn't played ${message.settings.defaultGame} today!`)
    }
    else {
      embed.addField('Daily', `In the day list ${message.mentions.users.first().username} is ranked: **${client.ordinalSuffix(placeDay)}** *(${client.timeConvert(timePlayedDay)})*`)
    }
    embed.addField('Total', `In the total list ${message.mentions.users.first().username} is ranked: **${client.ordinalSuffix(placeAll)}** *(${client.timeConvert(timePlayedAll)})*`)
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
  name        : 'playerstop',
  category    : 'Timer',
  description : 'Players Ranking',
  usage       : 'playerstop'
}