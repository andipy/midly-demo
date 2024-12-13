import React from 'react'

const IconMusic = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'color-fill-white'}
            xmlns='http://www.w3.org/2000/svg'
        >
            <ellipse cx="14.3153" cy="19.4549" rx="4.04478" ry="4.04478" fill={color}/>
            <path d="M17.0029 20.0445V8.5H21.7293" stroke={color} stroke-width="2" stroke-linecap="round"/>

        </svg>
    )
}

export default IconMusic