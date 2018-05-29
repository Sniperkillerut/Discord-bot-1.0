module.exports = async (client, message, args) => {
  await message.react(client.emojis.find('name', 'burny'))
}