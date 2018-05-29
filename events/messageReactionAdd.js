module.exports = (client, reaction, user) => {
  client.logger.cmd(`[REACTIONS] ${ user.tag } reacted to message id ${ reaction.message.id } with the reaction: ${ reaction.emoji }.`)
}