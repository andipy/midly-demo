import React from 'react'

const IconPicture = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'color-fill-white'}
            xmlns='http://www.w3.org/2000/svg'
        >
            <g clip-path="url(#clip0_5421_1496)">
            <rect x="0.5" width="36" height="36" rx="5" fill={color}/>
            <path d="M4.44702 34.8505L10.4085 24.6535C11.2024 23.2955 13.181 23.3433 13.9084 24.738L19.1823 34.8505" stroke="black" stroke-width="2"/>
            <path d="M15.8284 28.512L24.2318 13.0133C24.9612 11.6681 26.8695 11.6069 27.6835 12.9026L35.6568 25.5935" stroke="black" stroke-width="2"/>
            <circle cx="12.1374" cy="14.0051" r="3.17598" stroke="black" stroke-width="2"/>
            </g>
            <rect x="1.5" y="1" width="34" height="34" rx="4" stroke={color} stroke-width="2"/>
            <defs>
            <clipPath id="clip0_5421_1496">
            <rect x="0.5" width="36" height="36" rx="5" fill={color}/>
            </clipPath>
            </defs>
</svg>
    )
}

export default IconPicture