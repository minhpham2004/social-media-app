import React from 'react'
import { useSelector } from 'react-redux'

function Avatar({ src, size }) {
    const { theme } = useSelector(state => state)
    return (
        <img
            src={src} alt="user" className={size}
            style={{ filter: `${theme ? ' invert(1) ' : 'invert(0)'}` }}
        />
    )
}

export default Avatar