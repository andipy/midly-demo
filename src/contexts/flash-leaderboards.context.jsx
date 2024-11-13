import { useState, createContext, useContext, useEffect } from 'react'
import { ArtistsContext } from './artists.context'

export const FlashLeaderboardsContext = createContext()

export const FlashLeaderboardsProvider = ({ children }) => {

    const { artists, setArtists } = useContext(ArtistsContext)

    const [flashLeaderboards, setFlashLeaderboards] = useState([
        {
            id: 1,
            artistId: 2,
            announceMessage: 'Sta per aprire la classifica flash di thasup',
            announceStartDate: '2024-11-07 13:00:00',
            announceEndDate: '2024-11-30 00:00:00',
            rankStartDate: '2024-11-07 14:30:00',
            rankEndDate: '2024-11-29 14:30:00',
            participants: 7139,
            totalStreams: 108712,
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
            announceMessage: 'Sta per aprire la classifica flash di Artie 5ive',
            announceStartDate: '2024-11-07 13:00:00',
            announceEndDate: '2024-11-28 00:00:00',
            rankStartDate: '2024-11-07 14:30:00',
            rankEndDate: '2024-11-12 18:30:00',
            participants: 18557,
            totalStreams: 390167,
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
        },{
            id: 3,
            artistId: 1,
            announceMessage: 'La CLASSIFICA FLASH si attiverà all 1:00',
            announceStartDate: '2024-11-07 13:00:00',
            announceEndDate: '2024-11-23 00:00:00',
            rankStartDate: '2024-11-14 14:30:00',
            rankEndDate: '2024-11-22 14:30:00',
            participants: 4557,
            totalStreams: 39016,
            image: require('../images/pictures/lazza.jpeg'),
            song: null,
            album: {
                title: 'LOCURA',
                url: 'https://open.spotify.com/intl-it/album/0wYy8LTZuhiAyvchPppHPj',
                streamDetails: [
                    {
                        songTitle: "CANZONE D'ODIO (feat. Lil Baby)",
                        streamCount: 99876
                    },{
                        songTitle: "FENTANYL (feat. Sfera Ebbasta)",
                        streamCount: 89712
                    },{
                        songTitle: "VERDI NEI VIOLA",
                        streamCount: 84321
                    },{
                        songTitle: "ABITUDINE",
                        streamCount: 79321
                    },{
                        songTitle: "GHETTO SUPERSTAR (feat. Ghali)",
                        streamCount: 71098
                    },{
                        songTitle: "-3 (PERDERE IL VOLO) (feat. Marracash)",
                        streamCount: 62341
                    },{
                        songTitle: "CASANOVA (feat. Artie 5ive)",
                        streamCount: 59001
                    },{
                        songTitle: "MEZZE VERITÀ (feat. Kid Yugi)",
                        streamCount: 54636
                    },{
                        songTitle: "HOT",
                        streamCount: 44771
                    },{
                        songTitle: "CERTE COSE",
                        streamCount: 39831
                    },{
                        songTitle: "MALE DA VENDERE",
                        streamCount: 28119
                    },{
                        songTitle: "GIORNO DA CANI",
                        streamCount: 19614
                    },{
                        songTitle: "DOLCEVITA",
                        streamCount: 16028
                    },{
                        songTitle: "ESTRANEO (feat. Guè)",
                        streamCount: 14100
                    },{
                        songTitle: "SAFARI",
                        streamCount: 9122
                    },{
                        songTitle: "BUIO DAVANTI",
                        streamCount: 4320
                    },{
                        songTitle: "ZERI IN PIÙ (LOCURA) (feat. Laura Pausini)",
                        streamCount: 1299
                    },{
                        songTitle: "100 MESSAGGI",
                        streamCount: 667
                    }
                ]
            },
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
        },{
            id: 4,
            artistId: 5,
            announceMessage: 'Sta per aprire la classifica flash di Astro',
            announceStartDate: '2024-11-10 13:00:00',
            announceEndDate: '2024-11-13 00:00:00',
            rankStartDate: '2024-11-11 14:30:00',
            rankEndDate: '2024-11-12 14:30:00',
            participants: 6970,
            totalStreams: 39016,
            image: require('../images/pictures/astro.jpg'),
            song: {
                title: '1 MOMENTO (feat. ANNA)',
                url: 'https://open.spotify.com/intl-it/track/6OCnAtM8oa0JymErlTYXxG',
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

    useEffect(() => {
        const now = Date.now()

        const updateFlashLeaderboardsStatuses = () => {
            let changesDetected = false

            const updatedFlashLeaderboardsStatus = artists.map(artist => {
                const thisFlashLeaderboard = flashLeaderboards.find(item => item.artistId === artist.id)
                let status = 'NONE'
                if ( thisFlashLeaderboard ) {
                    const announceStart = new Date(thisFlashLeaderboard.announceStartDate).getTime()
                    const rankStart = new Date(thisFlashLeaderboard.rankStartDate).getTime()
                    const rankEnd = new Date(thisFlashLeaderboard.rankEndDate).getTime()
                    const announceEnd = new Date(thisFlashLeaderboard.announceEndDate).getTime()                    
            
                    if ( now < announceStart || now > announceEnd ) {
                        status = status
                    } else if ( now >= announceStart && now < rankStart ) {
                        status = 'PENDING'
                    } else if ( now >= rankStart && now <= rankEnd ) {
                        status = 'ONGOING'
                    } else if ( now > rankEnd && now <= announceEnd ) {
                        status = 'CLOSED_VISIBLE'
                    }
                }

                if (artist.flashLeaderboard.status !== status) {
                    changesDetected = true
                }

                return {
                    ...artist,
                    flashLeaderboard: {
                        ...artist.flashLeaderboard,
                        status: status
                    }
                }
            })
            
            changesDetected
                && setArtists(updatedFlashLeaderboardsStatus)
        }

        const intervalId = setInterval(updateFlashLeaderboardsStatuses, 1000)

        return () => {
            clearInterval(intervalId)
        }

    }, []) 

    return (
        <FlashLeaderboardsContext.Provider value={{ flashLeaderboards, setFlashLeaderboards }}>
            {children}
        </FlashLeaderboardsContext.Provider>
    )
}