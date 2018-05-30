const snekfetch = require('snekfetch')

exports.run = async (client, msg, [search, resultNum]) => {
  const baseUrl = 'http://api.urbandictionary.com/v0/define?term='
  const theUrl = baseUrl + search
  snekfetch.get(theUrl).then( r => {
    if (!resultNum) {
      resultNum = 0
    }
    else if (resultNum > 1) {
      resultNum -= 1
    }
    const result = r.body.list[resultNum]
    if (result) {
      const definition = [
        `**Word:** ${search}`,
        '',
        `**Definition:** ${resultNum += 1} out of ${r.body.list.length}\n_${result.definition}_`,
        '',
        `**Example:**\n${result.example}`,
        `<${result.permalink}>`
      ]
      msg.channel.send(definition).catch(err => client.funcs.log(err.stack, 'error'))
    }
    else {
      msg.channel.send('No entry found.').catch(err => client.funcs.log(err.stack, 'error'))
    }
  })
}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : ['df', 'urbandic'],
  permLevel : 'User'
}

exports.help = {
  name        : 'urban',
  category    : 'Miscelaneous',
  description : 'Searches the Urban Dictionary library for a definition to the search term.',
  usage       : 'urban term'
}