import React from 'react'

const IconArrowUp = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M10 3.33325V16.6666M10 3.33325L15 8.33325M10 3.33325L5 8.33325" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconArrowUp