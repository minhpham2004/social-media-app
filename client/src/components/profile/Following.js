import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'

function Following({ followingUsers, setShowFollowing }) {
    const { auth } = useSelector(state => state)
    return (
        <div className='follow'>
            <div className='follow_box'>
                <h5 className='text-center'>Following</h5>
                <hr />

                {
                    followingUsers.map(user => (
                        <UserCard
                            key={user._id}
                            user={user}
                            setShowFollowing={setShowFollowing}
                        >
                            {
                                auth.user._id !== user._id && <FollowBtn user={user} />
                            }
                        </UserCard>
                    ))
                }

                <div className='close' onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Following