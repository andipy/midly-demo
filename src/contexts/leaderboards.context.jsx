import { useState, createContext } from 'react'

export const LeaderboardsContext = createContext()

export const LeaderboardsProvider = ({ children }) => {

    const [leaderboards, setLeaderboards] = useState([
        {
            id: 1,
            artistId: 1,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King @ciao',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 2,
            artistId: 2,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King @ciao',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Laww @yahoo.it',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'DannySnatchVitoSuperBeast@gmail.com',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'PollyLollyVeryLongUsername',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 3,
            artistId: 3,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 4,
            artistId: 4,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 5,
            artistId: 5,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 6,
            artistId: 6,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 7,
            artistId: 7,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 8,
            artistId: 8,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 9,
            artistId: 9,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 10,
            artistId: 10,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 11,
            artistId: 11,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 12,
            artistId: 12,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 13,
            artistId: 13,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 14,
            artistId: 14,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 15,
            artistId: 15,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 16,
            artistId: 16,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 17,
            artistId: 17,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 18,
            artistId: 18,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 19,
            artistId: 19,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 20,
            artistId: 20,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 21,
            artistId: 21,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 22,
            artistId: 22,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 23,
            artistId: 23,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 24,
            artistId: 24,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 25,
            artistId: 25,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 26,
            artistId: 26,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 27,
            artistId: 27,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 28,
            artistId: 28,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
                }
            ]
        },{
            id: 29,
            artistId: 29,
            leaderboard: [
                {
                    image: require('../images/pictures/fan-1.jpg'),
                    username: 'The King',
                    points: 3689,
                    position: 1
                },{
                    image: require('../images/pictures/fan-2.jpg'),
                    username: 'Big Law ::',
                    points: 3021,
                    position: 2
                },{
                    image: require('../images/pictures/fan-3.jpg'),
                    username: 'Lil kid __',
                    points: 2907,
                    position: 3
                },{
                    image: require('../images/pictures/fan-4.jpg'),
                    username: 'Danny Snatch',
                    points: 1984,
                    position: 4
                },{
                    image: require('../images/pictures/fan-5.jpg'),
                    username: 'Polly Lolly',
                    points: 1888,
                    position: 5
                },{
                    image: require('../images/pictures/fan-6.jpg'),
                    username: 'Kop Kalisti',
                    points: 1467,
                    position: 6
                },{
                    image: require('../images/pictures/fan-7.jpg'),
                    username: '_freak 3x_',
                    points: 1107,
                    position: 7
                },{
                    image: require('../images/pictures/fan-8.jpg'),
                    username: 'craft andG',
                    points: 467,
                    position: 8
                },{
                    image: require('../images/pictures/fan-9.jpg'),
                    username: 'kevin alfa',
                    points: 399,
                    position: 9
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