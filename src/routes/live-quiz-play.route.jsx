import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { LiveQuizContext } from '../contexts/live-quiz.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'

const LiveQuizPlayRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)

    const { quizzes, setQuizzes } = useContext(LiveQuizContext)

    const quiz = quizzes.find(quiz => quiz.quizId === id)
    const songChunk = quiz.songChunks.find(chunk => chunk.chunkId === '1')

    const [timeLeft, setTimeLeft] = useState(60)
    const [userAnswer, setUserAnswer] = useState('')

    const correctAnswer = songChunk.correctResponse

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer)
                    handleTimeout()
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleTimeout = () => {

        const newResponse = {
            userId: currentFan.id, 
            chunkId: songChunk.chunkId,
            response: '',
            score: 0
        }

        const updatedQuizzes = quizzes.map(q => {
            if (q.quizId === id) {
                return {
                    ...q,
                    responses: [...q.responses, newResponse],
                }
            }
            return q
        })

        setQuizzes(updatedQuizzes)
        navigate(`/quiz-result`, { state: { id } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const points = calculateScore(correctAnswer, userAnswer)

        const newResponse = {
            userId: currentFan.id, 
            chunkId: songChunk.chunkId,
            response: userAnswer,
            score: points
        }

        const updatedQuizzes = quizzes.map(q => {
            if (q.quizId === id) {
                return {
                    ...q,
                    responses: [...q.responses, newResponse],
                }
            }
            return q
        })

        setQuizzes(updatedQuizzes)
        navigate(`/quiz-result`, { state: { id } })
    }

    /* DA RIVEDERE ALGORITMO */
    const levenshtein = (a, b) => {
        const matrix = []
    
        // Initialize the matrix
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i]
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j
        }
    
        // Populate the matrix
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1) // deletion
                    )
                }
            }
        }
    
        return matrix[b.length][a.length]
    }
    
    const calculateScore = (correctAnswer, userAnswer) => {
        const processedCorrectAnswer = correctAnswer.toLowerCase().replace(/[.,!?]/g, '').trim()
        const processedUserAnswer = userAnswer.toLowerCase().replace(/[.,!?]/g, '').trim()
    
        // 1. Calcola la distanza di Levenshtein
        const distance = levenshtein(processedCorrectAnswer, processedUserAnswer)
        const maxLength = Math.max(processedCorrectAnswer.length, processedUserAnswer.length)
    
        // 2. Calcola un punteggio di similarità
        const similarity = 1 - (distance / maxLength) // valore tra 0 e 1
    
        // 3. Conteggio delle parole corrette
        const correctWords = processedCorrectAnswer.split(' ')
        const userWords = processedUserAnswer.split(' ')
    
        const correctWordCount = correctWords.reduce((count, word) => {
            return count + (userWords.includes(word) ? 1 : 0)
        }, 0)
    
        // 4. Calcolo finale del punteggio
        let score = Math.round(similarity * 5) + Math.round((correctWordCount / correctWords.length) * 5)
        score = Math.min(5, Math.max(0, score)) // Assicurati che il punteggio sia tra 0 e 5
    
        return score
    }
    
    return (
        <>
            <header className='position-relative h-xs-10'>
                <img className='w-100 h-inherit object-fit-cover' src={quiz.image} alt='image'></img>
            </header>
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-4'}>
                <div className='d-flex-row align-items-center mt-xs-4 gap-0_5em '>
                    <span className='fsize-xs-3 pt-xs-2 pb-xs-2 align-self-start grey-300'>
                        {quiz.artistName}
                    </span>
                    <span className='fsize-xs-3 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2 border-radius-100 bg-dark-gradient gold align-self-start'>
                        {songChunk.songName}
                    </span>
                </div>
                <p className='t-align-center lime-400 mt-xs-10 mb-xs-10'>{timeLeft} secondi rimanenti</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='fsize-xs-6'>{songChunk.firstLine}</p>
                        <hr className=' bg-white white mt-xs-4 mb-xs-4'>

                        </hr>
                        <p className='fsize-xs-6'>{songChunk.secondLine}</p>
                        <textarea className='bg-dark-soft white letter-spacing-1 border-radius-04 mt-xs-4 fsize-xs-3' rows='4' placeholder='Scrivi il verso mancante' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}></textarea>
                    </div>
                    <button className='bg-acid-lime black font-body mt-xs-6' type='submit'>
                        <span className='fsize-xs-2 f-w-500'>Invia la risposta</span>
                    </button>
                </form>
            </ContainerDefault>
        </>
    )
}

export default LiveQuizPlayRoute