import React from 'react'

const IconOk = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'color-fill-white'}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M20.4971 12.936L15.4082 19.6878L12.0787 16.3032" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="16" cy="16.3119" r="11" stroke={color} stroke-width="2"/>

        </svg>
    )
}

export default IconOk