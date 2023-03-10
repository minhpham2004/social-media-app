import React from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import '../../styles/profile.css'
import { useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'

function Profile() {
  const { profile } = useSelector(state => state)
  return (
    <div className='profile'>
     
      {
        profile.loading
          ?  <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4' />
          : <Info />
      }

      <Posts />
    </div>
  )
}

export default Profile