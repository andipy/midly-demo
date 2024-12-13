import React from 'react'

const IconArrowDown = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M25 11.5L16 20.5L7 11.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconArrowDown