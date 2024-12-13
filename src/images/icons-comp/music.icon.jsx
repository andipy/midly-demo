import React from 'react'

const IconMusic = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'color-fill-white'}`}
        >
            <ellipse cx='14.3153' cy='19.4549' rx='4.04478' ry='4.04478' fill={color}/>
            <path d='M17.0029 20.0445V8.5H21.7293' stroke={color} stroke-width={strokeWidth} stroke-linecap='round'/>
        </svg>
    )
}

export default IconMusic