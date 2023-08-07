import React from 'react'
import Avatar from '../Avatar'

function MsgDisplay({ user }) {
    return (
        <>
            <div className='chat_title'>
                <Avatar src={user.avatar} size='small-avatar' />
                <span className='pl-1'>{user.username}</span>
            </div>

            <div className='chat_text'>
                fdsaaaaaaaaaaaa fdsafsafffff sdfsdfdsf dsfsd fsdf dsfsd fdsfd sfds fsdfsdfds sdf sdf dssdfsdfsdfsdfsdfdddddddddddddddddddddddddddddddddddd
            </div>

            <div className='chat_time'>
                July 2023
            </div>
        </>
    )
}

export default MsgDisplay