import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'

import { LiveQuizContext } from '../contexts/live-quiz.context'

import ContainerDefault from '../layout/container-default.layout'


import IconArrowLeft from '../images/icons/icon-arrowleft.svg'

const LiveQuizRoute = () => {

    const location = useLocation()
    const { id } = location.state || {}

    const { quizzes } = useContext(LiveQuizContext)
    const navigate = useNavigate()

    const quiz = quizzes.find(quiz => quiz.quizId === id)

    const playClick = () => {
        navigate('/quiz-play', { state: { id } })
    }
    return (
        <>
            <nav id='transparent-nav' className='top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-max top-0'>
                <div className='container d-flex-row align-items-center j-c-space-between'>
                    <div>
                        <div className='avatar-28'>
                            <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='BACK' onClick={() => navigate(-1)} />
                        </div>
                    </div>
                </div>
            </nav>
            <header className='position-relative h-xs-20'>
                {quiz && <img className='w-100 h-inherit object-fit-cover' src={quiz.image} alt={quiz.artistName} />}
            </header>        
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-4'}>
                <h4 className='fsize-xs-8 f-w-500 letter-spacing-1 mb-xs-4 t-align-center w-80 m-auto'>
                    Vinci il quiz, guadagna punti!
                </h4>
                <div className='mt-xs-4'>
                    <article className='w-75 m-auto'>
                        <div className='h-56px w-100 bg-dark-gradient-2 border-radius-08'></div>
                        <div className='d-flex-column gap-0_5em mb-xs-4 mt-xs-4'>
                           <div className='h-10px w-80 bg-gold-linear-gradient'></div> 
                           <div className='h-10px w-70 bg-gold-linear-gradient'></div>
                           <div className='h-10px w-90 bg-gold-linear-gradient'></div>
                        </div>
                        <div className='h-56px w-100 bg-dark-gradient-2 border-radius-08'></div>
                    </article>
                    <p className='fsize-xs-3 grey-200 t-align-center mt-xs-4'>
                        Hai 60 secondi per scrivere
                        <span style={{ margin: '0 2px' }}></span>
                        <strong className='bg-gold-linear-gradient black pr-xs-2 pl-xs-2'>golden line</strong>
                        , la strofa mancante della canzone. Fai fino a 5 punti nella classifica di {quiz.artistName} in base a quanto la strofa è corretta!
                    </p>
                    <button id='start-button' className='fsize-xs-2 mt-xs-4 mb-xs-4 bg-acid-lime dark-900 f-w-600' onClick={playClick}>
                        Fai partire il timer e gioca
                    </button>
                </div>
            </ContainerDefault>

        </>
    )
}

export default LiveQuizRoute