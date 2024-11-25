import { useState, createContext } from 'react'

export const LiveQuizContext = createContext()

export const LiveQuizProvider = ({ children }) => {

    const [quizzes, setQuizzes] = useState([

        {
            quizId: 1,
            artistId: 1,
            artistSlug: 'lazza',
            artistName: 'Lazza',
            playDate: '2024-11-25 00:00:00',
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
            playDate: '2024-11-25 00:00:00',
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
            playDate: '2024-11-25 00:00:00',
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
            playDate: '2024-11-25 00:00:00',
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
            playDate: '2024-11-25 00:00:00',
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
        },{
            quizId: 6,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-24 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "oh 90d - feat. Nayt",
                   firstLine: 'La mia ex, que-que-quella pazza vera',
                   secondLine: 'Ma non so come dirle "Oh no, no, no, no',
                   correctResponse: 'Dice che vorrebbe tornare e fare la seria'
               }
            ],
            responses: []
        },{
            quizId: 7,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-23 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "gua10 - feat. Lazza",
                   firstLine: 'Op-ops, che guaio, occhio al dettaglio',
                   secondLine: 'Amerei la città',
                   correctResponse: 'Sono il solo, il solo a notarlo'
               }
            ],
            responses: []
        },{
            quizId: 8,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-01-01 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "mar+e",
                   firstLine: 'Lady non far come tutte le altre',
                   secondLine: 'Questo tiro aspetto atterri su Marte',
                   correctResponse: 'Non starò mai al posto del passeggero'
               }
            ],
            responses: []
        },{
            quizId: 9,
            artistId: 5,
            artistSlug: 'astro',
            artistName: 'Astro',
            playDate: '2024-09-22 00:00:00',
            image: require('../images/pictures/astro.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'SPENDERE (feat. Simba La Rue)',
                   firstLine: 'Voce del verbo spendere, spendere',
                   secondLine: 'Spendere, spendere, spendere, spendere',
                   correctResponse: 'Spendere, spendere, spendere (Spendere)'
               }
            ],
            responses: []
        },{
            quizId: 10,
            artistId: 5,
            artistSlug: 'astro',
            artistName: 'Astro',
            playDate: '2024-11-23 00:00:00',
            image: require('../images/pictures/astro.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'non BASTA',
                   firstLine: 'Non basta',
                   secondLine: 'Faccio finta di niente non passa',
                   correctResponse: 'Dirmi quelle parole non basta'
               }
            ],
            responses: []
        },{
            quizId: 11,
            artistId: 3,
            artistSlug: 'artie-5ive',
            artistName: 'Artie 5ive',
            playDate: '2024-11-21 00:00:00',
            image: require('../images/pictures/artie-5ive.jpeg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'ANELLI E COLLANE (feat. ANNA)',
                   firstLine: 'Non sono morto ai diciassette',
                   secondLine: "Fotto solamente con le baddie, metto roba trendy",
                   correctResponse: 'muoio ai ventisette'
               }
            ],
            responses: []
        },{
            quizId: 12,
            artistId: 3,
            artistSlug: 'artie-5ive',
            artistName: 'Artie 5ive',
            playDate: '2024-10-24 00:00:00',
            image: require('../images/pictures/artie-5ive.jpeg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: 'ALBV',
                   firstLine: 'Aspetto la bella vita (La bella vita) (Ah)',
                   secondLine: "E, se non twerka, non può esser la mia tipa (Oh no)",
                   correctResponse: 'Seduto su una panchina'
               }
            ],
            responses: []
        },{
            quizId: 13,
            artistId: 1,
            artistSlug: 'lazza',
            artistName: 'Lazza',
            playDate: '2024-11-23 00:00:00',
             image: require('../images/pictures/lazza.jpeg'),
             songChunks: [
                {
                   chunkId: 1,
                   songName: 'CENERE',
                   firstLine: 'Aiutami a sparire come cenere',
                   secondLine: 'Nel buio balli da sola',
                   correctResponse: 'Mi sento un nodo alla gola',
                },
             ],
             responses: []
         },{
            quizId: 14,
            artistId: 1,
            artistSlug: 'lazza',
            artistName: 'Lazza',
            playDate: '2024-11-21 00:00:00',
             image: require('../images/pictures/lazza.jpeg'),
             songChunks: [
                {
                   chunkId: 1,
                   songName: 'Morto Mai',
                   firstLine: 'Piuttosto che la tua luce riflessa al buio',
                   secondLine: 'Quando sei qualcuno, urlano: "71"',
                   correctResponse: "E' un broblema mio di quanto e se fatturo",
                },
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