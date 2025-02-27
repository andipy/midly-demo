import { useState, createContext } from 'react'

export const FansContext = createContext()

export const FansProvider = ({ children }) => {

    const [fans, setFans] = useState([
        {
            id: 1,
            image: require('../images/pictures/current-fan.jpg'),
            username: 'imtheKING',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist1'},
                {artistId: 'artist7'},
                {artistId: 'artist6'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist1',},
                {artistId: 'artist2'},
                {artistId: 'artist3'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 100,
        },{
            id: 2,
            image: require('../images/pictures/ai_01.png'),
            username: 'chiara',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist2'},
                {artistId: 'artist7'},
                {artistId: 'artist8'},
                {artistId: 'artist10'},
                {artistId: 'artist20'}
            ],
            followedArtists: [
                {artistId: 'artist6'},
                {artistId: 'artist2'},
                {artistId: 'artist8'},
                {artistId: 'artist20'},
            ],

            affinityWithCurrentUser: 10,
        },{
            id: 3,
            image: require('../images/pictures/ai_08.png'),
            username: 'bob16',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist7'},
                {artistId: 'artist15'},
                {artistId: 'artist6'},
                {artistId: 'artist10'},
                {artistId: 'artist12'}
            ],
            followedArtists: [
                {artistId: 'artist1'},
                {artistId: 'artist7'},
                {artistId: 'artist15'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [],
            affinityWithCurrentUser: 42,
        },{
            id: 4,
            image: require('../images/pictures/ai_05.png'),
            username: 'marco_09',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist1'},
                {artistId: 'artist20'},
                {artistId: 'artist6'},
                {artistId: 'artist21'},
                {artistId: 'artist22'}
            ],
            followedArtists: [
                {artistId: 'artist20'},
                {artistId: 'artist21'},
                {artistId: 'artist22'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 82,
        },{
            id: 5,
            image: require('../images/pictures/ai_04.png'),
            username: 'ginger04',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist1'},
                {artistId: 'artist13'},
                {artistId: 'artist6'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist1'},
                {artistId: 'artist2'},
                {artistId: 'artist13'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 57,
            
        },{
            id: 6,
            image: require('../images/pictures/ai_03.png'),
            username: 'Giulietta',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist2'},
                {artistId: 'artist16'},
                {artistId: 'artist15'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist15'},
                {artistId: 'artist2'},
                {artistId: 'artist3'},
                {artistId: 'artist16'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 98,
        },{
            id: 7,
            image: require('../images/pictures/ai_09.png'),
            username: 'kevin.alfa.il.migliore',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist6'},
                {artistId: 'artist7'},
                {artistId: 'artist9'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist1'},
                {artistId: 'artist9'},
                {artistId: 'artist10'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 100,
        },{
            id: 8,
            image: require('../images/pictures/ai_07.png'),
            username: 'davide00',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist18'},
                {artistId: 'artist19'},
                {artistId: 'artist20'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist18'},
                {artistId: 'artist19'},
                {artistId: 'artist3'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 36,
        },{
            id: 9,
            image: require('../images/pictures/ai_06.png'),
            username: 'francesca.david',
            mostListenedArtistsOnSpotify : [
                {artistId: 'artist1'},
                {artistId: 'artist7'},
                {artistId: 'artist6'},
                {artistId: 'artist10'},
                {artistId: 'artist11'}
            ],
            followedArtists: [
                {artistId: 'artist1'},
                {artistId: 'artist2'},
                {artistId: 'artist3'},
                {artistId: 'artist6'},
            ],
            subscribedArtists: [
                {artistId: 'artist13'},
            ],
            affinityWithCurrentUser: 48,
        }
    ])

    return (
        <FansContext.Provider value={{ fans, setFans }}>
            {children}
        </FansContext.Provider>
    )
}