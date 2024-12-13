import React from 'react'

const IconOk = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
        >
            <path d='M20.4971 12.936L15.4082 19.6878L12.0787 16.3032' stroke={color} stroke-width={strokeWidth} stroke-linecap='round' stroke-linejoin='round'/>
            <circle cx='16' cy='16.3119' r='11' stroke={color} stroke-width={strokeWidth}/>
        </svg>
    )
}

export default IconOk