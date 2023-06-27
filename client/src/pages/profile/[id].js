import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../../styles/profile.css'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'

import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'

function Profile() {
  const { profile, auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()

  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, profile.users, profile.ids, auth, dispatch])

  return (
    <div className='profile'>

      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {
        auth.user._id === id &&
        <div className='profile_tab'>
          <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
          <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
        </div>
      }

      {
        profile.loading
          ? <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4' />
          : <>
            {
              saveTab
                ? <Saved auth={auth} dispatch={dispatch} />
                : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            }
          </>
      }


    </div>
  )
}

export default Profile