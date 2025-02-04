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
            forum: [],
            leaderboard: [],
            fanLetters:[]
        },{
            id: 2,
            artistId: 'a3p8',
            isActive: true,
            subscribers: 0,
            name: 'Fanclub di THASUP',
            description: 'Solo per i superfan di Davide, nuova musica fuori presto!',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/thasup-fanclub-cover.jpeg'),
                type: 'IMAGE'
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
            posts: [
                {
                    artistId: 'a3p8',
                    caption: 'Spoiler del prossimo branO?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2024-12-23T09:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/thasup-post-1.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a3p8',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
                {
                    artistId: 'a3p8',
                    caption: 'CASA GOSPEL fuori ora!?!?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-02T09:22:23.542Z",
                    id: 2,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/thasup-post-2.jpeg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a3p8',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: true,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters: []
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
            forum: [],
            leaderboard: [],
            fanLetters:[]
        },{
            id: 4,
            artistId: 'a2p1',
            isActive: true,
            subscribers: null,
            name: 'Fanclub di Sfera',
            description: 'sferaebbasta',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/sferaebbasta-poster-fanclub.png'),
                type: 'IMAGE'
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
            posts: [
                {
                    artistId: 'a2p1',
                    caption: 'Prime Ebbasta',
                    commentsCount: 2,
                    comments: [
                        {
                        id: 1,
                        userId: "a2p1",
                        userType: "ARTIST",
                        userImage: require('../images/pictures/sfera-ebbasta.jpg'),
                        username: "Sfera Ebbasta",
                        createdAt: "2025-01-27",
                        comment: "Ciao superfans!",
                        repliedUsername: undefined,
                        likes: [
                            {
                                type: 'FAN',
                                userId: 1
                            },
                            {
                                type: "FAN",
                                userId: 2
                            }
                        ],
                        comments: [
                            {
                            id: 2,
                            userId: 1,
                            userType: "FAN",
                            userImage: require('../images/pictures/ai_01.png'),
                            username: "chiara",
                            createdAt: "2025-01-27",
                            comment: "Spaccato!!",
                            repliedUsername: 'Sfera Ebbasta',
                            likes: [],
                            comments: []
                            }
                        ]
                        }
                    ],
                    createdAt: "2024-12-23T09:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-1.jpg'),
                        },{
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-2.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
                {
                    artistId: 'a2p1',
                    caption: 'X2VR fuori venerdì',
                    commentsCount: 0,
                    comments: [
                    ],
                    createdAt: "2025-01-27T09:22:23.542Z",
                    id: 2,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: 'Presalva qui!', url: 'linkfinto'},
                    media: [
                        {
                            id: 1,
                            type: 'VIDEO',
                            url: require('../assets/video/sferaebbasta-video-post-1.mp4'),
                        },{
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-5.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
                {
                    artistId: 'a2p1',
                    caption: 'Merch esclusivo superfan abbonati!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-26T09:22:23.542Z",
                    id: 3,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-merch-1.png'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: '25 pezzi disponibili da ora.'
                    

                },
                {
                    artistId: 'a2p1',
                    caption: 'Italiano vero',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-21T09:22:23.542Z",
                    id: 4,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-4.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
                {
                    artistId: 'a2p1',
                    caption: 'Lifestyle',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-10T09:22:23.542Z",
                    id: 5,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-3.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
                {
                    artistId: 'a2p1',
                    caption: 'State ascoltando le nuove uscite?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-27T12:22:23.542Z",
                    id: 6,
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-6.png'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 20,
                        shareLink: undefined,
                    },
                    text: ''
                    

                }
                

            ],
            concerts: [
                {
                    artistId: 'a2p1',
                    buyLinks: [
                        'https://www.ticketone.it/artist/sfera-ebbasta/'
                    ],
                    comments: [],
                    cover: {
                        type: 'IMAGE',
                        url: require('../images/pictures/sferaebbasta-poster-tour.jpg')
                    },
                    createdAt: "2025-01-27T09:48:19.245Z",
                    dates: [
                        {
                            id: 1,
                            mainPlace: 'Arena Spettacoli Padova Fiere',
                            city:'Padova',
                            address:'Indirizzo',
                            date:"02-03-2025",
                            messages:[],
                            province:'Padova',
                            zipCode:'00000',
                        },
                        {
                            id: 2,
                            mainPlace: 'Nelson Mandela Forum',
                            city:'Firenze',
                            address:'Indirizzo',
                            date:"07-03-2025",
                            messages:[],
                            province:'Firenze',
                            zipCode:'00000',
                        },
                        {
                            id: 3,
                            mainPlace: 'Palazzo Dello Sport',
                            city:'Roma',
                            address:'Indirizzo',
                            date:"12-03-2025",
                            messages:[],
                            province:'Roma',
                            zipCode:'00000',
                        },
                        {
                            id: 4,
                            mainPlace: 'Unipol Arena',
                            city:'Casalecchio di reno',
                            address:'Indirizzo',
                            date:"22-03-2025",
                            messages:[],
                            province:'Province',
                            zipCode:'00000',
                        },
                        {
                            id: 5,
                            mainPlace: 'Inalpi Arena',
                            city:'Torino',
                            address:'Indirizzo',
                            date:"29-03-2025",
                            messages:[],
                            province:'Province',
                            zipCode:'00000',
                        },
                        {
                            id: 6,
                            mainPlace: 'Unipol Forum',
                            city:'Assago',
                            address:'Indirizzo',
                            date:"04-04-2025",
                            messages:[],
                            province:'Province',
                            zipCode:'00000',
                        },
                        {
                            id: 7,
                            mainPlace: 'Unipol Forum',
                            city:'Assago',
                            address:'Indirizzo',
                            date:"27-04-2025",
                            messages:[],
                            province:'Province',
                            zipCode:'00000',
                        }
                    ],
                    id: 1,
                    likes: [],
                    messages: [],
                    name: '$€ tour 2025',
                    participants: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        
                    ],
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 0, shareLink: undefined
                    },
                    type: 'TOUR'

                },
                {
                    artistId: 'a2p1',
                    buyLinks: ['https://www.vivoconcerti.com/roster/sfera-ebbasta/stadio-maradona'],
                    comments: [],
                    cover: {
                        type: 'IMAGE',
                        url: require('../images/pictures/sferaebbasta-maradona-poster.jpeg')
                    },
                    createdAt: "2025-01-27T10:03:15.683Z",
                    date: '07-06-2025',
                    id: 2,
                    likes:[],
                    messages: [
                        {
                            content: 'Qualcuno parte da Bari?',
                            createdAt: '2025-01-27',
                            id: 1,
                            type: 'COMMENT',
                            userId: 1,
                            userImage: '',
                            userType: 'fan',
                            username: 'imtheKING'
                        },
                        {
                            content: 'Noi siamo in tre, possiamo stringerci!',
                            createdAt: '2025-01-27',
                            id: 2,
                            type: 'COMMENT',
                            userId: 3,
                            userImage: '',
                            userType: 'fan',
                            username: 'username_user'
                        },
                        {
                            content: 'Ciao raga, ma piove?',
                            createdAt: '2025-01-27',
                            id: 3,
                            type: 'COMMENT',
                            userId: 5,
                            userImage: require('../images/pictures/ai_05.png'),
                            userType: 'fan',
                            username: 'sfera_superfan'
                        }
                    ],
                    name: 'Stadio 2025',
                    participants: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                    ],
                    place: {
                        address: 'indirizzo',
                        city: 'Napoli',
                        mainPlace: 'Stadio Diego Armando Maradona',
                        province: 'provincia',
                        zipCode: '00000'
                    },
                    publisher: {id: 'a2p1', type: 'ARTIST'},
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {shareCount: 0, shareLink: undefined},
                    type: 'CONCERT'
                }
            ],
            forum: [
                {
                    id: 'a2p1',
                    userImage: require('../images/pictures/sfera-ebbasta.jpg'),
                    userName: 'Sfera Ebbasta',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    cover: undefined,
                    title: 'Secondo voi qual è il futuro della musica urban?',
                    description: 'Quali suoni diventeranno main stream? Per me suoni sempre più sintetici e particolari, ma vedo anche un ritorno degli strumenti classici come il piano. Per voi?',
                    hashtags: ['musica', 'futuro', 'gustiMusicali'],
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                    ],
                    comments: [
                        {
                            comment: 'Bella domanda, secondo me un ritorno alle origini, suoni semplici, strumenti classici e poi.... boom, suoni devastanti nel mezzo',
                            comments: [],
                            createdAt: '2025-01-27',
                            id: 1,
                            likes: [],
                            repliedUsername: undefined,
                            userId: 1,
                            userImage: require('../images/pictures/ai_01.png'),
                            userType: 'FAN',
                            username: 'chiara'
                        }
                    ],
                    saved: [],
                    weight: 10,
                    commentsCount:1,
                    createdAt: '2025-01-24'

                },
                {
                    id: 1,
                    userImage: require('../images/pictures/ai_01.png'),
                    userName: 'chiara',
                    publisher: {
                        id: 1,
                        type: 'FAN'
                    },
                    cover: require('../images/pictures/sferaebbasta-topic-image.jpg'),
                    title: 'Foto del live al Forum?',
                    description: 'Qualcuno ha fatto qualche foto al live di sabato?',
                    hashtags: ['foto', 'live', 'forum'],
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                    ],
                    comments: [],
                    saved: [],
                    weight: 10,
                    commentsCount:0,
                    createdAt: '2025-01-24'

                }
            ],
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    auraPoints: 3689,
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    auraPoints: 0,
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    auraPoints: 2907,
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    auraPoints: 1984,
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    auraPoints: 1888,
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    auraPoints: 1467,
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    auraPoints: 1107,
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    auraPoints: 467,
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    auraPoints: 399,
                }
            ],
            fanLetters:[
                {
                    id: 1,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-1.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },
                {
                    id: 2,
                    userId: 5,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-2.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },
                {
                    id: 3,
                    userId: 3,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-3.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Prova di una caption più lunga di modo che su due righe venga troncata e non venga mostrata oltre nella home letters fanclub',
                    mode: 'PUBLISHED'
                },
                {
                    id: 4,
                    userId: 6,
                    media: 
                    {
                        url: require('../assets/video/sfera-fan-letter-8.mp4'),
                        type: 'VIDEO'
                    },
                    caption: 'Prova video loop muto',
                    mode: 'PUBLISHED'
                },
                {
                    id: 5,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-5.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },
                {
                    id: 6,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-6.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },
                {
                    id: 7,
                    userId: 2,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-7.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                }
            ]
        }
    ])

    return (
        <FanclubsContext.Provider value={{ fanclubs, setFanclubs }}>
            {children}
        </FanclubsContext.Provider>
    )
}