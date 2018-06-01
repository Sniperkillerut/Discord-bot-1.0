exports.run = async (client, message, args, level) => {
  const n = args[0]
  if (isNaN(n)) {return message.reply('You must specify a number to roll a dice.').catch(console.error)}
  const roll = ((sides) => Math.floor(Math.random() * sides) + 1)(n)

  message.reply(`You rolled a ${roll}!`)
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : ['roll'],
  permLevel : 'User'
}

exports.help = {
  name        : 'roll',
  category    : 'Miscelaneous',
  description : 'Rolls a dice of n sides.',
  usage       : 'roll <n>'
}