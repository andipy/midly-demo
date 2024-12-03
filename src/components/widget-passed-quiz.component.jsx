import Button from "./button.component"
const WidgetPassedQuiz = ({onClick}) => {
  return (
    <div className='d-flex-column bg-dark-soft w-100 j-c-center align-items-center border-radius-08 pb-xs-8 pt-xs-8' onClick={onClick}>
            <h2 className="fsize-xs-5 f-w-600 ">
                Continua a giocare 
            </h2>
            <p className="t-align-center fsize-xs-1 f-w-300 mt-xs-2">                
                Puoi fare i quiz vecchi a cui non hai ancora giocato, anche se non danno punti in classifica.
            </p>
            <Button onClick={onClick} style={'w-80  mt-xs-4 bg-acid-lime'} label={'Gioca'} />
    </div>
  )
}

export default WidgetPassedQuiz