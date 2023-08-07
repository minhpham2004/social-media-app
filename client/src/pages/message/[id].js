import React from 'react'
import '.././../styles/message.css'
import LeftSide from '../../components/message/LeftSide'
import RightSide from '../../components/message/RightSide'

function Conversation() {
    return (
        <div className='message d-flex'>
            <div className='col-md-4 border-right px-0'>
                <LeftSide />
            </div>

            <div className='col-md-8 px-0'>
                <RightSide />
            </div>
        </div>
    )
}

export default Conversation