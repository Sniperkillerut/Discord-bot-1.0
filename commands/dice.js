exports.run = async (client, message, args, level) => {
  const n = args[0]
  if (isNaN(n)) { return message.reply('You must specify a number to roll a dice.').catch(console.error) }
  let i = 0
  args.forEach(function (argument) {
    i++
    const diceSides = argument
    const rollResult = Math.floor(Math.random() * diceSides) + 1
    message.channel.send('Dice ' + i + ': ' + rollResult)
  })
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'dice',
  category    : 'D&D',
  description : 'Rolls as many dice of specified number of sides as you give it',
  usage       : 'dice [sides]'
}

//TODO:
// 1 - Make sure I'm not breaking anything
// 2 - Change format of returned text to provide more information
//    - richEmbed?
//    - Same message.channel.send with more information?