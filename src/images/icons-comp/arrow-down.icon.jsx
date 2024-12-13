import React from 'react'

const IconArrowDown = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M25 11.5L16 20.5L7 11.5' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>

        </svg>
    )
}

export default IconArrowDown