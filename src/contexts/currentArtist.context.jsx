import { useState, createContext } from 'react'

export const CurrentArtistContext = createContext()

export const CurrentArtistProvider = ({ children }) => {

    const [currentArtist, setCurrentArtist] = useState({
        id: 2,
        type: 'ARTIST',
        slug: 'thasup',
        artistName: 'thasup',
        email: 'thasup.midly@gmail.com',
        image: require('../images/pictures/thasup.jpg'),
        hasFlashLeadeboard: 'ONGOING',
        lastMonthRevenue: 1000,
        lastMonthSubs: 200,
        currentMonthRevenue: 600,
        currentMonthSubs: 133,
        revenueOverTime: [
            {
                id: 1,
                dataSet: [
                    {date:'2024-07-31', value: 600},
                    {date:'2024-08-31', value: 980},
                    {date:'2024-09-31', value: 1200},
                    {date:'2024-10-31', value: 2200},
                ]
            }
        ],
        subsOverTime: [
            {
                id: 1,
                dataSet: [
                    {date:'2024-07-31', value: 0},
                    {date:'2024-08-31', value: 33},
                    {date:'2024-09-31', value: 100},
                    {date:'2024-10-31', value: 220},
                ]
            }
        ]

    })

    return (
        <CurrentArtistContext.Provider value={{ currentArtist, setCurrentArtist }}>
            {children}
        </CurrentArtistContext.Provider>
    )
}