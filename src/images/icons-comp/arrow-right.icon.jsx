import React from 'react'

const IconArrowRight = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M12 8L20 16L12 24" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconArrowRight