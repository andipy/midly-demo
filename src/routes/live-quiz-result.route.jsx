import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LiveQuizContext } from '../contexts/live-quiz.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import ContainerDefault from '../layout/container-default.layout'

const LiveQuizResultRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { id } = location.state || {}
    const { quizzes } = useContext(LiveQuizContext)
    const { currentFan } = useContext(CurrentFanContext)

    const quiz = quizzes.find(quiz => quiz.quizId === id)

    const userResponse = quiz.responses.find(response => response.userId === currentFan.id)

    const result = userResponse ? userResponse.score : 0

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
          <h3 className="t-align-center mb-xs-4 f-w-500 fsize-xs-6">
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