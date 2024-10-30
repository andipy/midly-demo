import { useState, createContext } from 'react'

export const LiveQuizContext = createContext()

export const LiveQuizProvider = ({ children }) => {

    const [quizzes, setQuizzes] = useState([

        {
            quizId: '1',
            artistId: '1',
            artistSlug: 'lazza',
            artistName: 'Lazza',
             image: require('../images/pictures/lazza.jpeg'),
             songChunks: [
                {
                   chunkId: '1',
                   songName: 'BUIO DAVANTI',
                   firstLine: 'Tu non farmi sapere con chi sei stasera',
                   secondLine: 'Spezzerei le catene, pure l atmosfera',
                   correctResponse: 'Perchè non lo perdonerei',
                },
             ],
             responses: [
                {
                    userId: '1',
                    chunkId: '1',
                    response: 'perchè non lo perdonerei',
                    score: '5'
                }
             ],
             quizAlreadyPlayed: [
                {userID: 1}
             ]

         },{
            quizId: '2',
            artistId: '2',
            artistSlug: 'thasup',
            artistName: 'thasup',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: '1',
                   songName: "Dimmi che c'è",
                   firstLine: 'Dimmi che c è, cerco il motivo',
                   secondLine: 'Giuro a nessuno mai,mai,mai,mai',
                   correctResponse: 'Per cui sei sad, sai che non lo dirò'
               }
            ],
            responses: [
               {
                   
               }
            ],

            quizAlreadyPlayed: [
                
            ]

        }
        
            
    ])

    return (
        <LiveQuizContext.Provider value={{ quizzes, setQuizzes }}>
            {children}
        </LiveQuizContext.Provider>
    )
}