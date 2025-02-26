import { useState, createContext } from 'react'

export const CurrentArtistContext = createContext()

export const CurrentArtistProvider = ({ children }) => {

    const [currentArtist, setCurrentArtist] = useState({
        id: 'artist2',
        type: 'ARTIST',
        slug: 'thasup',
        artistName: 'thasup',
        email: 'thasup.midly@gmail.com',
        image: require('../images/pictures/thasup.jpg'),
        hasFlashLeadeboard: 'ONGOING',
        lastMonthRevenue: 12733.08,
        lastMonthSubs: 4244,
        currentMonthRevenue: 13768.01,
        currentMonthSubs: 5016,
        revenueOverTime: [
            {
                id: 1,
                dataSet: [
                    {date:'2024-07-31', value: 600},
                    {date:'2024-08-31', value: 980},
                    {date:'2024-09-30', value: 1200},
                    {date:'2024-10-31', value: 2200},
                ]
            }
        ],
        subsOverTime: [
            {
                id: 1,
                dataSet: [
                    {date:'2024-07-31', value: 0},
                    {date:'2024-08-31', value: 1000},
                    {date:'2024-09-30', value: 2368},
                    {date:'2024-10-31', value: 4244},
                ]
            }
        ],
        beneficiary: '',
        iban: ''
    })

    return (
        <CurrentArtistContext.Provider value={{ currentArtist, setCurrentArtist }}>
            {children}
        </CurrentArtistContext.Provider>
    )
}