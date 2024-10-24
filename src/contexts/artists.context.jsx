import { useState, createContext } from 'react'

export const ArtistsContext = createContext()

export const ArtistsProvider = ({ children }) => {

    const [artists, setArtists] = useState([
        {
            id: 1,
            slug: 'lazza',
            artistName: 'Lazza',
            image: require('../images/pictures/lazza.jpeg'),
            flashLeaderboard: {
                status: 'PENDING',
            }
        },{
            id: 2,
            slug: 'thasup',
            artistName: 'thasup',
            image: require('../images/pictures/thasup.jpg'),
            flashLeaderboard: {
                status: 'CLOSED_VISIBLE',
            }
        },{
            id: 3,
            slug: 'artie-5ive',
            artistName: 'Artie 5ive',
            image: require('../images/pictures/artie-5ive.jpeg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 4,
            slug: 'suspect-cb',
            artistName: 'Suspect CB',
            image: require('../images/pictures/suspect-cb.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 5,
            slug: 'astro',
            artistName: 'Astro',
            image: require('../images/pictures/astro.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 6,
            slug: 'alfa',
            artistName: 'Alfa',
            image: require('../images/pictures/alfa.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 7,
            slug: 'sick-luke',
            artistName: 'Sick Luke',
            image: require('../images/pictures/sick-luke.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 8,
            slug: 'nabi',
            artistName: 'Nabi',
            image: require('../images/pictures/nabi.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 9,
            slug: 'mezzosangue',
            artistName: 'Mezzosangue',
            image: require('../images/pictures/mezzosangue.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 10,
            slug: 'anna',
            artistName: 'Anna',
            image: require('../images/pictures/anna.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 11,
            slug: 'gue',
            artistName: 'Guè',
            image: require('../images/pictures/gue.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 12,
            slug: 'marracash',
            artistName: 'Marracash',
            image: require('../images/pictures/marracash.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },{
            id: 13,
            slug: 'sfera-ebbasta',
            artistName: 'Sfera Ebbasta',
            image: require('../images/pictures/sfera-ebbasta.jpg'),
            flashLeaderboard: {
                status: 'ONGOING',
            }
        },
    ])

    return (
        <ArtistsContext.Provider value={{ artists, setArtists }}>
            {children}
        </ArtistsContext.Provider>
    )
}