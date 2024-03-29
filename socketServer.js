let users = [] //real-time socket users

const SocketServer = (socket) => {
    //Connect - Disconnect
    socket.on('joinUser', id => {
        users.push({ id, socketId: socket.id })
    })

    socket.on('disconnect', id => {
        users = users.filter(user => user.socketId !== socket.id)
    })

    //Likes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })

    //Comments
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {  
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })

    //Follow
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)

        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unfollow', newUser => {
        const user = users.find(user => user.id === newUser._id)

        user && socket.to(`${user.socketId}`).emit('unfollowToClient', newUser)
    })

    //Notifications
    socket.on('createNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {  
                socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
            })
        }
    })

    socket.on('removeNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {  
                socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
            })
        }
    })

    //Message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })
}

module.exports = SocketServer