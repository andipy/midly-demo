import React from 'react'

const IconInbox = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M6 7.5H26V22.1767H19.9331L16 25.0356L12.0961 22.1767H6V7.5Z' stroke={color} stroke-width={strokeWidth} stroke-linejoin='round'/>
            <path d='M13 15.2024H19' stroke={color} stroke-width={strokeWidth}/>
        </svg>
    )
}

export default IconInbox