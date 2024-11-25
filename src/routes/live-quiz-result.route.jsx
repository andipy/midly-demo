import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LiveQuizContext } from '../contexts/live-quiz.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'
import CardPassedQuiz from '../components/card-passed-quiz.component'
const LiveQuizResultRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { id } = location.state || {}
    const { quizzes } = useContext(LiveQuizContext)
    const { currentFan } = useContext(CurrentFanContext)

    const quiz = quizzes.find(quiz => quiz.quizId === id)

    const userResponse = quiz.responses.find(response => response.userId === currentFan.id)

    const result = userResponse ? userResponse.score : 0

    const sortQuizzes = (a,b) => {
      return (new Date(b.playDate) - new Date(a.playDate))
    }

    const orderedQuizzes = quizzes
    .filter(quiz2 => {
        const isArtistQuiz = quiz2.artistId === quiz.artistId

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const quizDate = new Date(quiz2.playDate)
        const isToday = quizDate < today 

        return isArtistQuiz && isToday
    })
    .sort((a, b) => sortQuizzes(a,b)) 

    /* array di punti */
    const[points, setPoints] = useState([])

      const generatePointArray = (result) => {
          let pointArray = []
          for ( var i = 0; i <= result; i++ ) {
              pointArray.push(i)
          }
          setPoints(pointArray)        
      }

      useEffect(() => {
          generatePointArray(result)        
      }, [])
    
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
      navigate(-3)
  }


  return (
    <>
      <ContainerDefault containerSpecificStyle={'h-100vh'}>
        <div className="d-flex-column align-items-center j-c-center h-100">
          <h3 className="t-align-center mb-xs-4 f-w-800 fsize-xs-6">
            {resultTitle}
          </h3>
          <div className="point-indicator">
            <p className="gold point-plus fsize-xs-5">
              +
            </p>
            <div className="point-column" style={{transform: `translateY(-${translation}px)`, transition: 'all 400ms cubic-bezier(.75,-0.01,.01,1) 40ms'}} >
            {points.map((point, index) => {
              return (
                <h4 key={index} className='point-dot gold'>{point}</h4>
              )
            })}
            </div>
            <p className="gold point-plus f-size-xs-5">punti</p>
          </div>
          <p className="t-align-center w-80 mt-xs-4">
            {resultMessage}
          </p>

          <div className='d-flex-column align-items-center mt-xs-12 '>
            <h3 className="t-align-center f-w-800 fsize-xs-4">
              Gioca ai quiz che ti sei perso 
            </h3>
            <p className="t-align-center mb-xs-4 f-w-300 fsize-xs-2">
              (Non valgono punti in classifica)
            </p>
            <section id='quiz' className='j-c-center align-items-center t-align-center '>
            
              <Carousel>
                {orderedQuizzes?.map(quiz => {
                  const hasPlayed = quiz.responses.some(play => play.userId === currentFan.id)
                  return (
                    <CardPassedQuiz
                      slug={quiz.artistSlug}
                      date={quiz.playDate}
                      image={quiz.image}
                      quizAlreadyPlayed={hasPlayed}
                      key={quiz.quizId} 
                      id={quiz.quizId}
                    />
                  )
                })}
              </Carousel>
            </section>
          </div>
        </div>       
        <ContainerDefault containerSpecificStyle={'position-fixed bottom-5'}>
          <button className="bg-acid-lime black font-body" onClick={closeClick}>
            <span className="fsize-xs-3 f-w-500">
              Close
            </span>
          </button>
        </ContainerDefault>
      </ContainerDefault>
    </>
  )
}

export default LiveQuizResultRoute