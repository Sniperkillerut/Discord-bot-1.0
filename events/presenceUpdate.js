module.exports = (client, oldMember, newMember) => {
  const guild = newMember.guild
  const game_new = newMember.presence.game
  const game_old = oldMember.presence.game
  if (game_new) {
    const playRole = guild.roles.find('name', `In ${game_new.name}`)
    if (!playRole) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
      const botrole = guild.roles.find('name', client.config.name)
      client.log(`bot role position: ${botrole.position}`)
      guild.createRole({
        name        : `In ${game_new.name}`,
        color       : color,
        mentionable : true,
        hoist       : true,
        position    : botrole.position-2
      })
        .then(role => {
          client.log(`Created new role with name ${role.name} and color ${role.color}`)
          newMember.addRole(role).then(() => {
            const role2 = guild.roles.find('name', `In ${game_new.name}`)
            client.logger.cmd(`[AUTO-ROLE CREATED] adding person ${newMember.user.username} to role ${role2.name}, currently ${role2.members.size} members of said role.`)
          })

        })
        .catch(console.error)
    }
    else {
      newMember.addRole(playRole).then(() => {
        const role = guild.roles.find('name', `In ${game_new.name}`)
        client.logger.cmd(`[AUTO-ROLE SET] adding person ${newMember.user.username} to role ${role.name}, currently ${role.members.size} members of said role.`)
      })
    }
  }
  else if (game_old) {
    const playRole = guild.roles.find('name', `In ${game_old.name}`)
    if (playRole && newMember.roles.has(playRole.id)) {
      newMember.removeRole(playRole).then(() => {
        const role = guild.roles.find('name', `In ${game_old.name}`)
        client.logger.cmd(`[AUTO-ROLE UNSET] removing person ${newMember.user.username} from role ${role.name}, currently ${role.members.size} members of said role.`)
        if (role.members.size === 0) {
          client.logger.cmd(`[AUTO-ROLE DELETE] role ${role.name} is currently empty, deleting said role.`)
          role.delete()
        }
      })
    }
  }
}


/*
client.on('presenceUpdate', (oldMember, newMember) => {
    let guild = newMember.guild
    let playRole = guild.roles.find('name', 'Playing Overwatch')
    if (!playRole) {
        //guild.roles.addRole()
        return
    }
    if (newMember.user.presence.game && newMember.user.presence.game.name === 'Overwatch') {
        newMember.addRole(playRole)
    } else if (!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
        newMember.removeRole(playRole)
    }
})
*/