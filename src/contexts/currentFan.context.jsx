import { useState, createContext } from 'react'

export const CurrentFanContext = createContext()

export const CurrentFanProvider = ({ children }) => {

    const [currentFan, setCurrentFan] = useState({
        id: 1,
        type: 'FAN',
        username: 'imtheKING',
        email: 'theking@gmail.com',
        image: require('../images/pictures/fan-8.jpg'),
        hasSpotify: true,
        hasAppleMusic: false,
        hasInstagram: false,
        hasTikTok: false,
        leaderboardsFollowed: [
            {artistId: 1},
            {artistId: 2}
        ],
        flashLeaderboardsFollowed: [
            {artistId: 2}
        ],
        fanclubsSubscribed: [
            {artistId: 2}
        ],
        leaderboardStats: {
            position: 8,
            points: 111
        }
    })

    return (
        <CurrentFanContext.Provider value={{ currentFan, setCurrentFan }}>
            {children}
        </CurrentFanContext.Provider>
    )
}