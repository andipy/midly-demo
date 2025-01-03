import { Link } from "react-router-dom"
import IconLink from '../images/icons/icon-link.svg'


const CardConcertStop = ({date}) => {
    const formatDate = (date) => {
        const months = [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ]

        const [day, month, year] = date.split('-')

        const formattedDay = day.startsWith('0') ? day.slice(1) : day

        const monthName = months[parseInt(month, 10) - 1]

        return `${formattedDay} ${monthName} ${year}`
    }
  return (
    <div className="d-flex-column j-c-start align-items-start">
        <div className='artist-card-multiple-row-challenge bg-dark-gradient position-relative'>
                <div className='overlay-card bg-dark-overlay-card z-index-1'></div>
                <img className='artist-card-multiple-row-challenge object-fit-cover' src={date.cover.url} />
                <div className='d-flex-row position-absolute bottom-5 z-index-2 j-c-start align-items-center w-100'>
                    <p className='grey-100 f-w-400 fsize-xs-1 position-absolute bottom-0 ml-xs-2'>{formatDate(date.date)}</p>
                </div>        
        </div>
        <p className='grey-100 f-w-400 fsize-xs-1 ml-xs-2'>{date.mainPlace}</p>
        <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3 ml-xs-2' to={''} target='blank'>
            <img className='avatar-20' src={IconLink} />
            <span>{'Vedi dettagli'}</span>
        </Link>
    </div>
    
  )
}

export default CardConcertStop