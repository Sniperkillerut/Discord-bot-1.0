exports.run = (client, message, args) => {
  let game = args.join(' ').trim()
  let gtype = 0
  if (!game || game.length < 1) {game = null}
  if (message.flags[0] === 'help') {game = message.settings.prefix + 'help'}
  if (message.flags[0] === 'playing') { gtype = 0}
  if (message.flags[0] === 'streaming') { gtype = 1}
  if (message.flags[0] === 'listening') { gtype = 2}
  if (message.flags[0] === 'watching') { gtype = 3}

  client.user.setPresence({ game: { name: game, type: gtype } })
  /* type
    0 PLAYING
    1 STREAMING
    2 LISTENING
    3 WATCHING
  */
  if (message.guild) {
    message.delete().catch(client.logger.error)
  }
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : ['game'],
  permLevel : 'Administrator'
}

exports.help = {
  name        : 'playing',
  category    : 'Miscelaneous',
  description : 'Changes the \'Playing\' status (game).',
  usage       : 'playing <game name>'
}