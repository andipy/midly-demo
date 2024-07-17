import { useState, createContext } from 'react'

export const FanclubsContext = createContext()

export const FanclubsProvider = ({ children }) => {

    const [fanclubs, setFanclubs] = useState([
        {
            id: 1,
            artistId: 1,
            name: null,
            pricing: null,
            image: null,
            isActive: false,
            posts: []
        },{
            id: 2,
            artistId: 2,
            name: null,
            pricing: null,
            image: null,
            isActive: false,
            posts: []
        },{
            id: 3,
            artistId: 3,
            name: null,
            pricing: null,
            image: null,
            isActive: false,
            posts: []
        }
    ])

    return (
        <FanclubsContext.Provider value={{ fanclubs, setFanclubs }}>
            {children}
        </FanclubsContext.Provider>
    )
}