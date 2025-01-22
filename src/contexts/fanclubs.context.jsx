import { useState, createContext } from 'react'

export const FanclubsContext = createContext()

export const FanclubsProvider = ({ children }) => {

    const [fanclubs, setFanclubs] = useState([
        {
            id: 1,
            artistId: 1,
            isActive: false,
            subscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: undefined,
                url: undefined,
                type: undefined
            },
            maxSubscribers: null,
            firstName: null,
            lastName: null,
            fiscalCode: null,
            email: null,
            address: null,
            zipCode: null,
            city: null,
            province: null,
            beneficiary: null,
            iban: null,
            posts: [],
            concerts: [],
            forum: []
        },{
            id: 2,
            artistId: 'a3p8',
            isActive: true,
            subscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: undefined,
                url: undefined,
                type: undefined
            },
            maxSubscribers: null,
            firstName: null,
            lastName: null,
            fiscalCode: null,
            email: null,
            address: null,
            zipCode: null,
            city: null,
            province: null,
            beneficiary: null,
            iban: null,
            posts: [],
            concerts: [],
            forum: [
                {
                    id: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    userName: 'imTheKing',
                    publisher: {
                        id: 1,
                        type: 'FAN'
                    },
                    cover: require('../images/pictures/thasup-album-cover.jpeg'),
                    title: 'Quanto dista San Siro da Roma?',
                    description: 'Devo venire in auto con quattro amici se qualcuno volesse aggiungersi abbiamo 5 posti',
                    hashtags: ['post', 'community', 'concerto', 'posteggi', 'vario', 'topic', 'sferafanclub'],
                    likes: [],
                    comments: [],
                    saved: [],
                    weight: 9

                },{
                    id: 2,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    userName: 'imTheKing',
                    publisher: {
                        id: 1,
                        type: 'FAN'
                    },
                    cover: require('../images/pictures/thasup-album-cover.jpeg'),
                    title: 'Secondo voi quando esce?',
                    description: 'Il disco nuovooooo',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: [],
                    saved: [],
                    weight: 9

                }, {
                    id: 3,
                    userImage: require('../images/pictures/thasup.jpg'),
                    userName: 'thasup',
                    publisher: {
                        id: 'a3p8',
                        type: 'ARTIST'
                    },
                    cover: require('../images/pictures/thasup-album-cover.jpeg'),
                    title: 'Avete comprato i blietti per il tour?',
                    description: 'Stanno per finire!!',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: [],
                    saved: [],
                    weight: 10

                },  {
                    id: 4,
                    userImage: require('../images/pictures/thasup.jpg'),
                    userName: 'thasup',
                    publisher: {
                        id: 'a3p8',
                        type: 'ARTIST'
                    },
                    cover: require('../images/pictures/thasup-album-cover.jpeg'),
                    title: 'Altra domanda artista peso minore',
                    description: 'Prova di lunghezza della domanda voglio farla molto lunga di modo che superi le tre righe quando viene stampata nella home del forum',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: [],
                    saved: [],
                    weight: 6

                },

            ]
        },{
            id: 3,
            artistId: 3,
            isActive: false,
            subscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: undefined,
                url: undefined,
                type: undefined
            },
            maxSubscribers: null,
            firstName: null,
            lastName: null,
            fiscalCode: null,
            email: null,
            address: null,
            zipCode: null,
            city: null,
            province: null,
            beneficiary: null,
            iban: null,
            posts: [],
            concerts: [],
            forum: []
        }
    ])

    return (
        <FanclubsContext.Provider value={{ fanclubs, setFanclubs }}>
            {children}
        </FanclubsContext.Provider>
    )
}