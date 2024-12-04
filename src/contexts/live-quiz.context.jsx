import { useState, createContext } from 'react'

export const LiveQuizContext = createContext()

export const LiveQuizProvider = ({ children }) => {

    const [quizzes, setQuizzes] = useState([

        {
            id: 1,
            artistId: 1,
            artistSlug: 'lazza',
            artistName: 'Lazza',
            playDate: '2024-11-26 00:00:00',
            nstrumental: require('../assets/audio/live-quiz/buio-davanti-lazza-instrum.mp3'),
            originalAudio: require('../assets/audio/live-quiz/buio-davanti-lazza-vox.mp3'),
            startTime: 45,
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
            id: 2,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-12-04 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            instrumental: require('../assets/audio/live-quiz/dimmi-che-ce-thasup-instrum.mp3'),
            originalAudio: require('../assets/audio/live-quiz/dimmi-che-ce-thasup-vox.mp3'),
            startTime: 48,
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
            id: 3,
            artistId: 3,
            artistSlug: 'artie-5ive',
            artistName: 'Artie 5ive',
            playDate: '2024-11-26 00:00:00',
            instrumental: require('../assets/audio/live-quiz/milano-testarossa-artie-5ive-instrum.mp3'),
            originalAudio: require('../assets/audio/live-quiz/milano-testarossa-artie-5ive-vox.mp3'),
            startTime: 42,
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
            id: 4,
            artistId: 4,
            artistSlug: 'suspect-cb',
            artistName: 'Suspect CB',
            playDate: '2024-11-26 00:00:00',
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
            id: 5,
            artistId: 5,
            artistSlug: 'astro',
            artistName: 'Astro',
            playDate: '2024-11-26 00:00:00',
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
            id: 6,
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
            id: 7,
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
            id: 8,
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
            id: 9,
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
            id: 10,
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
            id: 11,
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
            id: 12,
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
            id: 13,
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
            id: 14,
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
        },{
            id: 15,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-27 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "Offline (feat. bbno$)",
                   firstLine: 'Dovrei',
                   secondLine: 'Dimmi perché sempre te, che non sei dei miei',
                   correctResponse: 'Con la mia mente veramente staccare e andare offline'
               }
            ],
            responses: []
        },{
            id: 16,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-28 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "come fa1",
                   firstLine: 'Eh-ehi, okay, non è okay',
                   secondLine: 'Yeah, eh-ehi, no fake, non ho fake tra gli amici, yah',
                   correctResponse: 'Voglio stare calmo, ma no, no, non ho spazio qua'
               }
            ],
            responses: []
        },{
            id: 17,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-30 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "2ollipop",
                   firstLine: "Lollipop, sono un po' fatto coi miei bruh",
                   secondLine: 'Per ignorarvi faccio "Ooh, ooh"',
                   correctResponse: 'Fate "flex", "gang", "yo", già che ci stai caccia uno "skrrt"'
               }
            ],
            responses: []
        },{
            id: 18,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-11-30 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "fuck 3x",
                   firstLine: 'È perché voglio il dollar, dollar, dollar',
                   secondLine: 'Vado in France, e rubo il posto al pilota',
                   correctResponse: "E col cash, girarci tutta l'Europa"
               }
            ],
            responses: []
        },{
            id: 19,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-12-05 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "scuol4",
                   firstLine: 'Bro, ma aspetta un istante',
                   secondLine: 'Per essere tuo amico devo vestirmi così?',
                   correctResponse: 'Ma di cosa stai parlando?'
               }
            ],
            responses: []
        },{
            id: 20,
            artistId: 2,
            artistSlug: 'thasup',
            artistName: 'thasup',
            playDate: '2024-12-03 00:00:00',
            image: require('../images/pictures/thasup.jpg'),
            songChunks: [
               {
                   chunkId: 1,
                   songName: "LeanTro",
                   firstLine: 'Se sono lo stesso, non è grazie a bitch (grazie a bitch)',
                   secondLine: "Mi parlano di sesso, ma hanno l'aspetto chic",
                   correctResponse: 'Questa è una bro persa, valla a capì (valla a capì)'
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