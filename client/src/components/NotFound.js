import React from 'react'

function NotFound() {
  return (
    <div className='position-relative' style={{ minWidth: 'calc(100vh - 70px)', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h2
        className='position-absolute text-secondary'
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        404 | Not Found
      </h2>
    </div>
  )
}

export default NotFound