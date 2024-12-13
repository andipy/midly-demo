import React from 'react'

const IconArrowLeft = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M18 8.57544L10 16.5754L18 24.5754' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>

        </svg>
    )
}

export default IconArrowLeft