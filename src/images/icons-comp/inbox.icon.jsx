import React from 'react'

const IconInbox = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
        <path d="M6 7.5H26V22.1767H19.9331L16 25.0356L12.0961 22.1767H6V7.5Z" stroke={color} stroke-width="2" stroke-linejoin="round"/>
        <path d="M13 15.2024H19" stroke={color} stroke-width="2"/>

        </svg>
    )
}

export default IconInbox