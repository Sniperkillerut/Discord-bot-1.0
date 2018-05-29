module.exports = (client, message, args) => {
    let modRole = message.guild.roles.find('name', 'staff')
    if (!message.member.roles.has(modRole.id)) {
        return message.reply('You must be staff t use this command')
    }
    if (message.mentions.users.size === 0) {
        return message.reply('you must mention a user to kick')
    }
    let kickMember = message.guild.member(msg.mentions.users.first())
    if (!kickMember) {
        return message.reply('invalid user')
    }
    if (message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
        return message.reply('I dont have kick permissions on this server')
    }
    kickMember.kick().then(member => {
        message.reply(`User ${member.user.username} succefully kicked`)
    }).catch(console.error)
};