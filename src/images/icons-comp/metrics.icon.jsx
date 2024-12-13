import React from 'react'

const IconMetrics = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'color-fill-white'}
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M13.75 16.75V22.75" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.75 13V22.75" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.25 9.25V22.75" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.25 13V22.75" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    )
}

export default IconMetrics