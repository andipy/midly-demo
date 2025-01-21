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
                    title: 'Prossimo concerto info',
                    topic: 'Quanto dista San Siro da Roma?',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: []

                },{
                    id: 2,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    userName: 'imTheKing',
                    publisher: {
                        id: 1,
                        type: 'FAN'
                    },
                    title: 'Disco nuovo',
                    topic: 'Secondo voi quando esce?',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: []

                }, {
                    id: 3,
                    userImage: require('../images/pictures/thasup.jpg'),
                    userName: 'thasup',
                    publisher: {
                        id: 'a3p8',
                        type: 'ARTIST'
                    },
                    title: 'Biglietti tour',
                    topic: 'Avete comprato i blietti per il tour?',
                    hashtags: ['post', 'community', 'concerto'],
                    likes: [],
                    comments: []

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