import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LiveQuizContext } from '../contexts/live-quiz.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'
import CardPassedQuiz from '../components/card-passed-quiz.component'
import ProgressBar from '../components/progress-bar-points.component'
import AudioPlayer from '../components/audio-player.component'
import CirclePoints from '../components/circle-points.component'
import FullPageCenter from '../layout/full-page-center.layout'

import IconPoints from '../images/icons/icon-points.svg'
import WidgetPassedQuiz from '../components/widget-passed-quiz.component'
const LiveQuizResultRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { id } = location.state || {}
    const { quizzes } = useContext(LiveQuizContext)
    const { currentFan } = useContext(CurrentFanContext)

    const quiz = quizzes.find(quiz => quiz.id === id)

    const userResponse = quiz.responses.find(response => response.userId === currentFan.id)

    const result = userResponse ? userResponse.score : 0

    const date = new Date(quiz.playDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    /* console.log(date)
    console.log(today) */

    const sortQuizzes = (a,b) => {
      const dateA = new Date(a.playDate)
      const dateB = new Date(b.playDate)
      return dateB - dateA
    }

    const orderedQuizzes = quizzes
    .filter(quiz2 => {
        const isArtistQuiz = quiz2.artistId === quiz.artistId
        const quizDate = new Date(quiz2.playDate)
        const isToday = quizDate < today 
        const hasPlayed = quiz2.responses.some(response => response.userId === currentFan.id)

        return isArtistQuiz && isToday && !hasPlayed
    })
    .sort((a, b) => sortQuizzes(a,b)) 

    const handleNextQuiz = (event) => {
      event.preventDefault()
      if (orderedQuizzes?.length > 0) {
        const nextQuiz = orderedQuizzes[0].id
        navigate('/quiz', { replace: true, state: { id: nextQuiz } })
      }
      
    }
    
    /* transizione */
    const [liveCounter, setLiveCounter] = useState(0)
    const [translation, setTranslation] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            if ( liveCounter < result ) {
                setLiveCounter(prev => prev + 1)
                setTranslation(prev => prev + 100)
            }
        }, 500)
    }, [liveCounter])


    /*Setting del messaggio e del title in base al result*/
    const [resultTitle, setResultTitle] = useState('')
    const [resultMessage, setResultMessage] = useState('')

    useEffect(() => {
      if (result === 0) {
        setResultTitle('Mmmmm...')
        setResultMessage('Ma hey, anche se hai fatto 0 punti, puoi provare la prossima volta, il gioco si ripete più volte la settimana!')
      } else if ( result <= 2) {
        setResultTitle("E' okay!")
        setResultMessage(`Puoi fare meglio, ma ${result} punti è comunque un risultato che ti permette di scalare la classifica!`)

      } else if ( result >= 3) {
        setResultTitle('Ben fatto')
        setResultMessage(`${result} punti in più per scalare la classifica di questo mese`)
      }
    }, [])

    /* button funct */
    const closeClick = () => {
      navigate('/your-favourites')
  }


  return (
    <>
      <ContainerDefault containerSpecificStyle={'pb-xs-appbar z-index-4  position-relative'}>
        
        <div className="d-flex-column align-items-center j-c-center mt-xs-50">
        {date >= today ? (
          <>
            <h3 className="t-align-center mb-xs-4 f-w-800 fsize-xs-6">
              {resultTitle}
            </h3>
            <div className="d-flex-row j-c-center align-items-center">
              <CirclePoints points={result}/>
            </div>
            <div className='d-flex-column w-100 align-items-center j-c-center'>
              <div className='d-flex-row align-items-center j-c-center w-100'>
                <p className="t-align-center ">
                  Hai ottenuto {result}
                </p>
                <img className='avatar-16 mr-xs-2' src={IconPoints} />
                <p className="t-align-center">
                    {'nella classifica di '}
                </p>

              </div>
              <div className='d-flex-row w-100 align-items-center j-c-center'>
                <p className='lime-500 '>{quiz.artistName+ ''}</p>
                <p className="t-align-center">
                    , continua così!
                </p>
              </div>
            </div>
            
            {/* {quiz.originalAudio &&
            <section id='original-audio' className='mt-xs-8 w-100'>
              <AudioPlayer
                src={quiz?.originalAudio}
                startTime={quiz?.startTime}
                userIsPlaying={true}
              />
            </section>
            } */}
          </>
        ): (
          <div className='w-80 d-flex-column align-items-center j-c-center'>
            <h3 className="t-align-center mb-xs-4 f-w-800 fsize-xs-6">
              {(result / 5) * 100}%
            </h3>
            <ProgressBar points={result} max={5}/>
            <p className="t-align-center w-80 mt-xs-4">
              Ci hai preso al {(result / 5) * 100}%!
            </p>
          </div>
        )}

          
          {!(orderedQuizzes?.length === 0) ? ( 
          <div className='d-flex-column align-items-center mt-xs-12 '>
            
            <WidgetPassedQuiz onClick={handleNextQuiz}/>

            
            
            {/* <section id='quiz' className='j-c-center align-items-center w-100'>
              {chunkedQuizzes.map((chunk, index) => (
                <div className='mb-xs-8 j-c-center align-items-center' key={index}>
                  <div className='d-flex-row j-c-space-between mt-xs-2 mt-lg-2'>
                      {chunk.map(item => {
                        const hasPlayed = item.responses.some(play => play.userId === currentFan.id)
                          return (
                            <CardPassedQuiz
                              slug={item.artistSlug}
                              artistName={item.artistName}
                              songName={item.songChunks[0].songName}
                              date={item.playDate}
                              image={item.image}
                              quizAlreadyPlayed={hasPlayed}
                              key={item.id} 
                              id={item.id}
                            />  
                          )
                        })}
                  </div>
                </div>
              ))}
            </section> */}
          </div>
          ):(
              <div className='d-flex-column bg-dark-soft w-100 j-c-center align-items-center border-radius-08 pb-xs-8 pt-xs-8'>
                <p className="t-align-center fsize-xs-1 f-w-300 ">                
                    Live quiz terminati.
                </p>
              </div>
          )}
        </div>       
        <ContainerDefault containerSpecificStyle={'position-fixed bottom-5 z-index-999 w-100 '}>
          <button className="bg-acid-lime black font-body" onClick={closeClick}>
            <span className="fsize-xs-3 f-w-500">
              Close
            </span>
          </button>
      </ContainerDefault>
        
      </ContainerDefault>


      
      

      <FullPageCenter className={`z-index-3 bg-blur transition-1s bg-black-transp75`} />

      <FullPageCenter className='z-index-1 '>
        <img className='w-inherit h-inherit object-fit-cover' src={quiz.image} alt='' />
      </FullPageCenter>
    </>
  )
}

export default LiveQuizResultRoute