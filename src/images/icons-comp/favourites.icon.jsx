import React from 'react'

const IconFavourites = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <g clip-path='url(#clip0_5340_7649)'>
                <path d='M11.4438 1.16676L14.2289 6.53831C14.4391 6.94374 14.8226 7.23133 15.2706 7.31959L21.0657 8.46109C21.4464 8.53608 21.6004 8.99731 21.341 9.2859L17.2342 13.855C16.944 14.1778 16.8079 14.6105 16.8611 15.0413L17.6238 21.2244C17.6727 21.6203 17.2611 21.9112 16.9042 21.733L11.67 19.1195C11.2481 18.9089 10.7518 18.9089 10.3299 19.1195L5.09567 21.733C4.73882 21.9112 4.32724 21.6203 4.37607 21.2244L5.13883 15.0413C5.19197 14.6105 5.05588 14.1778 4.76571 13.855L0.658926 9.2859C0.399533 8.99731 0.55344 8.53608 0.93416 8.46109L6.72925 7.31959C7.17733 7.23133 7.5608 6.94374 7.77101 6.53831L10.5561 1.16676C10.7426 0.806951 11.2573 0.806951 11.4438 1.16676Z' stroke={color}/>
            </g>
            <defs>
                <clipPath id='clip0_5340_7649'>
                    <rect width='22' height='22' fill={color} transform='translate(0 0.349121)'/>
                </clipPath>
            </defs>
        </svg>
    )
}

export default IconFavourites