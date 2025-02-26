import { useState, createContext } from 'react'

export const LeaderboardsContext = createContext()

export const LeaderboardsProvider = ({ children }) => {

    const [leaderboards, setLeaderboards] = useState([
        {
            id: 1,
            artistId: 'artist1',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 722,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 3008,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 2,
            artistId: 'artist2',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 333,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 1983,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2567,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 2990,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 2106,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 766,
                    // position: 9
                }           
            ]
        },{
            id: 3,
            artistId: 'artist3',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 100,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 4,
            artistId: 'artist4',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 5,
            artistId: 'artist5',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 6,
            artistId: 'artist6',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 7,
            artistId: 'artist7',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 8,
            artistId: 'artist8',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 9,
            artistId: 'artist9',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 10,
            artistId: 'artist10',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 722,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 11,
            artistId: 'artist11',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 12,
            artistId: 'artist12',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 13,
            artistId: 'artist13',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 14,
            artistId: 'artist14',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 15,
            artistId: 'artist15',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 16,
            artistId: 'artist16',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 17,
            artistId: 'artist17',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 18,
            artistId: 'artist18',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 19,
            artistId: 'artist19',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 20,
            artistId: 'artist20',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 1766,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 21,
            artistId: 'artist21',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 22,
            artistId: 'artist22',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 23,
            artistId: 'artist23',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 24,
            artistId: 'artist24',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 25,
            artistId: 'artist25',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 26,
            artistId: 'artist26',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 27,
            artistId: 'artist27',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 28,
            artistId: 'artist28',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 29,
            artistId: 'artist29',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 30,
            artistId: 'artist30',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 31,
            artistId: 'artist31',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 32,
            artistId: 'artist32',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 33,
            artistId: 'artist33',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 34,
            artistId: 'artist34',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 35,
            artistId: 'artist35',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 36,
            artistId: 'artist36',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 37,
            artistId: 'artist37',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 38,
            artistId: 'artist38',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 39,
            artistId: 'artist39',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 40,
            artistId: 'artist40',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 41,
            artistId: 'artist41',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 42,
            artistId: 'artist42',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 43,
            artistId: 'artist43',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        },{
            id: 44,
            artistId: 'artist44',
            leaderboard: [
                {
                    userId: 2,
                    image: require('../images/pictures/ai_01.png'),
                    username: 'chiara',
                    points: 3689,
                    // position: 1
                },{
                    userId: 1,
                    image: require('../images/pictures/current-fan.jpg'),
                    username: 'imtheKING',
                    points: 2237,
                    // position: 2
                },{
                    userId: 6,
                    image: require('../images/pictures/ai_03.png'),
                    username: 'Giulietta',
                    points: 2907,
                    // position: 3
                },{
                    userId: 5,
                    image: require('../images/pictures/ai_04.png'),
                    username: 'ginger04',
                    points: 1984,
                    // position: 4
                },{
                    userId: 4,
                    image: require('../images/pictures/ai_05.png'),
                    username: 'marco_09',
                    points: 1888,
                    // position: 5
                },{
                    userId: 9,
                    image: require('../images/pictures/ai_06.png'),
                    username: 'francesca.david',
                    points: 1467,
                    // position: 6
                },{
                    userId: 8,
                    image: require('../images/pictures/ai_07.png'),
                    username: 'davide00',
                    points: 1107,
                    // position: 7
                },{
                    userId: 3,
                    image: require('../images/pictures/ai_08.png'),
                    username: 'bob16',
                    points: 467,
                    // position: 8
                },{
                    userId: 7,
                    image: require('../images/pictures/ai_09.png'),
                    username: 'kevin.alfa.il.migliore',
                    points: 399,
                    // position: 9
                }
            ]
        }
    ])

    return (
        <LeaderboardsContext.Provider value={{ leaderboards, setLeaderboards }}>
            {children}
        </LeaderboardsContext.Provider>
    )
}