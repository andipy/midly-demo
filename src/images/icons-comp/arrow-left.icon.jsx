import React from 'react'

const IconArrowLeft = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M18 8.57544L10 16.5754L18 24.5754" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconArrowLeft