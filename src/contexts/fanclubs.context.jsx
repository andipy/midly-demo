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
                    cover: 'blob:http://localhost:3000/e086166b-8a02-43cf-ae0a-53a91c658eb3',
                    title: 'Prossimo concerto info',
                    topic: 'Quanto dista San Siro da Roma?',
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
                    cover: 'blob:http://localhost:3000/e086166b-8a02-43cf-ae0a-53a91c658eb3',
                    title: 'Disco nuovo',
                    topic: 'Secondo voi quando esce?',
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
                    cover: 'blob:http://localhost:3000/e086166b-8a02-43cf-ae0a-53a91c658eb3',
                    title: 'Biglietti tour',
                    topic: 'Avete comprato i blietti per il tour?',
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
                    cover: 'blob:http://localhost:3000/e086166b-8a02-43cf-ae0a-53a91c658eb3',
                    title: 'Altra domanda artista peso minore',
                    topic: 'Prova di lunghezza della domanda voglio farla molto lunga di modo che superi le tre righe quando viene stampata nella home del forum',
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