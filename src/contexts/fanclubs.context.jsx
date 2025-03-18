import { useState, createContext } from 'react'

export const FanclubsContext = createContext()

export const FanclubsProvider = ({ children }) => {

    const [fanclubs, setFanclubs] = useState([
        {
            id: 1,
            artistId: 'artist1',
            isActive: false,
            subscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
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
            fanLetters:[],
            messages:[
                {
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 1,
                    createdAt: "2025-02-05T12:22:23.542Z",
                    content: 'Ragazzi, ma quanto è assurdo Sirio? Lo ascolto in loop da settimane! 🚀🔥'
                },{
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    id: 2,
                    createdAt: "2025-02-05T13:22:23.542Z",
                    content: 'Concordo! “Cenere” è una hit immortale! Ogni volta mi prende una carica assurda!'
                },{
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 3,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ragazzi, ma avete visto che sta lavorando a nuova musica? Ho troppa hype! 😍🎹'
                },{
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    id: 4,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Se il prossimo album è anche solo la metà di Re Mida e Sirio, spaccherà tutto! '
                },{
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    id: 5,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'A me fa impazzire il suo modo di mescolare rap e pianoforte, talento puro! 🎹👑'
                },{
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    id: 6,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Esatto! E poi live è una bomba! Qualcuno di voi è andato a un suo concerto?'
                },{
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 7,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Yesss, ero a Milano l’anno scorso! L’energia era pazzesca, e quando ha suonato al piano... brividi!!'
                },{
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    id: 8,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ragazzi, se organizziamo un raduno del fanclub? Sarebbe troppo figo conoscerci e magari suonare qualcosa insieme! '
                },{
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    id: 9,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Idea top! Possiamo trovarci e fare un ascolto collettivo quando esce il nuovo album! '
                },{
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    id: 10,
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: ' Ci sto! Lazza merita tutto il supporto del mondo! Facciamogli sentire la nostra carica! '
                }
            ],
            storeItems: []
        },{
            id: 2,
            artistId: 'artist2',
            isActive: false,
            subscribers: 2386,
            name: 'amici str3tt1',
            description: 'il mio clu3 esclusivo',
            pricing: 4.99,
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
            posts: [
                /* {
                    id: 1,
                    artistId: 'artist2',
                    caption: 'qualche amico sul nuovo brano...',
                    commentsCount: 2,
                    comments: [
                        {
                            id: 1,
                            userId: 3,
                            userType: "FAN",
                            userImage: "",
                            username: "utente_03",
                            createdAt: "2025-02-20",
                            comment: "ciao",
                            likes: [],
                            comments: [
                                {
                                    id: 1,
                                    userId: 6,
                                    userType: "FAN",
                                    userImage: "",
                                    username: "utente_06",
                                    createdAt: "2025-02-20",
                                    comment: "ahahaha",
                                    likes: [],
                                    comments: [],
                                    repliedUsername: "utente_03"
                                }
                            ]
                        }
                    ],
                    createdAt: "2024-12-23T09:22:23.542Z",
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
                        id: 'artist2',
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
                }, */
            ],
            concerts: [],
            forum: [
                {
                    id: 1,
                    artistId: 'artist2',
                    userImage: require('../images/pictures/thasup.jpg'),
                    userName: 'thasup',
                    publisher: {
                        id: 'artist2',
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
                            id: 1,
                            comment: 'Bella domanda, secondo me un ritorno alle origini, suoni semplici, strumenti classici e poi.... boom, suoni devastanti nel mezzo',
                            comments: [],
                            createdAt: '2025-01-27',
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
                },{
                    id: 2,
                    artistId: 'artist2',
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
            fanLetters: [
                {
                    id: 1,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/thasup-letter-1.jpg'),
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
                        url: require('../images/pictures/thasup-letter-2.jpg'),
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
                        url: require('../images/pictures/thasup-letter-3.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Prova di una caption più lunga di modo che su due righe venga troncata e non venga mostrata oltre nella home letters club',
                    mode: 'PUBLISHED'
                },
                {
                    id: 4,
                    userId: 6,
                    media: 
                    {
                        url: require('../images/pictures/thasup-letter-4.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Prova video loop muto',
                    mode: 'PUBLISHED'
                },
                {
                    id: 5,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/thasup-letter-5.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                }
            ],
            messages:[
                {
                    id: 1,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: '2025-02-05T12:22:23.542Z',
                    content: 'Raga, ma secondo voi quando esce il nuovo album? Sto in astinenza da thasup vibes 😭',
                    read: []
                },{
                    id: 2,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: '2025-02-05T13:22:23.542Z',
                    content: 'Dicono entro quest anno, ma nulla di confermato… spero che lasci qualche indizio presto!',
                    read: []
                },{
                    id: 3,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: '2025-02-05T13:23:23.542Z',
                    content: 'Io sto ancora in loop con c@ra++ere s?ec!@le 🔥 Quell’album è stato una rivoluzione.',
                    read: []
                },{
                    id: 4,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: '2025-02-05T13:23:23.542Z',
                    content: 'Frà, ma la voce robotica? Mi fa impazzire, è come un viaggio spaziale ogni volta!',
                    read: []
                },{
                    id: 5,
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    createdAt: '2025-02-05T13:23:23.542Z',
                    content: 'La vera domanda è: con chi farà il prossimo feat? Sogno una collab con Salmo o Lazza.',
                    read: []
                },{
                    id: 6,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Io dico che potrebbe fare qualcosa con Drillionaire… o magari un pezzo più chill tipo con Ariete?',
                    read: []
                },{
                    id: 7,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Vero, con Ariete spaccherebbe. Ma voglio anche un altra bomba come okk@pp@!',
                    read: []
                },{
                    id: 8,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Secondo voi cambierà sound nel prossimo album o resterà fedele al suo stile glitchato?',
                    read: []
                },{
                    id: 9,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Dai, sicuro sperimenta ancora! Thasup non si ripete mai uguale.',
                    read: []
                },{
                    id: 10,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Raga, ma voi riuscite a capire al primo ascolto i testi o anche voi andate su Genius? 😂',
                    read: []
                },{
                    id: 11,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ahahah, io certe barre le capisco dopo settimane! Ma è il bello di thasup, lascia sempre dettagli nascosti.',
                    read: []
                },{
                    id: 12,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ho visto su Reddit che alcuni pensano che il prossimo album sarà un concept tipo cyberpunk… che ne dite?',
                    read: []
                },{
                    id: 13,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sarebbe pazzesco! Già immagino il video tutto in CGI con lui in versione avatar 3D.',
                    read: []
                },{
                    id: 14,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'E se tornasse con una nuova estetica? Tipo più dark, più minimal…',
                    read: []
                },{
                    id: 15,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'O magari va full anime-style, tipo thasup in Tokyo',
                    read: []
                },{
                    id: 16,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'L’importante è che non smetta mai con quei beat che ti mandano in un’altra dimensione.',
                    read: []
                },{
                    id: 17,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'A proposito, voi usate mai le sue basi per freestyle? Alcuni sono perfetti per allenarsi.',
                    read: []
                },{
                    id: 18,
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Io sì! E a volte provo a ricreare i suoi suoni, ma è impossibile… ha un tocco troppo unico.',
                    read: []
                },{
                    id: 19,
                    userType: 'fan',
                    userId: 8,
                    userImage: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Concordo. Comunque, se annuncia qualcosa di nuovo, SPAMMATEMI SUBITO!',
                    read: []
                }
            ],
            storeItems: []
        },{
            id: 3,
            artistId: 'artist3',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 4,
            artistId: 'artist4',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 5,
            artistId: 'artist5',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'Astri',
            description: '3000, nuova musica presto out!!',
            pricing: '3.99',
            cover: {
                id: 1,
                url: require('../images/pictures/astro-fanclub-cover.jpg'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist5',
                    caption: 'Spoiler del prossimo feat, no cap',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-01T09:22:23.542Z",
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
                    link: {
                        name: null,
                        url: null
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/astro-post-2.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist5',
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
                    id: 2,
                    artistId: 'artist5',
                    caption: 'Presto fuori ci siamo o no?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-05T09:22:23.542Z",
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
                    link: {
                        name: null,
                        url: null
                    },
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
                        id: 'artist5',
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
            messages:[],
            storeItems: []
        },{
            id: 6,
            artistId: 'artist6',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 7,
            artistId: 'artist7',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'SSSSickLukeClub',
            description: 'X2',
            pricing: 4.99,
            cover: {
                id: 1,
                url: require('../images/pictures/sick-luke-fanclub-cover.png'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist7',
                    caption: 'Solo x voi la copertina di X2, il mio nuovo album lesssgoo',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2024-08-23T09:22:23.542Z",
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
                    link: {
                        name: null,
                        url: null
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sick-luke-post-1.jpg'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist7',
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
            messages:[],
            storeItems: []
        },{
            id: 8,
            artistId: 'artist8',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 9,
            artistId: 'artist9',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 10,
            artistId: 'artist10',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 11,
            artistId: 'artist11',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 12,
            artistId: 'artist12',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 13,
            artistId: 'artist13',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'Club di Sfera',
            description: 'sferaebbasta',
            pricing: 4.99,
            cover: {
                id: 1,
                url: require('../images/pictures/sferaebbasta-poster-fanclub.png'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist13',
                    caption: 'Prime Ebbasta',
                    commentsCount: 2,
                    comments: [
                        {
                            id: 1,
                            userId: "artist13",
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
                                    id: 1,
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
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: '',
                        url: ''
                    },
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
                        id: 'artist13',
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
                },{
                    id: 2,
                    artistId: 'artist13',
                    caption: 'X2VR fuori venerdì',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-27T09:22:23.542Z",
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: 'Presalva qui!',
                        url: 'linkfinto'
                    },
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
                        id: 'artist13',
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
                },{
                    id: 3,
                    artistId: 'artist13',
                    caption: 'Merch esclusivo superfan abbonati!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-26T09:22:23.542Z",
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: '',
                        url: ''
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-merch-1.png'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist13',
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
                },{
                    id: 4,
                    artistId: 'artist13',
                    caption: 'Italiano vero',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-21T09:22:23.542Z",
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: '',
                        url: ''
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-4.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist13',
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
                },{
                    id: 5,
                    artistId: 'artist13',
                    caption: 'Lifestyle',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-10T09:22:23.542Z",
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: '',
                        url: ''
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-3.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist13',
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
                },{
                    id: 6,
                    artistId: 'artist13',
                    caption: 'State ascoltando le nuove uscite?',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-27T12:22:23.542Z",
                    likes: [
                        {userId: 1},
                        {userId: 2},
                        {userId: 3},
                        {userId: 4},
                        {userId: 5},
                        {userId: 6}
                    ],
                    link: {
                        name: '',
                        url: ''
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sferaebbasta-post-6.png'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist13',
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
                    id: 1,
                    artistId: 'artist13',
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
                            city: 'Padova',
                            address: 'Indirizzo',
                            date: "02-03-2025",
                            messages: [],
                            province: 'Padova',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 2,
                            mainPlace: 'Nelson Mandela Forum',
                            city: 'Firenze',
                            address: 'Indirizzo',
                            date: "07-03-2025",
                            messages: [],
                            province: 'Firenze',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 3,
                            mainPlace: 'Palazzo Dello Sport',
                            city: 'Roma',
                            address: 'Indirizzo',
                            date: "12-03-2025",
                            messages: [],
                            province: 'Roma',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 4,
                            mainPlace: 'Unipol Arena',
                            city: 'Casalecchio di reno',
                            address: 'Indirizzo',
                            date: "22-03-2025",
                            messages: [],
                            province: 'Milano',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 5,
                            mainPlace: 'Inalpi Arena',
                            city: 'Torino',
                            address: 'Indirizzo',
                            date: "29-03-2025",
                            messages: [],
                            province: 'Province',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 6,
                            mainPlace: 'Unipol Forum',
                            city: 'Assago',
                            address: 'Indirizzo',
                            date: "04-04-2025",
                            messages: [],
                            province: 'Province',
                            zipCode: '00000',
                            participants: []
                        },{
                            id: 7,
                            mainPlace: 'Unipol Forum',
                            city: 'Assago',
                            address: 'Indirizzo',
                            date: "27-04-2025",
                            messages: [],
                            province: 'Province',
                            zipCode: '00000',
                            participants: []
                        }
                    ],
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
                        id: 'artist13',
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
                },{
                    id: 2,
                    artistId: 'artist13',
                    buyLinks: ['https://www.vivoconcerti.com/roster/sfera-ebbasta/stadio-maradona'],
                    comments: [],
                    cover: {
                        type: 'IMAGE',
                        url: require('../images/pictures/sferaebbasta-maradona-poster.jpeg')
                    },
                    createdAt: "2025-01-27T10:03:15.683Z",
                    date: '07-06-2025',
                    likes:[],
                    messages: [
                        {
                            id: 1,
                            content: 'Qualcuno parte da Bari?',
                            createdAt: '2025-01-27',
                            type: 'COMMENT',
                            userId: 1,
                            userImage: '',
                            userType: 'fan',
                            username: 'imtheKING'
                        },{
                            id: 2,
                            content: 'Noi siamo in tre, possiamo stringerci!',
                            createdAt: '2025-01-27',
                            type: 'COMMENT',
                            userId: 3,
                            userImage: '',
                            userType: 'fan',
                            username: 'username_user'
                        },{
                            id: 3,
                            content: 'Ciao raga, ma piove?',
                            createdAt: '2025-01-27',
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
                    publisher: {
                        id: 'artist13',
                        type: 'ARTIST'
                    },
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
                    id: 1,
                    artistId: 'artist13',
                    userImage: require('../images/pictures/sfera-ebbasta.jpg'),
                    userName: 'Sfera Ebbasta',
                    publisher: {
                        id: 'artist13',
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
                            id: 1,
                            comment: 'Bella domanda, secondo me un ritorno alle origini, suoni semplici, strumenti classici e poi.... boom, suoni devastanti nel mezzo',
                            comments: [],
                            createdAt: '2025-01-27',
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
                },{
                    id: 2,
                    artistId: 'artist13',
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
                },{
                    id: 2,
                    userId: 5,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-2.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },{
                    id: 3,
                    userId: 3,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-3.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Prova di una caption più lunga di modo che su due righe venga troncata e non venga mostrata oltre nella home letters club',
                    mode: 'PUBLISHED'
                },{
                    id: 4,
                    userId: 6,
                    media: 
                    {
                        url: require('../assets/video/sfera-fan-letter-8.mp4'),
                        type: 'VIDEO'
                    },
                    caption: 'Prova video loop muto',
                    mode: 'PUBLISHED'
                },{
                    id: 5,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-5.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },{
                    id: 6,
                    userId: 1,
                    media: 
                    {
                        url: require('../images/pictures/sfera-fan-letter-6.jpg'),
                        type: 'IMAGE'
                    },
                    caption: 'Numero uno',
                    mode: 'PUBLISHED'
                },{
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
                    id: 1,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T12:22:23.542Z",
                    content: 'Raga, ma avete sentito l ultimo pezzo di Sfera? "Soldi e Diamanti" è una bomba!',
                    read: []
                },{
                    id: 2,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: "2025-02-05T13:22:23.542Z",
                    content: 'Yesss! Il beat spacca e il ritornello ti rimane in testa subito',
                    read: []
                },{
                    id: 3,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Secondo voi è meglio questa o "Baby"? Io sono ancora in fissa con quella',
                    read: []
                },{
                    id: 4,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Bro, "Baby" è un classico, ma l ultimo singolo è già una hit!',
                    read: []
                },{
                    id: 5,
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sfera non sbaglia un colpo, ogni traccia è un successo assicurato!',
                    read: []
                },{
                    id: 6,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Ho visto che sta annunciando le date del tour, chi viene al concerto di Milano?',
                    read: []
                },{
                    id: 7,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Io ci sarò! Voglio sentire "Piove" live, con Lazza sarebbe una bomba!',
                    read: []
                },{
                    id: 8,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Raga, ma secondo voi collaborerà mai con artisti americani tipo Travis Scott?',
                    read: []
                },{
                    id: 9,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sarebbe il top! Lui ha già fatto feat internazionali, quindi mai dire mai!',
                    read: []
                },{
                    id: 10,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: ' Io spero solo che porti i pezzi vecchi nei live, tipo "Rockstar", quella è leggenda!',
                    read: []
                },{
                    id: 11,
                    userType: 'fan',
                    userId: 1,
                    userImage: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Verooo! "Rockstar" mi riporta a un sacco di ricordi, che anni pazzeschi!',
                    read: []
                },{
                    id: 12,
                    userType: 'fan',
                    userId: 2,
                    userImage: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'E il nuovo album? Quando lo annuncia? Sto aspettando troppo!',
                    read: []
                },{
                    id: 13,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Dicono esca prima dell estate, vi immaginate un altra hit estiva come "M Manc"!? 🔥',
                    read: []
                },{
                    id: 14,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'O magari un pezzo drill con Shiva e Capo Plaza 😈 Sarebbe il delirio!',
                    read: []
                },{
                    id: 15,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Raga ma parliamo del look di Sfera? Sempre il più fresco, gli occhiali a cuore sono già iconici',
                    read: []
                },{
                    id: 16,
                    userType: 'fan',
                    userId: 6,
                    userImage: require('../images/pictures/ai_03.png'),
                    username: 'giulietta',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Poi l’attitude… Sfera ha proprio quella vibe da superstar, come pochi!',
                    read: []
                },{
                    id: 17,
                    userType: 'fan',
                    userId: 5,
                    userImage: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Infatti, se oggi la trap italiana è conosciuta è anche merito suo!',
                    read: []
                },{
                    id: 18,
                    userType: 'fan',
                    userId: 7,
                    userImage: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Non vedo l’ora di sentirlo dal vivo, il palco è il suo regno!',
                    read: []
                },{
                    id: 19,
                    userType: 'fan',
                    userId: 8,
                    userImage: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    createdAt: "2025-02-05T13:23:23.542Z",
                    content: 'Sfera numero uno! Ci vediamo sotto il palco raga! ',
                    read: []
                }
            ],
            storeItems: [
                {
                    id: 1,
                    artistId: 'artist13',
                    images: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-lp-image-1.webp'),
                        },
                        {
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-lp-image-2.webp'),
                        }
                    ],
                    collectionName: 'X2VR', //nome album
                    itemType: 'VINILE', //CD, VINILE, BUNDLE, T-SHIRT...
                    price: '24.99',
                    newItem: false,
                    limitedItem: false,
                    collection: false,
                    singleItems: [],
                    private: true,
                    sale: 20,
                    link: '',
                    description: 'Con X2VR Sfera Ebbasta torna alle origini proponendo il secondo attesissimo capitolo dell’album che lo ha reso celebre nel 2015, XDVR, un disco che ha lasciato un segno indelebile nella storia della trap e tra i suoi milioni di fan.',
                    soldOut: false
                },{
                    id: 2,
                    artistId: 'artist13',
                    images: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-tshirt-front-1.jpg'),
                        },
                        {
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-tshirt-back-1.jpg'),
                        }
                    ],
                    collectionName: 'FAMOSO', //nome album
                    itemType: 'T-SHIRT', //CD, VINILE, BUNDLE, T-SHIRT...
                    price: '39.99',
                    newItem: true,
                    limitedItem: true,
                    collection: false,
                    singleItems: [],
                    private: true,
                    sale: 0,
                    link: '',
                    colour: 'Nero',
                    sizesAvaible: ['XS', 'S', 'M', 'L', 'XL'],
                    description: 'Con X2VR Sfera Ebbasta torna alle origini proponendo il secondo attesissimo capitolo dell’album che lo ha reso celebre nel 2015, XDVR, un disco che ha lasciato un segno indelebile nella storia della trap e tra i suoi milioni di fan.',
                    soldOut: false
                },{
                    id: 2,
                    artistId: 'artist13',
                    images: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-cd-image-1.webp'),
                        },
                        {
                            id: 2,
                            type: 'IMAGE',
                            url: require('../images/pictures/sfera-cd-image-2.webp'),
                        }
                    ],
                    collectionName: 'NOME PRODOTTO MOLTO LUNGO SOLDOUT', //nome album
                    itemType: 'CD', //CD, VINILE, BUNDLE, T-SHIRT...
                    price: '19.99',
                    newItem: false,
                    limitedItem: true,
                    collection: false,
                    singleItems: [],
                    private: true,
                    sale: 0,
                    link: '',
                    description: 'Con X2VR Sfera Ebbasta torna alle origini proponendo il secondo attesissimo capitolo dell’album che lo ha reso celebre nel 2015, XDVR, un disco che ha lasciato un segno indelebile nella storia della trap e tra i suoi milioni di fan.',
                    soldOut: true
                },
            ]
        },{
            id: 14,
            artistId: 'artist14',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 15,
            artistId: 'artist15',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 16,
            artistId: 'artist16',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 17,
            artistId: 'artist17',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 18,
            artistId: 'artist18',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 19,
            artistId: 'artist19',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 20,
            artistId: 'artist20',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 21,
            artistId: 'artist21',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 22,
            artistId: 'artist22',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 23,
            artistId: 'artist23',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 24,
            artistId: 'artist24',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 25,
            artistId: 'artist25',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 26,
            artistId: 'artist26',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 27,
            artistId: 'artist27',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 28,
            artistId: 'artist28',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 29,
            artistId: 'artist29',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 30,
            artistId: 'artist30',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 31,
            artistId: 'artist31',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 32,
            artistId: 'artist32',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 33,
            artistId: 'artist33',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 34,
            artistId: 'artist34',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 35,
            artistId: 'artist35',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 36,
            artistId: 'artist36',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 37,
            artistId: 'artist37',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 38,
            artistId: 'artist38',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'we love Villanova',
            description: 'TOCCA IL CIELO FEST',
            pricing: 3.99,
            cover: {
                id: 1,
                url: require('../images/pictures/bnkr44-fanclub-cover.jpg'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist38',
                    caption: 'BIGLIETTI IN ANTEPRIMA, EMPOLI CI VEDIAMO LI!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-05T22:22:23.542Z",
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
                    link: {
                        name: 'TOCCA IL CIELO FEST',
                        url: 'https://open.spotify.com/intl-it/artist/1lwGYDWoXC7E5wDNYZBurw?si=Mq6kiGjESwKSXe-8yk22NQ'
                    },
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
                        id: 'artist38',
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
                    id: 2,
                    artistId: 'artist38',
                    caption: 'Korea44',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-27T22:22:23.542Z",
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
                    link: {
                        name: null,
                        url: null
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/bnkr44-post-3.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist38',
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
            messages:[],
            storeItems: []
        },{
            id: 39,
            artistId: 'artist39',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'okClub',
            description: 'okokokokokokokokokokokokokokokokokokokok',
            pricing: 3.99,
            cover: {
                id: 1,
                url: require('../images/pictures/okgiorgio-fanclub-cover.png'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist39',
                    caption: 'Dj set per le mucche',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-01-28T22:22:23.542Z",
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
                    link: {
                        name: null,
                        url: null
                    },
                    media: [
                        {
                            id: 1,
                            type: 'VIDEO',
                            url: require('../assets/video/okgiorgio-post-1.mp4'),
                        },
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist39',
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
            messages:[],
            storeItems: []
        },{
            id: 40,
            artistId: 'artist40',
            isActive: true,
            subscribers: null,
            maxSubscribers: null,
            name: 'Club di NAYT',
            description: 'Lettera Q',
            pricing: 4.99,
            cover: {
                id: 1,
                url: require('../images/pictures/nayt-fanclub-cover.jpg'),
                type: 'IMAGE'
            },
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
                    id: 1,
                    artistId: 'artist40',
                    caption: 'Lettera Q, il mio nuovo disco, fuori venerdì, presalva qui sotto',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2024-12-23T09:22:23.542Z",
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
                    link: {
                        name: 'Presave del disco',
                        url: 'https://open.spotify.com/intl-it/artist/7tmTvmqgTBcX88ZrSHByrD'
                    },
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
                        id: 'artist40',
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
                    id: 2,
                    artistId: 'artist40',
                    caption: 'Biglietti del tour anticipati solo per i Superfan!!',
                    commentsCount: 0,
                    comments: [],
                    createdAt: "2025-02-06T09:22:23.542Z",
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
                    link: {
                        name: 'Link i biglietti',
                        url: 'https://open.spotify.com/intl-it/artist/7tmTvmqgTBcX88ZrSHByrD'
                    },
                    media: [
                        {
                            id: 1,
                            type: 'IMAGE',
                            url: require('../images/pictures/nayt-post-2.jpg'),
                        }
                    ],
                    mode: 'PUBLISHED',
                    publisher: {
                        id: 'artist40',
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
            messages:[],
            storeItems: []
        },{
            id: 40,
            artistId: 'artist40',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 42,
            artistId: 'artist42',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 43,
            artistId: 'artist43',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        },{
            id: 44,
            artistId: 'artist44',
            isActive: false,
            subscribers: null,
            maxSubscribers: null,
            name: null,
            description: null,
            pricing: null,
            cover: {
                id: null,
                url: null,
                type: null
            },
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
            fanLetters:[],
            messages:[],
            storeItems: []
        }
    ])

    return (
        <FanclubsContext.Provider value={{ fanclubs, setFanclubs }}>
            {children}
        </FanclubsContext.Provider>
    )
}