import React from 'react'

const IconExit = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
        <path d="M9 9.57544L23 23.5754M9 23.5754L23 9.57544" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconExit