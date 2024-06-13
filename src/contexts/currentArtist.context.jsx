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
        hasFanclub: false
    })

    return (
        <CurrentArtistContext.Provider value={{ currentArtist, setCurrentArtist }}>
            {children}
        </CurrentArtistContext.Provider>
    )
}