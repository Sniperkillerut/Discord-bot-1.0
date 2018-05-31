const fs = require('fs')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  let user
  let string
  let since
  let sinceWarning = false
  if (message.mentions.users.first()) {
    if (message.mentions.users.first().bot) {
      return message.reply('Sorry, I don\'t log the playtime of bots!')
    }
    if (fs.existsSync(`./data/userdata/${message.mentions.users.first().id}.csv`) === false) {
      return message.reply(`*${message.mentions.users.first().username}* hasn't (according to Discord) ever played a game since I measured your playtime!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`)}\`)*`)
    }
    user = message.mentions.users.first()
    if (args[1]) {
      since=args[1]
    }
    if (since) {
      string = `\n${client.convertSince(since)}, **${message.mentions.users.first().username}'s most played games are:**\n`
    }
    else {
      string = `\n**${message.mentions.users.first().username}'s most played games are:**\n`
    }
    if (since && client.sinceDate(since) < new Date(fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`))) {
      sinceWarning = true
    }
  }
  else {
    if (fs.existsSync(`./data/userdata/${message.author.id}.csv`) === false) {
      return message.reply(`You haven't (according to Discord) ever played a game since I measured your playtime!\n*(playtime measured since: \`${fs.readFileSync(`./data/startDates/${message.author.id}.txt`)}\`)*`)
    }
    user = message.author
    if (args[0]) {
      since = args[0]
    }
    if (since) {
      string = `\n**${client.convertSince(since)}, your most played games are:**\n`
    }
    else {
      string = '\n**Your most played games are:**\n'
    }
    if (since && client.sinceDate(since) < new Date(fs.readFileSync(`./data/startDates/${message.author.id}.txt`))) {
      sinceWarning = true
    }
  }

  // Get an array of objects of the games the user was playing
  const games = []
  function pushObject(value) {
    let found = false
    const game = value.split(' gamePlaying: ')[1]
    const date = value.split(' gamePlaying: ')[0]
    if (game === undefined) {
      return
    }
    if (since && client.sinceDate(since) > new Date(date)) {
      return
    }
    for (let i = 0; i < games.length; i++) {
      if (games[i].game === game) {
        found = true
        games[i].time += 1
        break
      }
    }
    if (found === false) {
      games.push({ game: game, time: 1 })
    }
  }
  fs.readFileSync(`./data/userdata/${user.id}.csv`).toString().split('\n').forEach(pushObject)
  // Sort the list by playtime
  games.sort(function (a, b) { return b.time - a.time })
  // Make a string of it
  for (let i = 0; i < 10; i++) {
    if (i === 0 && games[i] === undefined) {
      string += '**You haven\'t played any game in that time period!**'
      break
    }
    if (games[i]) {
      string += `**${i + 1}. ${games[i].game}**: *${client.timeConvert(games[i].time)}*\n`
    }
  }

  if (sinceWarning === true) {
    if (message.mentions.users.first()) {
      string += `\n**Warning**: this information is inaccurate, because I started measuring ${message.mentions.users.first().username}'s playtime later than the time you specified.\n(measuring started ${client.MSDays(Math.abs(new Date() - new Date(fs.readFileSync(`./data/startDates/${message.mentions.users.first().id}.txt`))))} days ago)`
    }
    else {
      string += `\n**Warning**: this information is inaccurate, because I started measuring your playtime later than the time you specified.\n(measuring started ${client.MSDays(Math.abs(new Date() - new Date(fs.readFileSync(`./data/startDates/${message.author.id}.txt`))))} days ago)`
    }
  }
  return message.reply(string)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'playerstop',
  category    : 'timer',
  description : 'It... like... pings. Then Pongs. And it"s not Ping Pong.',
  usage       : 'playerstop'
}