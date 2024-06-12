import { useState, createContext } from "react"

export const ArtistsContext = createContext()

export const ArtistsProvider = ({ children }) => {

    const [artists, setArtists] = useState([
        {
            id: 1,
            slug: 'arctic-monkeys',
            artistName: 'Arctic Monkeys',
            image: require('../images/pictures/arcticmonkeys.jpg'),
            hasFlashLeadeboard: 'PENDING',
            invokedModal: false,
            currentUser: {
                points: 0,
                position: 8
            }
        },{
            id: 2,
            slug: 'thasup',
            artistName: 'thasup',
            image: require('../images/pictures/thasup.jpg'),
            hasFlashLeadeboard: 'ONGOING',
            invokedModal: false,
            currentUser: {
                points: 467,
                position: 8
            }
        }
    ])

    return (
        <ArtistsContext.Provider value={{ artists, setArtists }}>
            {children}
        </ArtistsContext.Provider>
    )
}