import React from 'react'

const IconPerson = ({ color, size, viewBox, strokeWidth }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={`${color ? color : 'color-fill-white'}`}
        >
            <path d='M9.57129 10.1163C9.57129 6.18641 12.7577 3 16.6876 3C20.6175 3 23.8039 6.18641 23.8039 10.1163C23.8039 14.0462 20.6175 17.2326 16.6876 17.2326C12.7577 17.2326 9.57129 14.0462 9.57129 10.1163Z' fill={color}/>
            <path d='M26.4723 28.9985C26.6954 28.9985 26.8696 28.806 26.8474 28.5841V28.5841L26.806 28.1904L26.7438 27.7966L26.6816 27.4029L26.5987 27.0092L26.4951 26.6154L26.3915 26.2217L26.2672 25.8487L26.1428 25.455L25.9978 25.082L25.832 24.709L25.6662 24.336L25.5833 24.1702L25.4797 23.9837L25.3968 23.7972L25.2932 23.6314L25.1896 23.4449L25.086 23.2791L24.9824 23.1133L24.858 22.9475L24.7544 22.7818L24.6508 22.6367L24.5265 22.4709L24.4021 22.3259L24.2985 22.1808L24.1742 22.015L24.112 21.9425C24.0707 21.8942 24.0256 21.8492 23.9773 21.8078V21.8078C23.929 21.7664 23.884 21.7214 23.8426 21.6731L23.7805 21.6006L23.6561 21.4555L23.5111 21.3105L23.3867 21.1861L23.2417 21.0618L23.0966 20.9375L23.0776 20.9184C22.9937 20.8346 22.903 20.7577 22.8065 20.6888V20.6888L22.6614 20.5644L22.5906 20.5037C22.5412 20.4614 22.4887 20.4228 22.4335 20.3883L22.4316 20.3871C22.3777 20.3534 22.3264 20.3157 22.2781 20.2743V20.2743C22.2298 20.2329 22.1785 20.1952 22.1245 20.1615L22.0398 20.1085L21.874 20.0049L21.7289 19.9013L21.5632 19.7977L21.3974 19.7148L21.2316 19.6112L21.0658 19.5283L20.9 19.4454L20.7135 19.3625L20.5477 19.2796L20.382 19.2175L20.1955 19.1346L19.9882 19.0724L19.781 18.9895L19.5738 18.9274L19.3665 18.8652L19.1593 18.803L18.9314 18.7616L18.7241 18.7201L18.5169 18.6787L18.289 18.6372L18.0817 18.5958L17.8538 18.5751L17.6466 18.5544L17.4186 18.5336L17.2114 18.5129H16.9834V18.5129C16.8456 18.4991 16.7068 18.4985 16.5688 18.511L16.5483 18.5129H16.341L16.1131 18.5336L15.9059 18.5544L15.6779 18.5751L15.4707 18.5958L15.2427 18.6372L15.0355 18.6787L14.8076 18.7201L14.6003 18.7616L14.3931 18.803L14.1859 18.8652L13.9579 18.9274L13.7507 18.9895L13.5435 19.0724L13.5138 19.0813C13.3957 19.1168 13.2808 19.1623 13.1705 19.2175V19.2175L13.0047 19.2796L12.8182 19.3625L12.6524 19.4454L12.4866 19.5283L12.3209 19.6112L12.1551 19.7148L11.9893 19.7977L11.8235 19.9013L11.6577 20.0049L11.4919 20.1085L11.3469 20.2122L11.1811 20.3365L11.036 20.4401L10.891 20.5644L10.7459 20.6888V20.6888C10.6494 20.7577 10.5587 20.8346 10.4748 20.9184L10.4558 20.9375L10.3108 21.0618L10.1657 21.1861V21.1861C10.0691 21.2689 9.97907 21.359 9.8963 21.4555V21.4555L9.75125 21.6006L9.62691 21.7456L9.50257 21.87L9.37824 22.015L9.2539 22.1808L9.12957 22.3259L9.02595 22.4709L8.90162 22.6367L8.79801 22.7818L8.67367 22.9475L8.57006 23.1133L8.46644 23.2791L8.36283 23.4449L8.25922 23.6314L8.1556 23.7972L8.05199 23.9837L7.9691 24.1702L7.86549 24.336L7.69971 24.709L7.55465 25.082L7.40959 25.455L7.26453 25.8487L7.16092 26.2217L7.03658 26.6154L6.95369 27.0092L6.8708 27.4029L6.78791 27.7966L6.72574 28.1904L6.68429 28.5841V28.5841C6.67302 28.8096 6.85279 28.9985 7.07854 28.9985H26.4723Z' fill={color}/>
        </svg>
    )
}

export default IconPerson