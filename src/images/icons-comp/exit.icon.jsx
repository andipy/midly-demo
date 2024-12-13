import React from 'react'

const IconExit = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M9 9.57544L23 23.5754M9 23.5754L23 9.57544' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
        </svg>
    )
}

export default IconExit