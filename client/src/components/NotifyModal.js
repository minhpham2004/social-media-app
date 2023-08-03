import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoNotice from '../images/notice.png'
import Avatar from './Avatar'
import moment from 'moment'

function NotifyModal() {
  const { notify } = useSelector(state => state)

  return (
    <div style={{ minWidth: '280px' }}>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <h3>Notifications</h3>
        {
          notify.sound
            ? <i
              className='fas fa-bell text-danger'
              style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
            : <i
              className='fas fa-bell-slash text-danger'
              style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
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
                <Link to={`${msg.url}`} className='d-flex text-dark align-items-center'>
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
                <small className='text-muted d-flex justify-content-between px-2'>
                  {moment(msg.createdAt).fromNow()}
                  {
                    !msg.isRead && <i className='fas fa-circle text-primary' />
                  }
                </small>
              </div>
            )
          })
        }
      </div>

      <hr className='my-1' />
      <div className='text-right text-danger mr-2' style={{ cursor: 'pointer' }}>
        Delete All
      </div>
    </div>
  )
}

export default NotifyModal 