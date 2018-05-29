module.exports = (client, message, args) => {
  const num_array = args.map(n => parseInt(n))
  const total = num_array.reduce((p, c) => p + c)
  return message.channel.send(total)
}