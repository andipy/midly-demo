import React from 'react'

const IconComment = ({ color, size }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={color ? color : 'white'}
            fill="none"
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M26 26L24.2857 19.9286C24.6032 19.246 24.8333 18.5427 24.9762 17.8184C25.119 17.0942 25.1905 16.3531 25.1905 15.5952C25.1905 14.2619 24.9405 13.0159 24.4405 11.8571C23.9405 10.6984 23.254 9.68254 22.381 8.80952C21.5079 7.93651 20.4921 7.25 19.3333 6.75C18.1746 6.25 16.9286 6 15.5952 6C14.2619 6 13.0159 6.25 11.8571 6.75C10.6984 7.25 9.68254 7.93651 8.80952 8.80952C7.93651 9.68254 7.25 10.6984 6.75 11.8571C6.25 13.0159 6 14.2619 6 15.5952C6 16.9286 6.25 18.1746 6.75 19.3333C7.25 20.4921 7.93651 21.5079 8.80952 22.381C9.68254 23.254 10.6984 23.9405 11.8571 24.4405C13.0159 24.9405 14.2619 25.1905 15.5952 25.1905C16.3531 25.1905 17.0942 25.119 17.8184 24.9762C18.5427 24.8333 19.246 24.6032 19.9286 24.2857L26 26ZM23.8333 23.8333L20.5476 22.9286C20.2937 22.8492 20.0556 22.8214 19.8333 22.8452C19.6111 22.869 19.381 22.9286 19.1429 23.0238C18.5714 23.246 17.9894 23.4246 17.3968 23.5595C16.8042 23.6944 16.2032 23.7619 15.5936 23.7619C13.3249 23.7619 11.3968 22.9683 9.80952 21.381C8.22222 19.7937 7.42857 17.8651 7.42857 15.5952C7.42857 13.3254 8.22222 11.3968 9.80952 9.80952C11.3968 8.22222 13.3254 7.42857 15.5952 7.42857C17.8651 7.42857 19.7937 8.22057 21.381 9.80457C22.9683 11.3886 23.7619 13.3217 23.7619 15.6041C23.7619 16.2172 23.7183 16.8254 23.631 17.4286C23.5437 18.0317 23.3413 18.6032 23.0238 19.1429C22.9127 19.3603 22.8532 19.5902 22.8452 19.8327C22.8373 20.0752 22.8651 20.3135 22.9286 20.5476L23.8333 23.8333Z" fill={color} stroke={color} stroke-width="0.5"/>

        </svg>
    )
}

export default IconComment