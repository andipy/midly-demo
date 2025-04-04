import React from 'react'

const IconEdit = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <g clip-path='url(#clip0_5339_7626)'>
            <path d='M14.0892 21.8795L24.412 11.5567C24.7885 11.1801 25 10.6693 25 10.1368C25 9.60426 24.7885 9.09353 24.412 8.71691L23.2853 7.58923C22.9087 7.21273 22.398 7.00122 21.8654 7.00122C21.3329 7.00122 20.8221 7.21273 20.4455 7.58923L10.1217 17.9131C9.97538 18.0598 9.85244 18.2281 9.75719 18.4121L7.11624 23.5294C6.66838 24.398 7.59924 25.3298 8.46784 24.883L13.5881 22.246C13.7739 22.1496 13.9426 22.0271 14.0892 21.8795V21.8795Z' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M9.93994 18.1692L13.8361 22.0654' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            </g>
            <defs>
            <clipPath id='clip0_5339_7626'>
            <rect width='32' height='32' fill={color}/>
            </clipPath>
            </defs>
        </svg>
    )
}

export default IconEdit