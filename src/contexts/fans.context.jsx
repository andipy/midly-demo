import { useState, createContext } from 'react'

export const FansContext = createContext()

export const FansProvider = ({ children }) => {

    const [fans, setFans] = useState([
        {
            id: 5,
            image: require('../images/pictures/ai_04.png'),
            username: 'ginger04',
            mostListenedArtistsOnSpotify : [
                {artistId: 1},
                {artistId: 7},
                {artistId: 6},
                {artistId: 10},
                {artistId: 11}
            ],
            followedArtists: [
                {artistId: 1},
                {artistId: 2},
                {artistId: 3},
                {artistId: 6},
            ]
            
        }
    ])

    return (
        <FansContext.Provider value={{ fans, setFans }}>
            {children}
        </FansContext.Provider>
    )
}