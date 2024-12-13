import React from 'react'

const IconArrowUp = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M10 3.33325V16.6666M10 3.33325L15 8.33325M10 3.33325L5 8.33325' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
        </svg>
    )
}

export default IconArrowUp