// This event executes when a new member joins a server. Let's welcome them!
const fs = require('fs')
module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild)

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== 'true') {return}

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag)

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find('name', settings.welcomeChannel).send(welcomeMessage).catch(console.error)
  client.logger.cmd(`[GUILD MEMBER ADD] ${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id}.`)

  if (fs.existsSync(`./data/startDates/${member.id}.txt`) === false) {
    return fs.appendFileSync(`./data/startDates/${member.id}.txt`, new Date())
  }
}