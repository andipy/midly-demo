import { useState, createContext } from 'react'

export const FlashLeaderboardsContext = createContext()

export const FlashLeaderboardsProvider = ({ children }) => {

    const [flashLeaderboards, setFlashLeaderboards] = useState([
        {
            id: 1,
            artistId: 2,
            participants: 7139,
            image: require('../images/pictures/thasup-album-cover.jpeg'),
            song: {
                title: 's!r! (feat. Lazza & Sfera Ebbasta)',
                url: 'https://open.spotify.com/intl-it/track/5Hjy8lyZ4h99OjrW8jzPQ8'
            },
            album: null,
            badges: [
                {
                    position: 1,
                    image: require('../images/illustrations/GOLD.png')
                },{
                    position: 2,
                    image: require('../images/illustrations/SILVER.png')
                },{
                    position: 3,
                    image: require('../images/illustrations/BRONZE.png')
                },{
                    position: 4,
                    image: require('../images/illustrations/GENERIC.png')
                }
            ],
            leaderboard: [
                {
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch Vito Super Beast Long Name',
                    points: 176,
                    position: 1
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 158,
                    position: 2
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'PollyLollyFreakingLongString@yahoo.com',
                    points: 146,
                    position: 3
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa very very long username',
                    points: 121,
                    position: 4
                },{
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'TheKing1@gmail.com',
                    points: 99,
                    position: 5
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: 'Freak3xFreakingLongString@yahoo.com',
                    points: 82,
                    position: 6
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 74,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 54,
                    position: 8
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 32,
                    position: 9
                },{
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'skusku78',
                    points: 31,
                    position: 10
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_blue_',
                    points: 27,
                    position: 11
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'jack Mario',
                    points: 22,
                    position: 12
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'gianfranco',
                    points: 19,
                    position: 13
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'gremy',
                    points: 13,
                    position: 14
                }
            ]
        },{
            id: 2,
            artistId: 3,
            participants: 4557,
            image: require('../images/pictures/artie-5ive-cover.jpg'),
            song: {
                title: 'MILANO TESTAROSSA (feat. Guè)',
                url: 'https://open.spotify.com/intl-it/track/5zVQoMHyELfcHYviXDao3I'
            },
            album: null,
            badges: [
                {
                    position: 1,
                    image: require('../images/illustrations/GOLD.png')
                },{
                    position: 2,
                    image: require('../images/illustrations/SILVER.png')
                },{
                    position: 3,
                    image: require('../images/illustrations/BRONZE.png')
                },{
                    position: 4,
                    image: require('../images/illustrations/GENERIC.png')
                }
            ],
            leaderboard: [
                {
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 176,
                    position: 1
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 158,
                    position: 2
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 146,
                    position: 3
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 121,
                    position: 4
                },{
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 99,
                    position: 5
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 82,
                    position: 6
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 74,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 54,
                    position: 8
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 32,
                    position: 9
                },{
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'skusku78',
                    points: 31,
                    position: 10
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_blue_',
                    points: 27,
                    position: 11
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'jack Mario',
                    points: 22,
                    position: 12
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'gianfranco',
                    points: 19,
                    position: 13
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'gremy',
                    points: 13,
                    position: 14
                }
            ]
        }
    ])

    return (
        <FlashLeaderboardsContext.Provider value={{ flashLeaderboards, setFlashLeaderboards }}>
            {children}
        </FlashLeaderboardsContext.Provider>
    )
}