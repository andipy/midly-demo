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
            {artistId: 'artist1'},
            {artistId: 'artist2'},
            {artistId: 'artist5'}
        ],
        fanclubsSubscribed: [
            {
                artistId: 'artist13',
                createdAt: '2025-02-09'
            }
        ],
        removedSubscriptions: [],
        mostListenedArtistsOnSpotify : [
            {artistId: 'artist1'},
            {artistId: 'artist7'},
            {artistId: 'artist6'},
            {artistId: 'artist10'},
            {artistId: 'artist11'}
        ],
        badges: {
            monthly: [
                {
                    month: 12,
                    year: 2024,
                    username: 'imtheKING',
                    userImage: require('../images/pictures/current-fan.jpg'),
                    position: 3,
                    points: 177,
                    artistId: 1,
                    artistName: 'Lazza',
                    artistImage: require('../images/pictures/lazza.jpeg')
                },{
                    month: 9,
                    year: 2024,
                    username: 'imtheKING',
                    userImage: require('../images/pictures/current-fan.jpg'),
                    position: 4,
                    points: 109,
                    artistId: 2,
                    artistName: 'thasup',
                    artistImage: require('../images/pictures/thasup.jpg')
                }
            ]
        },
        whiteLabelPoints: 0,
        actions: [],
        auraPoints: []
    })

    return (
        <CurrentFanContext.Provider value={{ currentFan, setCurrentFan }}>
            {children}
        </CurrentFanContext.Provider>
    )
}