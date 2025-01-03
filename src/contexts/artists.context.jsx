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
                status: undefined,
            },
            importance: 3,
            highlight: false,
            verified: true,
        },{
            id: 'a3p8',
            slug: 'thasup',
            artistName: 'thasup',
            image: require('../images/pictures/thasup.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 3,
            highlight: true,
            verified: true,
        },{
            id: 3,
            slug: 'artie-5ive',
            artistName: 'Artie 5ive',
            image: require('../images/pictures/artie-5ive.jpeg'),
            flashLeaderboard: {
                status: undefined,
            }, 
            importance: 3,
            highlight: false,
            verified: true,
        },{
            id: 4,
            slug: 'suspect-cb',
            artistName: 'Suspect CB',
            image: require('../images/pictures/suspect-cb.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 5,
            slug: 'astro',
            artistName: 'Astro',
            image: require('../images/pictures/astro.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 6,
            slug: 'alfa',
            artistName: 'Alfa',
            image: require('../images/pictures/alfa.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 7,
            slug: 'sick-luke',
            artistName: 'Sick Luke',
            image: require('../images/pictures/sick-luke.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 8,
            slug: 'nabi',
            artistName: 'Nabi',
            image: require('../images/pictures/nabi.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 9,
            slug: 'mezzosangue',
            artistName: 'Mezzosangue',
            image: require('../images/pictures/mezzosangue.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 10,
            slug: 'anna',
            artistName: 'ANNA',
            image: require('../images/pictures/anna.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 11,
            slug: 'gue',
            artistName: 'Guè',
            image: require('../images/pictures/gue.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 12,
            slug: 'marracash',
            artistName: 'Marracash',
            image: require('../images/pictures/marracash.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 13,
            slug: 'sfera-ebbasta',
            artistName: 'Sfera Ebbasta',
            image: require('../images/pictures/sfera-ebbasta.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 3,
            highlight: true,
            verified: true,
        },{
            id: 14,
            slug: 'coma-cose',
            artistName: 'Coma_cose',
            image: require('../images/pictures/coma_cose.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 15,
            slug: 'salmo',
            artistName: 'Salmo',
            image: require('../images/pictures/salmo.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 16,
            slug: 'mara-sattei',
            artistName: 'Mara Sattei',
            image: require('../images/pictures/mara-sattei.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 17,
            slug: 'don-pero',
            artistName: 'Don Pero',
            image: require('../images/pictures/don-pero.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 18,
            slug: 'olly',
            artistName: 'Olly',
            image: require('../images/pictures/olly.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 19,
            slug: 'venerus',
            artistName: 'Venerus',
            image: require('../images/pictures/venerus.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 20,
            slug: 'nitro',
            artistName: 'Nitro',
            image: require('../images/pictures/nitro.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 21,
            slug: 'maneskin',
            artistName: 'Maneskin',
            image: require('../images/pictures/maneskin.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 22,
            slug: 'gionny-scandal',
            artistName: 'GionnyScandal',
            image: require('../images/pictures/gionny-scandal.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 23,
            slug: 'sadturs',
            artistName: 'Sadturs',
            image: require('../images/pictures/sadturs.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 24,
            slug: 'rose-villain',
            artistName: 'Rose Villain',
            image: require('../images/pictures/rose-villain.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 25,
            slug: 'mace',
            artistName: 'MACE',
            image: require('../images/pictures/mace.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 26,
            slug: 'ghali',
            artistName: 'Ghali',
            image: require('../images/pictures/ghali.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 27,
            slug: 'kid-yugi',
            artistName: 'Kid Yugi',
            image: require('../images/pictures/kid-yugi.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 28,
            slug: 'drefgold',
            artistName: 'DrefGold',
            image: require('../images/pictures/drefgold.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 2,
            highlight: false,
            verified: true,
        },{
            id: 29,
            slug: 'miles',
            artistName: 'MILES',
            image: require('../images/pictures/miles.jpeg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: true,
        },{
            id: 30,
            slug: 'billie-eilish',
            artistName: 'Billie Eilish',
            image: require('../images/pictures/billie_eilish.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 31,
            slug: '21-savage',
            artistName: '21 Savage',
            image: require('../images/pictures/21_savage.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 32,
            slug: 'future',
            artistName: 'Future',
            image: require('../images/pictures/future.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 33,
            slug: 'travis-scott',
            artistName: 'Travis Scott',
            image: require('../images/pictures/travis_scott.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 34,
            slug: 'nirvana',
            artistName: 'Nirvana',
            image: require('../images/pictures/nirvana.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 35,
            slug: 'stray-kids',
            artistName: 'Stray Kids',
            image: require('../images/pictures/stray_kids.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 36,
            slug: 'eminem',
            artistName: 'Eminem',
            image: require('../images/pictures/eminem.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        },{
            id: 37,
            slug: 'laura-pausini',
            artistName: 'Laura Pausini',
            image: require('../images/pictures/laura_pausini.jpg'),
            flashLeaderboard: {
                status: undefined,
            },
            importance: 1,
            highlight: false,
            verified: false,
        }
    ])

    return (
        <ArtistsContext.Provider value={{ artists, setArtists }}>
            {children}
        </ArtistsContext.Provider>
    )
}