import { useState, createContext } from 'react'

export const FansContext = createContext()

export const FansProvider = ({ children }) => {

    const [fans, setFans] = useState([
        {
            id: 1,
            image: require('../images/pictures/current-fan.jpg'),
            username: 'imtheKING',
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
        },{
            id: 2,
            image: require('../images/pictures/ai_01.png'),
            username: 'chiara',
            mostListenedArtistsOnSpotify : [
                {artistId: 2},
                {artistId: 7},
                {artistId: 8},
                {artistId: 10},
                {artistId: 20}
            ],
            followedArtists: [
                {artistId: 6},
                {artistId: 2},
                {artistId: 8},
                {artistId: 20},
            ]
        },{
            id: 3,
            image: require('../images/pictures/ai_08.png'),
            username: 'bob16',
            mostListenedArtistsOnSpotify : [
                {artistId: 7},
                {artistId: 15},
                {artistId: 6},
                {artistId: 10},
                {artistId: 12}
            ],
            followedArtists: [
                {artistId: 1},
                {artistId: 7},
                {artistId: 15},
                {artistId: 6},
            ]
        },{
            id: 4,
            image: require('../images/pictures/ai_05.png'),
            username: 'marco_09',
            mostListenedArtistsOnSpotify : [
                {artistId: 1},
                {artistId: 20},
                {artistId: 6},
                {artistId: 21},
                {artistId: 22}
            ],
            followedArtists: [
                {artistId: 20},
                {artistId: 21},
                {artistId: 22},
                {artistId: 6},
            ]
        },{
            id: 5,
            image: require('../images/pictures/ai_04.png'),
            username: 'ginger04',
            mostListenedArtistsOnSpotify : [
                {artistId: 1},
                {artistId: 13},
                {artistId: 6},
                {artistId: 10},
                {artistId: 11}
            ],
            followedArtists: [
                {artistId: 1},
                {artistId: 2},
                {artistId: 13},
                {artistId: 6},
            ]
            
        },,{
            id: 6,
            image: require('../images/pictures/ai_03.png'),
            username: 'Giulietta',
            mostListenedArtistsOnSpotify : [
                {artistId: 2},
                {artistId: 16},
                {artistId: 15},
                {artistId: 10},
                {artistId: 11}
            ],
            followedArtists: [
                {artistId: 15},
                {artistId: 2},
                {artistId: 3},
                {artistId: 16},
            ]
        },{
            id: 7,
            image: require('../images/pictures/ai_09.png'),
            username: 'kevin.alfa.il.migliore',
            mostListenedArtistsOnSpotify : [
                {artistId: 6},
                {artistId: 7},
                {artistId: 9},
                {artistId: 10},
                {artistId: 11}
            ],
            followedArtists: [
                {artistId: 1},
                {artistId: 9},
                {artistId: 10},
                {artistId: 6},
            ]
        },{
            id: 8,
            image: require('../images/pictures/ai_07.png'),
            username: 'davide00',
            mostListenedArtistsOnSpotify : [
                {artistId: 18},
                {artistId: 19},
                {artistId:20},
                {artistId: 10},
                {artistId: 11}
            ],
            followedArtists: [
                {artistId: 18},
                {artistId: 19},
                {artistId: 3},
                {artistId: 6},
            ]
        },{
            id: 9,
            image: require('../images/pictures/ai_06.png'),
            username: 'francesca.david',
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