module.exports = (client, oldMember, newMember) => {
    let guild = newMember.guild
    let game_new = newMember.presence.game
    let game_old = oldMember.presence.game
    if (game_new) {
        let playRole = guild.roles.find('name', `Playing ${game_new.name}`)
        if (!playRole) {
            let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            //let botrole = guild.roles.find('name', config.name)
            //client.log(`bot role position: ${botrole.position}`)
            guild.createRole({
                name: `Playing ${game_new.name}`,
                color: color,
                mentionable: true,
                hoist: true,
                //position: botrole.position-2
            })
                .then(role => {
                    client.log(`Created new role with name ${role.name} and color ${role.color}`)
                    newMember.addRole(role).then(() => {
                        let role2 = guild.roles.find('name', `Playing ${game_new.name}`)
                        client.log('log',`role created, adding person ${newMember.user.username} to list, currently ${role2.members.size} members of said role`)
                    })
                    return
                })
                .catch(console.error)
        } else {
            newMember.addRole(playRole).then(() => {
                let role = guild.roles.find('name', `Playing ${game_new.name}`)
                client.log('log',`role already existed, adding person ${newMember.user.username} to list, currently ${role.members.size} members of said role`)
            })
            return
        }
    } else if (game_old) {
        let playRole = guild.roles.find('name', `Playing ${game_old.name}`)
        if (playRole && newMember.roles.has(playRole.id)) {
            newMember.removeRole(playRole).then(() => {
                let role = guild.roles.find('name', `Playing ${game_old.name}`)
                client.log('log',`role already existed, removing person ${newMember.user.username} from list, currently ${role.members.size} members of said role`)
                if (role.members.size === 0) {
                    client.log('log',`role ${role.name} deleted`)
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