import BadgeHeader from '../images/illustrations/badge-top.jpg'
import BadgeLogo from '../images/logo/badge-logo.png'
import BadgeLogoIcon from '../images/logo/badge-logo-icon.svg'

const BadgeMonthly = ({ badge, transition }) => {
    
    const months = {
        1: 'GENNAIO',
        2: 'FEBBRAIO',
        3: 'MARZO',
        4: 'APRILE',
        5: 'MAGGIO',
        6: 'GIUGNO',
        7: 'LUGLIO',
        8: 'AGOSTO',
        9: 'SETTEMBRE',
        10: 'OTTOBRE',
        11: 'NOVEMBRE',
        12: 'DICEMBRE'
    }

    return (
        <div className={`badge d-flex-column border-radius-08 overflow-all-hidden ${transition ? 'badge-fade-transition' : ''}`}>
            <div className='position-relative badge-top'>
                <span className='position-absolute bottom-12 left-5 z-index-4 font-body fsize-xs-5 fsize-lg-10 f-w-800'>A {months[badge.month]} {badge.year}</span>
                <img className='w-10 position-absolute top-5 left-5 z-index-5' src={BadgeLogoIcon} />
                <img className='w-100 z-index-3' src={BadgeHeader} />
            </div>
            <div className='d-flex-column j-c-center align-items-start ml-xs-4'>
                <p className='font-body fsize-xs-9 fsize-lg-10 green-fluo f-w-700 line-height-140'>{badge.username}</p>
                <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600 line-height-140'><span className='font-body gold'>è arrivatə {badge.position}°</span> nella classifica di</p>
                <p className='font-body fsize-xs-9 fsize-lg-10 green-fluo f-w-700 line-height-140'>{badge.artistName}</p>
            </div> 
            <div className='d-flex-column j-c-center align-items-center '>
                <img className='w-95' src={BadgeLogo} />
            </div>
        </div>
    )
}

export default BadgeMonthly