import React from 'react'

const IconInfo = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M13.3015 14.0688C13.3015 12.8701 14.0327 11.5276 16.051 11.5276C17.9408 11.5276 18.6985 12.8182 18.6985 14.0688C18.6985 16.3493 16.051 16.5824 16.051 18.6257' stroke={color} stroke-width={strokeWidth} stroke-linecap='round'/>
            <circle cx='16' cy='21.2896' r='1' fill={color}/>
        </svg>
    )
}

export default IconInfo