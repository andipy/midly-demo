import { useState, createContext } from 'react'

export const FanclubsContext = createContext()

export const FanclubsProvider = ({ children }) => {

    const [fanclubs, setFanclubs] = useState([
        {
            id: 2,
            artistId: 'a3p8',
            isActive: true,
            subscribers: 0,
            name: '',
            description: '',
            pricing: '',
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
            fanLetters: [],
            messages:[]
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
                    id: 2,
                    artistId: 'a2p1',
                    userImage: require('../images/pictures/sfera-ebbasta.jpg'),
                    userName: 'Sfera Ebbasta',
                    publisher: {
                        id: 'a2p1',
                        type: 'ARTIST'
                    },
                    cover: undefined,
                    title: 'Secondo voi qual è il futuro della musica urban?',
                    description: 'Quali suoni diventeranno main stream? Per me suoni sempre più sintetici e particolari, ma vedo anche un ritorno degli strumenti classici come il piano. Per voi?',
                    //hashtags: ['musica', 'futuro', 'gustiMusicali'],
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
                    artistId: "a2p1",
                    userImage: require('../images/pictures/ai_01.png'),
                    userName: 'chiara',
                    publisher: {
                        id: 1,
                        type: 'FAN'
                    },
                    cover: require('../images/pictures/sferaebbasta-topic-image.jpg'),
                    title: 'Foto del live al Forum?',
                    description: 'Qualcuno ha fatto qualche foto al live di sabato?',
                    //hashtags: ['foto', 'live', 'forum'],
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
            ],
            messages:[
                {
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 1,
                    createdAt: "2025-02-05T12:22:23.542Z",
                    content: 'Raga, ma avete sentito l ultimo pezzo di Sfera? "Soldi e Diamanti" è una bomba!'
                },
                {
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    id: 2,
                    createdAt: "2025-02-05T13:22:23.542Z",
                    content: 'Yesss! Il beat spacca e il ritornello ti rimane in testa subito'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 3,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Secondo voi è meglio questa o "Baby"? Io sono ancora in fissa con quella'
                },
                {
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    id: 4,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Bro, "Baby" è un classico, ma l ultimo singolo è già una hit!'
                },
                {
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    id: 5,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sfera non sbaglia un colpo, ogni traccia è un successo assicurato!'
                },
                {
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    id: 6,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ho visto che sta annunciando le date del tour, chi viene al concerto di Milano?'
                },
                {
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 7,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Io ci sarò! Voglio sentire "Piove" live, con Lazza sarebbe una bomba!'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 8,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Raga, ma secondo voi collaborerà mai con artisti americani tipo Travis Scott?'
                },
                {
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 9,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sarebbe il top! Lui ha già fatto feat internazionali, quindi mai dire mai!'
                },
                {
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    id: 10,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: ' Io spero solo che porti i pezzi vecchi nei live, tipo "Rockstar", quella è leggenda!'
                },
                {
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 11,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Verooo! "Rockstar" mi riporta a un sacco di ricordi, che anni pazzeschi!'
                },
                {
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    id: 12,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'E il nuovo album? Quando lo annuncia? Sto aspettando troppo!'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 13,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Dicono esca prima dell estate, vi immaginate un altra hit estiva come "M Manc"!? 🔥'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 14,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'O magari un pezzo drill con Shiva e Capo Plaza 😈 Sarebbe il delirio!'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 15,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Raga ma parliamo del look di Sfera? Sempre il più fresco, gli occhiali a cuore sono già iconici'
                },
                {
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    id: 16,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Poi l’attitude… Sfera ha proprio quella vibe da superstar, come pochi!'
                },
                {
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 17,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Infatti, se oggi la trap italiana è conosciuta è anche merito suo!'
                },
                {
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    id: 18,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Non vedo l’ora di sentirlo dal vivo, il palco è il suo regno!'
                },
                {
                    userType: 'fan',
                    userId: 8,
                    userImage: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    id: 19,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sfera numero uno! Ci vediamo sotto il palco raga! '
                },

            ]
        },{
            id: 5,
            artistId: 'a8p1',
            isActive: true,
            subscribers: null,
            name: 'Fanclub di NAYT',
            description: 'Lettera Q',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/nayt-fanclub-cover.jpg'),
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
                    artistId: 'a8p1',
                    caption: 'Lettera Q, il mio nuovo disco, fuori venerdì, presalva qui sotto',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2024-12-23T09:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: 'Presave del disco', url: 'https://open.spotify.com/intl-it/artist/7tmTvmqgTBcX88ZrSHByrD'},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/nayt-fanclub-cover.jpg'),
                        },
                        {
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/nayt-post-1.jpg')
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a8p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },{
                    artistId: 'a8p1',
                    caption: 'Biglietti del tour anticipati solo per i Superfan!!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-06T09:22:23.542Z",
                    id: 2,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: 'Link i biglietti', url: 'https://open.spotify.com/intl-it/artist/7tmTvmqgTBcX88ZrSHByrD'},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/nayt-post-2.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a8p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters:[],
            messages:[]
        },{
            id: 6,
            artistId: 'a4p4',
            isActive: true,
            subscribers: null,
            name: 'SSSSickLukeClub',
            description: 'X2',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/sick-luke-fanclub-cover.png'),
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
                    artistId: 'a4p4',
                    caption: 'Solo x voi la copertina di X2, il mio nuovo album lesssgoo',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2024-08-23T09:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sick-luke-post-1.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a4p4',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                }
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters:[],
            messages:[]
        },{
            id: 7,
            artistId: 'a5p1',
            isActive: true,
            subscribers: null,
            name: 'Astri',
            description: '3000, nuova musica presto out!!',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/astro-fanclub-cover.jpg'),
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
                    artistId: 'a5p1',
                    caption: 'Spoiler del prossimo feat, no cap',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-01T09:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/astro-post-2.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a5p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },{
                    artistId: 'a5p1',
                    caption: 'Presto fuori ci siamo o no?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-05T09:22:23.542Z",
                    id: 2,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'VIDEO',
                            url: require('../assets/video/astro-post-3.mp4'),
                        },{
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/astro-post-1.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a5p1',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                }
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters:[],
            messages:[]
        },{
            id: 8,
            artistId: 'a7p3',
            isActive: true,
            subscribers: null,
            name: 'okClub',
            description: 'okokokokokokokokokokokokokokokokokokokok',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/okgiorgio-fanclub-cover.png'),
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
                    artistId: 'a7p3',
                    caption: 'Dj set per le mucche',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-28T22:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'VIDEO',
                            url: require('../assets/video/okgiorgio-post-1.mp4'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a7p3',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                }
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters:[],
            messages:[]
        },{
            id: 9,
            artistId: 'a6p2',
            isActive: true,
            subscribers: null,
            name: 'we love Villanova',
            description: 'TOCCA IL CIELO FEST',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/bnkr44-fanclub-cover.jpg'),
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
                    artistId: 'a6p2',
                    caption: 'BIGLIETTI IN ANTEPRIMA, EMPOLI CI VEDIAMO LI!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-05T22:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: 'TOCCA IL CIELO FEST', url: 'https://open.spotify.com/intl-it/artist/1lwGYDWoXC7E5wDNYZBurw?si=Mq6kiGjESwKSXe-8yk22NQ'},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/bnkr44-post-1.jpg'),
                        },{
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/bnkr44-post-2.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a6p2',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: true
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                },{
                    artistId: 'a6p2',
                    caption: 'Korea44',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-27T22:22:23.542Z",
                    id: 1,
                    likes: [
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6},
                        {userId: 7},
                        {userId: 8},
                        {userId: 9},
                    ],
                    link: {name: '', url: ''},
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/bnkr44-post-3.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'a6p2',
                        type: 'ARTIST'
                    },
                    settings: {
                        isPinned: false,
                        isPrivate: false
                    },
                    share: {
                        shareCount: 100,
                        shareLink: undefined,
                    },
                    text: ''
                    

                }
            ],
            concerts: [],
            forum: [],
            leaderboard: [],
            fanLetters:[],
            messages:[]
        }
    ])

    return (
        <FanclubsContext.Provider value={{ fanclubs, setFanclubs }}>
            {children}
        </FanclubsContext.Provider>
    )
}