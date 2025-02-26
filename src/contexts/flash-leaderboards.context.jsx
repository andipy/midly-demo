import { useState, createContext, useContext, useEffect } from 'react'
import { ArtistsContext } from './artists.context'

export const FlashLeaderboardsContext = createContext()

export const FlashLeaderboardsProvider = ({ children }) => {

    const { artists, setArtists } = useContext(ArtistsContext)

    const [flashLeaderboards, setFlashLeaderboards] = useState([
        {
            id: 1,
            artistId: 'a3p8',
            announceMessage: 'Sta per aprire la classifica flash di thasup',
            announceStartDate: '2025-02-25 00:00:00',
            announceEndDate: '2025-03-01 00:00:00',
            rankStartDate: '2025-02-26 00:00:00',
            rankEndDate: '2025-02-28 00:00:00',
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
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 41,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 12,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 77,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 133,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 42,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 187,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 6,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 4,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 61,
                    // position: 9
                }
            ]
        },{
            id: 2,
            artistId: 3,
            announceMessage: 'Sta per aprire la classifica flash di Artie 5ive',
            announceStartDate: '2024-12-12 10:00:00',
            announceEndDate: '2024-12-22 00:00:00',
            rankStartDate: '2024-12-13 00:00:00',
            rankEndDate: '2024-12-20 00:00:00',
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
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 388,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 133,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 400,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 62,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 72,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 233,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 375,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 102,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 409,
                    // position: 9
                }
            ]
        },{
            id: 3,
            artistId: 1,
            announceMessage: 'La CLASSIFICA FLASH si attiverà all 1:30',
            announceStartDate: '2025-02-08 10:00:00',
            announceEndDate: '2025-02-15 00:00:00',
            rankStartDate: '2025-02-10 01:30:00',
            rankEndDate: '2025-02-13 02:00:00',
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
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 311,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 122,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 167,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 72,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 16,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 42,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 44,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 298,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 114,
                    // position: 9
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
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 32,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 37,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 66,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 12,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 13,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 11,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 76,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 13,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 98,
                    // position: 9
                }
            ]
        },{
            id: 5,
            artistId: 'a2p1',
            announceMessage: 'Sta per aprire la classifica flash di Sfera Ebbasta',
            announceStartDate: '2025-02-25 00:00:00',
            announceEndDate: '2025-03-01 00:00:00',
            rankStartDate: '2025-02-26 00:00:00',
            rankEndDate: '2025-02-28 00:00:00',
            participants: 6970,
            totalStreams: 39016,
            image: require('../images/pictures/sfera-ebbasta-flash.jpg'),
            song: {
                title: 'Visiera A Becco',
                url: 'https://open.spotify.com/intl-it/track/4ySxBjhmdnkeFUqhKxW3cY',
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
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 32,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 37,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 66,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 12,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 13,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 11,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 76,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 13,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 98,
                    // position: 9
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
    }, [artists]) 

    return (
        <FlashLeaderboardsContext.Provider value={{ flashLeaderboards, setFlashLeaderboards }}>
            {children}
        </FlashLeaderboardsContext.Provider>
    )
}