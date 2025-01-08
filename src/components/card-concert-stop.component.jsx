import { Link } from "react-router-dom"
import IconLink from '../images/icons/icon-link.svg'


const CardConcertStop = ({date}) => {
    const getDay = (date) => {
        if ( date ) {
            const [day] = date.split('-')
            return day.padStart(2, '0')
        }
    }

    const getMonth = (date) => {
        if ( date ) {
            const [, month] = date.split('-')
            const monthNames = [
                "GEN", "FEB", "MAR", "APR", "MAG", "GIU", 
                "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
            ]
            return monthNames[parseInt(month, 10) - 1]
        }
    }

    const getYear = (date) => {
        if ( date ) {
            const [, , year] = date.split('-')
            return year
        }
    }
  return (
    <div className="d-flex-column j-c-start align-items-start">
        <div className="avatar-80 d-flex-row j-c-center align-items-center bg-acid-lime">
            <div className='d-flex-column align-items-center j-c-center bg-dark border-radius-04 avatar-80'>
                <p className='fsize-xs-9 line-height-1'>{getDay(date?.date)}</p>
                <p className='fsize-xs-3 line-height-1'>{getMonth(date?.date)}</p>
                <p className='fsize-xs-2 line-height-1'>{getYear(date?.date)}</p>
            </div>
        </div>
        <p className='grey-100 f-w-400 fsize-xs-1 ml-xs-2'>{date.mainPlace}</p>
        <Link className='d-flex-row align-items-center grey-100 f-w-400 fsize-xs-1 text-underline mb-xs-3 ml-xs-2' to={''} target='blank'>
            {/* <img className='avatar-20' src={IconLink} /> */}
            <span>{'Vedi dettagli'}</span>
        </Link>
    </div>
    
  )
}

export default CardConcertStop