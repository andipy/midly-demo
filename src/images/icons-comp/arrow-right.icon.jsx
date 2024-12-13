import React from 'react'

const IconArrowRight = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M12 8L20 16L12 24' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>

        </svg>
    )
}

export default IconArrowRight