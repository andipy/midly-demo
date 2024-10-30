import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerDefault from "../layout/container-default.layout"
/* Il risultato lo aggiorno dentro al play e lo pesco qui dal context
 */
function LiveQuizResult() {

  const navigate = useNavigate();

  /* Il result devo pescarlo dal context */
  const result = 0;


  /* array di punti */
  const[points, setPoints] = useState([])

    const generatePointArray = (result) => {
        let pointArray = [];
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
      setResultTitle('suca meno di 2...')
      setResultMessage('Ma hey, nononono')

    } else if ( result >= 3) {
      setResultTitle('bene piu di 3...')
      setResultMessage('Ma hey, ssisisisi')
    }
  }, [])

  /* button funct */
  const closeClick = () => {
    navigate(-3);
};


  return (
    <>
        {/* Inizio a scrivere tutto il codice e poi inserisco
        lo state per il punteggio, lo state per il messaggio
        e la transizione */}

      <ContainerDefault containerSpecificStyle={'h-100vh'}>
        {/* CENTRO */}
        <div className="d-flex-column align-items-center j-c-center h-100">
          {/* TITLE */}
          <h3 className="t-align-center mb-xs-4 f-w-500 fsize-xs-6">
            {resultTitle}
          </h3>
          {/* POINT */}
          <div className="point-indicator">
            <p className="gold point-plus fsize-xs-5">
              +
            </p>
            <div className="point-column" style={{transform: `translateY(-${translation}px)`, transition: 'all 400ms cubic-bezier(.75,-0.01,.01,1) 40ms'}} >
              {points.map(point => {
                return (
                  <h4 className='point-dot gold'>{point}</h4>
                )
              } )}
            </div>
            <p className="gold point-plus f-size-xs-5">punti</p>
          </div>
          {/* DESCR */}
          <p className="t-align-center w-80 mt-xs-4">
            {resultMessage}
          </p>
        </div>
        {/* BUTTON */}
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

export default LiveQuizResult