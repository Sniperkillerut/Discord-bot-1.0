const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  let [fromSym, toSym] = args.filter((a) => a.indexOf('<@') < 0)

  if (fromSym == '' || fromSym == undefined || toSym == '' || toSym == undefined) {return message.reply('You must specify a from and to symbol. (e.g. cryptocurrency ETH USD)')}

  if (toSym == undefined && fromSym.indexOf('/') > -1) {
    const parts = fromSym.split('/')
    fromSym = parts[0]
    toSym = parts[1]
  }

  client.logger.debug(`fSym: ${fromSym}, toSym: ${toSym}`)
  const isMulti = fromSym.indexOf(',') > -1

  const url = isMulti ? `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fromSym}&tsyms=${toSym}` : `https://min-api.cryptocompare.com/data/price?fsym=${fromSym}&tsyms=${toSym}`

  snekfetch.get(url).then((r) => {
    //client.logger.debug(`Cryptocurrency result: ${JSON.stringify(r.body)}`);
    const pairs = []
    for (const prop in r.body) {
      if (r.body.hasOwnProperty(prop)) {
        if (isMulti) {
          const lowerObj = r.body[prop]
          for (const lowerProp in lowerObj) {
            if (lowerObj.hasOwnProperty(lowerProp)) {
              pairs.push(`${prop}/${lowerProp}: ${lowerObj[lowerProp]}`)
            }
          }
        }
        else {
          pairs.push(`${fromSym}/${prop}: ${r.body[prop]}`)
        }
      }
    }

    message.channel.send(pairs.join('\n'), { code: 'asciidoc', split: { char: '\n' } })
  })
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : ['cc', 'cryptocurrency'],
  permLevel : 'User'
}

exports.help = {
  name        : 'crypto',
  category    : 'Finance',
  description : 'Check price of one or more currencies.',
  usage       : 'cryptocurrency <FROM SYMBOL> <TO SYMBOL(s)> (multiple symbols separated by commas)\ncryptocurrency ETH BTC,USD'
}