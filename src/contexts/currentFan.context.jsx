import { useState, createContext } from 'react'

export const CurrentFanContext = createContext()

export const CurrentFanProvider = ({ children }) => {

    const [currentFan, setCurrentFan] = useState({
        id: 1,
        type: 'FAN',
        username: 'imtheKING',
        email: 'theking@gmail.com',
        image: '',
        instagram: 'instagram_name',
        birthdate: '01-09-2002',
        genre: 'UOMO',
        cellphone: '',
        address: {
            name: '',
            surname: '',
            strada: '',
            zipcode: '',
            city: '',
            province: '',
            state: ''
        },
        hasSpotify: true,
        hasAppleMusic: false,
        hasInstagram: false,
        hasTikTok: false,
        followedArtists: [
            {artistId: 1},
            {artistId: 'a3p8'},
            {artistId: 3},
            {artistId: 6},
        ],
        fanclubsSubscribed: [],
        removedSubscriptions: [],
        mostListenedArtistsOnSpotify : [
            {artistId: 1},
            {artistId: 7},
            {artistId: 6},
            {artistId: 10},
            {artistId: 11}
        ],
        badges: {
            monthly: [
                {
                    month: 12,
                    year: 2024,
                    username: 'imtheKING',
                    position: 3,
                    points: 177,
                    artistId: 1,
                    artistName: 'Lazza',
                },{
                    month: 9,
                    year: 2024,
                    username: 'imtheKING',
                    position: 4,
                    points: 109,
                    artistId: 2,
                    artistName: 'thasup',
                }
            ]
        },
        whiteLabelPoints: 0,
        actions: []
    })

    return (
        <CurrentFanContext.Provider value={{ currentFan, setCurrentFan }}>
            {children}
        </CurrentFanContext.Provider>
    )
}