import React from 'react'

const IconFlip = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <path d='M6.76587 16.0607C6.76587 13.7448 7.62795 11.5118 9.18418 9.79672C10.7404 8.08164 12.8794 7.00727 15.1843 6.78289C17.4893 6.55851 19.7953 7.20019 21.6531 8.58293C23.5109 9.96567 24.7875 11.9905 25.2341 14.2629' stroke={color} stroke-width={strokeWidth}/>
            <path d='M21.6971 12.8235L25.1734 14.4436L26.9999 11.2915' stroke={color} stroke-width={strokeWidth}/>
            <path d='M25.2341 16.9393C25.2341 19.2552 24.3721 21.4882 22.8158 23.2033C21.2596 24.9184 19.1206 25.9927 16.8157 26.2171C14.5107 26.4415 12.2047 25.7998 10.3469 24.4171C8.48909 23.0343 7.21254 21.0095 6.76589 18.7371' stroke={color} stroke-width={strokeWidth}/>
            <path d='M10.3027 20.1765L6.82634 18.5564L4.99982 21.7085' stroke={color} stroke-width={strokeWidth}/>
        </svg>
    )
}

export default IconFlip