import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import NoNotice from '../images/notice.png'
import Avatar from './Avatar'
import moment from 'moment'
import { isReadNotify, deleteNotify, deleteAllNotifies, NOTIFY_TYPES } from '../redux/actions/notifyAction'

function NotifyModal() {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
  }

  const handleDeleteNotify = (msg) => {
    dispatch(deleteNotify({ msg, auth }))
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if (window.confirm(`You have ${newArr.length} unread notices. Are you sure want to delete all?`)) {
      dispatch(deleteAllNotifies(auth.token))
    }
  }

  return (
    <div style={{ minWidth: '280px' }}>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <h3>Notifications</h3>
        {
          notify.sound
            ? <i
              className='fas fa-bell text-danger'
              style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            />
            : <i
              className='fas fa-bell-slash text-danger'
              style={{ fontSize: '1.2rem', cursor: 'pointer' }}
              onClick={handleSound}
            />
        }
      </div>

      <hr className='mt-0' />

      {
        notify.data.length === 0 &&
        <img src={NoNotice} alt='NoNotice' className='w-100' />
      }

      <div style={{ maxHeight: 'calc(100vh-200px)', overflow: 'auto' }}>
        {
          notify.data.map((msg, index) => {
            return (
              <div key={index} className='px-2 mb-3'>
                <Link
                  to={`${msg.url}`}
                  className='d-flex text-dark align-items-center'
                  onClick={() => handleIsRead(msg)}
                >
                  <Avatar src={msg.user.avatar} size="big-avatar" />

                  <div className='mx-1 flex-fill'>
                    <div>
                      <strong className='mr-1'>{msg.user.username}</strong>
                      <span>{msg.text}</span>
                    </div>
                    {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                  </div>
                  <div style={{ width: '30px' }}>
                    {msg.image && <Avatar src={msg.image} size="medium-avatar" />}
                  </div>
                </Link>
                <small className='d-flex text-muted justify-content-between px-2'>
                  <div className='d-flex align-items-center'>
                    {moment(msg.createdAt).fromNow()}
                    {
                      !msg.isRead &&
                      <i
                        style={{ fontSize: '10px' }}
                        className='fas fa-circle text-primary pl-1 pt-1'
                      />
                    }
                  </div>
                  <div>
                    <span
                      className='material-icons'
                      style={{ cursor: 'pointer', fontSize: '20px', color: 'crimson' }}
                      onClick={() => handleDeleteNotify(msg)}
                    >delete</span>
                  </div>
                </small>


              </div>

            )
          })
        }
      </div>

      <hr className='my-1' />
      <div
        className='text-right text-danger mr-2'
        style={{ cursor: 'pointer' }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  )
}

export default NotifyModal 