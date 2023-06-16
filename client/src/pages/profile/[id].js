import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import '../../styles/profile.css'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'

function Profile() {
  const { profile, auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, profile.users, profile.ids, auth, dispatch])

  return (
    <div className='profile'>

      {
        profile.loading
          ? <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4' />
          : <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      }

      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />

    </div>
  )
}

export default Profile