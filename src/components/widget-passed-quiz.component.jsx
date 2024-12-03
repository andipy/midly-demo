import Button from "./button.component"
const WidgetPassedQuiz = ({image, onClick}) => {
  return (
    <div className='d-flex-column bg-dark-soft w-100 j-c-center  align-items-start border-radius-08 pb-xs-6 pt-xs-6 pr-xs-6 pl-xs-6' onClick={onClick}>
            <h2 className="fsize-xs-5 f-w-600 ">
                Continua a giocare 
            </h2>
            <div className='position-relative w-100 h-xs-20 mt-xs-4 mb-xs-2'>
                <img className='h-inherit w-100 object-fit-cover border-radius-08' src={image} />
            </div>

            <p className="t-align-start fsize-xs-1 f-w-300 mt-xs-2 ">                
                Puoi fare i quiz vecchi a cui non hai ancora giocato, anche se non danno punti in classifica.
            </p>
            <div className="w-100 d-flex-row j-c-center align-items-center"> 
                <Button onClick={onClick} style={'w-100 fsize-xs-3 f-w-600  mt-xs-4 bg-acid-lime'} label={'Vai a un nuovo quiz'} />
            </div>
    </div>
  )
}

export default WidgetPassedQuiz