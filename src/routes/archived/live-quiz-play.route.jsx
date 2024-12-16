import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { LiveQuizContext } from '../../contexts/live-quiz.context'
import { CurrentFanContext } from '../../contexts/currentFan.context'
import { LeaderboardsContext } from '../../contexts/leaderboards.context'

import ContainerDefault from '../../layout/container-default.layout'
import AudioPlayer from '../../components/audio-player.component'
import NavbarMultistep from '../../components/navbar-multistep.component'
import FullPageCenter from '../../layout/full-page-center.layout'
import ProgressCountdown from '../../components/progress-countdown.component'

const LiveQuizPlayRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const { leaderboards, setLeaderboards } = useContext(LeaderboardsContext)

    const { quizzes, setQuizzes } = useContext(LiveQuizContext)

    const quiz = quizzes.find(quiz => quiz.id === id)
    const songChunk = quiz.songChunks.find(chunk => chunk.chunkId === 1)

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

    const updateLeaderboards = (points) => {
        const updatedLeaderboards = leaderboards.map(leaderboard => {
            if (leaderboard.artistId === quiz.artistId) {
                const updatedLeaderboard = leaderboard.leaderboard.map(user => {
                    if (user.userId === currentFan.id) {
                        return {
                            ...user,
                            points: user.points + points 
                        }
                    }
                    return user
                })
        
                return {
                    ...leaderboard,
                    leaderboard: updatedLeaderboard
                }
            }
            return leaderboard
        })        
        setLeaderboards(updatedLeaderboards)
    }

    const updateQuizzes = (points) => {
        const newResponse = {
            userId: currentFan.id, 
            chunkId: songChunk.chunkId,
            response: userAnswer,
            score: points
        }

        const updatedQuizzes = quizzes.map(q => {
            if (q.id === id) {
                return {
                    ...q,
                    responses: [...q.responses, newResponse],
                }
            }
            return q
        })
        setQuizzes(updatedQuizzes)
    }

    const handleTimeout = () => {
        updateQuizzes(0)
        navigate(`/quiz-result`, { state: { id } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const playDate = new Date(quiz.playDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if(playDate.getTime() === today.getTime()) {
            const points = calculateScore(correctAnswer, userAnswer)
            //aggiungi anche punteggio
            updateLeaderboards(points)
            //aggiungi response
            updateQuizzes(points)
            
            navigate(`/quiz-result`, { state: { id } })
        } else {
            const points = calculateScore(correctAnswer, userAnswer)
            //aggiungi solo response
            updateQuizzes(points)
            navigate(`/quiz-result`, { state: { id } })
        } 
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
                    matrix[i][j] = matrix[i - 1][j - 1]
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
        <>
            <ContainerDefault style='pt-xs-topbar position-relative z-index-4'>
                <div className='d-flex-row align-items-center'>
                    <img src={quiz.image} className='avatar-36 border-radius-100' />
                    <span className='fsize-xs-3  ml-xs-2 white'>thasup</span>
                </div>
            </ContainerDefault>

            <FullPageCenter className='z-index-4 d-flex-column j-center align-items-center'>
                <ContainerDefault style={'z-index-999'}>      
                    <div className='d-flex-row align-items-center mt-xs-4 gap-0_5em j-c-space-between mb-xs-4'>
                        <span className='fsize-xs-5 f-w-600 '>{songChunk.songName}</span>
                        <AudioPlayer src={quiz?.instrumental} startTime={quiz?.startTime} />
                    </div>

                    <div className='d-flex-column align-items-center'>
                        <p className='fsize-xs-6 f-w-600 '>{songChunk.firstLine}</p>

                        <div className='w-100'>
                            <textarea className='bg-dark-gradient white border-radius-08 d-flex-column justify-content-center align-items-center w-100' rows='3' placeholder='Scrivi il verso mancante' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}></textarea>
                        </div>
                        <p className='fsize-xs-6 f-w-600 '>{songChunk.secondLine}</p>
                    </div>
                        
                </ContainerDefault>
            </FullPageCenter>

            <ContainerDefault style='position-absolute-x bottom-5 z-index-4'>
                {/* <p className='t-align-center lime-400 mb-xs-4'>{timer > 0 ? `${timer} secondi rimanenti` : 'Tempo scaduto'}</p> */}
                <p className='fsize-xs-5 f-w-500 t-align-center white mb-xs-0'>{timeLeft} secondi rimanenti</p>
                <ProgressCountdown points={timeLeft} max={60} />
                <button id='start-button' className='fsize-xs-2 mt-xs-4 mb-xs-4 bg-acid-lime dark-900 f-w-600' onClick={handleSubmit}>
                    Invia la risposta
                </button>
            </ContainerDefault>
            <FullPageCenter className='z-index-3 bg-black-transp50 bg-blur' />
            

            <FullPageCenter className='z-index-1 '>
                 <img className='w-inherit h-inherit object-fit-cover' src={quiz.image} alt='' />
            </FullPageCenter>
        </>  
            
            
        </>
    )
}

export default LiveQuizPlayRoute