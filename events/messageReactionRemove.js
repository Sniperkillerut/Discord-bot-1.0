module.exports = (client, reaction, user) => {
  client.logger.cmd(`[REACTIONS] ${ user.tag } removed reaction to message id ${ reaction.message.id } with the reaction: ${ reaction.emoji }.`)
}