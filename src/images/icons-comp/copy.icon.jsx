import React from 'react'

const IconCopy = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect x="11.9053" y="9.74805" width="12.2343" height="16.3124" rx="2" stroke={color} stroke-width="1.5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8467 5.93945C9.3279 5.93945 8.09668 7.17067 8.09668 8.68945V21.0018C8.09668 22.5206 9.3279 23.7518 10.8467 23.7518H11.9054V22.2518H10.8467C10.1563 22.2518 9.59668 21.6922 9.59668 21.0018V8.68945C9.59668 7.9991 10.1563 7.43945 10.8467 7.43945H19.081C19.7713 7.43945 20.331 7.9991 20.331 8.68945V9.74816H21.831V8.68945C21.831 7.17067 20.5997 5.93945 19.081 5.93945H10.8467Z" fill={color}/>

        </svg>
    )
}

export default IconCopy