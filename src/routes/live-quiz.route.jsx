import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useContext, useEffect, useState, useRef } from 'react'

import { LiveQuizContext } from '../contexts/live-quiz.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { LeaderboardsContext } from '../contexts/leaderboards.context'

import Container from '../layout/container.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'

import ProgressCountdown from '../components/progress-countdown.component'
import NavbarMultistep from '../components/navbar-multistep.component'
import AudioPlayer from '../components/audio-player.component'
import Button from '../components/button.component'

const LiveQuizRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { id } = location.state || {}
    const { currentFan } = useContext(CurrentFanContext)
    const { quizzes, setQuizzes } = useContext(LiveQuizContext)
    const { leaderboards, setLeaderboards } = useContext(LeaderboardsContext)

    const quiz = quizzes.find(quiz => quiz.id === id)
    const songChunk = quiz.songChunks.find(chunk => chunk.chunkId === 1)
    const correctAnswer = songChunk.correctResponse

    const [timeLeft, setTimeLeft] = useState(60)
    const [userAnswer, setUserAnswer] = useState('')
    const [userIsPlaying, setUserIsPlaying] = useState(false)

    const userAnswerRef = useRef('')

    useEffect(() => {
        userAnswerRef.current = userAnswer;
    }, [userAnswer])


    const playClick = () => {
        setUserIsPlaying(true)
    }

    useEffect(() => {
        if ( userIsPlaying ) {
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
        }
    }, [userIsPlaying])

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
        const playDate = new Date(quiz.playDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const currentUserAnswer = userAnswerRef.current
        if(playDate.getTime() === today.getTime()) {
            const points = calculateScore(correctAnswer, currentUserAnswer)
            updateLeaderboards(points)
            updateQuizzes(points)
                
            navigate(`/quiz-result`, { state: { id } })
        } else {
            const points = calculateScore(correctAnswer, currentUserAnswer)
            updateQuizzes(points)
            navigate(`/quiz-result`, { state: { id } })
        } 

        
        
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
            {!userIsPlaying && 
                <NavbarMultistep stepNumber={1} dismissable={true} transparent={true} />
            }

            <Container style='pt-xs-topbar position-relative z-index-4'>
                <div className='d-flex-row align-items-center gap-0_5em'>
                    <img src={quiz.image} className='avatar-64 border-radius-100 shadow-dark-400' />
                    <span className='fsize-xs-4 f-w-500 white'>thasup</span>
                </div>
            </Container>

            <FullPageCenter className='z-index-4 d-flex-column j-center align-items-center'>
                <Container style={'z-index-4'}>      
                    <div className={`d-flex-row align-items-center mb-xs-4 gap-0_5em j-c-space-between mb-xs-4 transition-1s ${userIsPlaying ? '' : 'blur-5'}`}>
                        <span className={`fsize-xs-5 f-w-600 transition-1s ${userIsPlaying ? '' : 'blur-5'}`}>{songChunk.songName}</span>
                        {quiz.instrumental ? (
                            <AudioPlayer
                            src={quiz?.instrumental}
                            startTime={quiz?.startTime}
                            userIsPlaying={userIsPlaying}
                            />
                        ):('')}
                        
                    </div>

                    <div className='d-flex-column align-items-start gap-0_25em'>
                        <p className={`fsize-xs-7 f-w-400 line-height-125 transition-1s ${userIsPlaying ? '' : 'blur-5'}`}>{songChunk.firstLine}</p>

                        <div className='w-100 h-xs-15 position-relative'>
                            {!userIsPlaying &&
                                <div className='d-flex-row align-items-center j-c-center t-align-center w-100 h-inherit position-absolute-x top-0 z-index-5 bg-dark-soft border-radius-06'>
                                    <p className='w-85 f-w-500'>Hai 60 secondi per scrivere il verso mancante: fai partire il timer e scopri la canzone da completare</p>
                                </div>
                            }
                            <textarea
                                className={`bg-dark-soft white border-radius-06 fsize-xs-5 h-inherit transition-1s ${userIsPlaying ? '' : 'blur-5'}`}
                                placeholder={'Scrivi qui il verso mancante'}
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={!userIsPlaying}
                            ></textarea>
                        </div>

                        <p className={`fsize-xs-7 f-w-400 line-height-125 transition-1s ${userIsPlaying ? '' : 'blur-5'}`}>{songChunk.secondLine}</p>
                    </div>
                        
                </Container>
            </FullPageCenter>

            <Container style='position-absolute-x bottom-2 z-index-4'>
                {/* <p className='t-align-center lime-400 mb-xs-4'>{timer > 0 ? `${timer} secondi rimanenti` : 'Tempo scaduto'}</p> */}
                <p className='fsize-xs-9 f-w-500 t-align-center white mb-xs-0'>{userIsPlaying ? timeLeft : '60'}</p>
                <ProgressCountdown points={userIsPlaying ? timeLeft : 60} max={60} />
                {!userIsPlaying &&
                    <Button
                        style='bg-acid-lime dark-900 f-w-600 fsize-xs-3 mt-xs-4'
                        label='Fai partire il timer e gioca'
                        onClick={playClick}
                    />
                }
                {userIsPlaying &&
                    <Button
                        style='bg-acid-lime dark-900 f-w-600 fsize-xs-3 mt-xs-4'
                        label='Invia la risposta'
                        onClick={handleSubmit}
                    />
                }
            </Container>

            <FullPageCenter className={`z-index-3 bg-blur transition-1s ${userIsPlaying ? 'bg-black-transp75' : 'bg-black-transp40'}`} />

            <FullPageCenter className='z-index-1 '>
                 <img className={`w-inherit h-inherit object-fit-cover transition-1s ${userIsPlaying ? 'h-min-100' : 'h-min-130'}`} src={quiz.image} alt='' />
            </FullPageCenter>
        </>
    )
}

export default LiveQuizRoute