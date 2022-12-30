import React from 'react'

function NotFound() {
  return (
    <div className='position-relative' style={{ minWidth: 'calc(100vh - 70px)' }}>
      <h2
        className='position-absolute text-secondary'
        style={{ textAlign: 'center' }}
      >
        404 | Not Found
      </h2>
    </div>
  )
}

export default NotFound