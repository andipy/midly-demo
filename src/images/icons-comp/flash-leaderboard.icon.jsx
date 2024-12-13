import React from 'react'

const IconFlashLeaderboard = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'white'}`}
            fill='none'
        >
            <g clip-path='url(#clip0_5300_32875)'>
                <path d='M11.4787 15.0755C10.4702 15.0755 9.59787 14.5433 8.83136 13.5638C8.05984 12.5778 7.43489 11.1833 6.94301 9.5874C6.02426 6.60655 5.60736 3.04984 5.4985 0.5H17.6074C17.5491 4.69422 16.7603 8.32998 15.6038 10.9297C15.0023 12.282 14.3106 13.3331 13.5894 14.0389C12.8677 14.7451 12.1499 15.0755 11.4787 15.0755Z' stroke={color} stroke-linejoin='round'/>
                <path d='M5.16456 2.82674L1.98893 2.68066L2.9414 5.69675L1.07617 5.57769L5.73919 13.2569L4.46925 7.58182L6.37108 7.79115' stroke={color} stroke-linejoin='round'/>
                <path d='M18.0268 2.82674L21.2025 2.68066L20.25 5.69675L22.1152 5.57769L17.4522 13.2569L18.7222 7.58182L16.7359 7.77344' stroke={color} stroke-linejoin='round'/>
                <path d='M10.3835 15.0205C10.5048 16.1511 9.9466 18.4123 6.74316 18.4123' stroke={color} stroke-linejoin='round'/>
                <path d='M12.4271 15.0205C12.3057 16.1511 12.8639 18.4123 16.0674 18.4123' stroke={color} stroke-linejoin='round'/>
                <rect x='7.24316' y='18.9121' width='8.32385' height='2.58816' stroke={color}/>
            </g>
            <defs>
                <clipPath id='clip0_5300_32875'>
                    <rect width='22' height='22' fill={color} transform='translate(0.595703)'/>
                </clipPath>
            </defs>
        </svg>
    )
}

export default IconFlashLeaderboard