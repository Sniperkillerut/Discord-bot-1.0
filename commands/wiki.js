const snekfetch = require('snekfetch')
const Discord  = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (args[0]) {

    const article = await snekfetch
      .get(`https://en.wikipedia.org/api/rest_v1/page/summary/${args[0]}`)
      .then(res => res.body)
      .catch(() => {
        message.channel.send(`I couldn't find a wikipedia article with that title!  (${args[0]})`)
        client.logger.error(`[ERROR] Wiki cant find "${args[0]}" - ${console.error.name}`)
      })
    if (article) {
      const embed = new Discord.RichEmbed()
        .setColor(4886754)
        .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
        .setURL(article.content_urls.desktop.page)
        .setTitle(article.title)
        .setDescription(article.extract)
      return message.channel.send({ embed })
    }
    //return message.channel.send(`I couldn't find a wikipedia article with that title: "${args[0]}"`) //not needed, catch already sent error
  }
  return message.channel.send(`You must provide something to search like:\n\` ${message.settings.prefix}wiki roses\``)



}

exports.conf = {
  enabled   : true,
  guildOnly : false,
  aliases   : [],
  permLevel : 'User'
}

exports.help = {
  name        : 'wiki',
  category    : 'Miscelaneous',
  description : 'Finds a Wikipedia Article by title.',
  usage       : 'wiki'
}