import { useState, createContext } from 'react'

export const LiveQuizContext = createContext()

export const LiveQuizProvider = ({ children }) => {

    const [quizzes, setQuizzes] = useState([

        {
            quizId: 1,
            artistId: 1,
            artistSlug: 'lazza',
            artistName: 'Lazza',
             image: require('../images/pictures/lazza.jpeg'),
             songChunks: [
                {
                   chunkId: 1,
                   songName: 'BUIO DAVANTI',
                   firstLine: 'Tu non farmi sapere con chi sei stasera',
                   secondLine: 'Spezzerei le catene, pure l atmosfera',
                   correctResponse: 'Perchè non lo perdonerei',
                },
             ],
             responses: [
                {
                    userId: 1,
                    chunkId: 1,
                    response: 'perchè non lo perdonerei',
                    score: '5'
                }
             ]
         },{
            quizId: 2,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "Dimmi che c'è",
                   firstLine: 'Dimmi che c è, cerco il motivo',
                   secondLine: 'Giuro a nessuno mai,mai,mai,mai',
                   correctResponse: 'Per cui sei sad, sai che non lo dirò'
               }
            ],
            responses: []
        },{
            quizId: 3,
            artistId: 3,
            artistSlug: 'artie-5ive',
            artistName: 'Artie 5ive',
            image: require('../images/pictures/artie-5ive.jpeg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'MILANO TESTAROSSA',
                   firstLine: 'Giriamo a Milano con il vetro basso',
                   secondLine: "Vetro nero, è troppo brava giù, l'Urus la crasho (uh)",
                   correctResponse: 'Sedile passeggero, lei mi pompa il basso'
               }
            ],
            responses: []
        },{
            quizId: 4,
            artistId: 4,
            artistSlug: 'suspect-cb',
            artistName: 'Suspect CB',
            image: require('../images/pictures/suspect-cb.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "Cassetta di Sicurezza",
                   firstLine: 'Sono la vera capra perché sono di campagna',
                   secondLine: 'In etichetta mi hanno detto basta',
                   correctResponse: 'Mamma non prende il reddito di cittadinanza'
               }
            ],
            responses: []
        },{
            quizId: 5,
            artistId: 5,
            artistSlug: 'astro',
            artistName: 'Astro',
            image: require('../images/pictures/astro.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'PANINARO (feat. Tony Boy, Artie 5ive)',
                   firstLine: 'Palla di white in tasca, sembro un gelataio',
                   secondLine: 'Lei mi chiede come mi chiamo, le rispondo: "Carlo"',
                   correctResponse: 'Vorrebbero darci dei consigli, non possono farlo'
               }
            ],
            responses: []
        }
    ])

    return (
        <LiveQuizContext.Provider value={{ quizzes, setQuizzes }}>
            {children}
        </LiveQuizContext.Provider>
    )
}