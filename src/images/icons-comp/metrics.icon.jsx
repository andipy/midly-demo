import React from 'react'

const IconMetrics = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'color-fill-white'}`}
        >
            <path d='M13.75 16.75V22.75' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M22.75 13V22.75' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M18.25 9.25V22.75' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M9.25 13V22.75' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
        </svg>
    )
}

export default IconMetrics