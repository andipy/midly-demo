import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { LiveQuizContext } from '../contexts/live-quiz.context'

import ContainerDefault from '../layout/container-default.layout'


import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import FullPageCenter from '../layout/full-page-center.layout'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import ProgressCountdown from '../components/progress-countdown.component'
import NavbarMultistep from '../components/navbar-multistep.component'
import { Link } from 'react-router-dom'
import Button from '../components/button.component'


const LiveQuizRoute = () => {

    const location = useLocation()
    const { id } = location.state || {}

    const { quizzes } = useContext(LiveQuizContext)
    const navigate = useNavigate()

    const quiz = quizzes.find(quiz => quiz.id === id)
    const songChunk = quiz.songChunks.find(chunk => chunk.chunkId === 1)

    const playClick = () => {
        navigate('/quiz-play', { state: { id } })
    }

    return (
        <>
            <>
            <NavbarMultistep stepNumber={1} dismissable={true} transparent={true} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar position-relative z-index-4'>
                <div className='d-flex-row align-items-center'>
                    <img src={quiz.image} className='avatar-36 border-radius-100' />
                    <span className='fsize-xs-3  ml-xs-2 white'>thasup</span>
                </div>
            </ContainerDefault>

            <FullPageCenter className='z-index-4 d-flex-column j-center align-items-center'>
                <ContainerDefault containerSpecificStyle={'z-index-999'}>      
                    <div className='d-flex-row align-items-center mt-xs-4 gap-0_5em'>
                        <span className='fsize-xs-5 mb-xs-4 f-w-600 blur-effect'>{songChunk.songName}</span>
                    </div>

                    <div className='d-flex-column align-items-center'>
                        <p className='fsize-xs-6 f-w-600 blur-effect'>{songChunk.firstLine}</p>

                        <div className='bg-dark-gradient border-radius-08 pb-xs-4 pt-xs-4 pl-xs-4 pr-xs-4 d-flex-column justify-content-center align-items-center w-100'>
                            <p className='t-align-center fsize-xs-2 f-w-300'>Hai 60 secondi per scrivere il verso mancante: fai partire il timer per scoprire la canzone da completare</p>
                        </div>
                        <p className='fsize-xs-6 f-w-600 blur-effect'>{songChunk.secondLine}</p>
                    </div>
                        
                </ContainerDefault>
            </FullPageCenter>

            <ContainerDefault containerSpecificStyle='position-absolute-x bottom-5 z-index-4'>
                {/* <p className='t-align-center lime-400 mb-xs-4'>{timer > 0 ? `${timer} secondi rimanenti` : 'Tempo scaduto'}</p> */}
                <p className='fsize-xs-5 f-w-500 t-align-center white mb-xs-0'>60</p>
                <ProgressCountdown points={60} max={60} />
                <button id='start-button' className='fsize-xs-2 mt-xs-4 mb-xs-4 bg-acid-lime dark-900 f-w-600' onClick={playClick}>
                    Fai partire il timer e gioca
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

export default LiveQuizRoute