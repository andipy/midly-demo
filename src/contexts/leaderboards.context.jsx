import { useState, createContext } from 'react'

export const LeaderboardsContext = createContext()

export const LeaderboardsProvider = ({ children }) => {

    const [leaderboards, setLeaderboards] = useState([
        {
            id: 1,
            artistId: 1,
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
            artistId: 'a3p8',
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
            artistId: 3,
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
            artistId: 4,
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
            artistId: 5,
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
            artistId: 6,
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
            artistId: 7,
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
            artistId: 8,
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
            artistId: 9,
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
            artistId: 10,
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
            artistId: 11,
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
            artistId: 12,
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
            artistId: 'a2p1',
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
            artistId: 14,
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
            artistId: 15,
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
            artistId: 16,
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
            artistId: 17,
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
            artistId: 18,
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
            artistId: 19,
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
            artistId: 20,
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
            artistId: 21,
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
            artistId: 22,
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
            artistId: 23,
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
            artistId: 24,
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
            artistId: 25,
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
            artistId: 26,
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
            artistId: 27,
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
            artistId: 28,
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
            artistId: 29,
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
            artistId: 30,
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
            artistId: 31,
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
            artistId: 32,
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
            artistId: 33,
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
            artistId: 34,
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
            artistId: 35,
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
            artistId: 36,
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
            artistId: 37,
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