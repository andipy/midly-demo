import BadgeHeader from '../images/illustrations/badge-top.jpg'
import BadgeLogo from '../images/logo/badge-logo.png'
import BadgeLogoIcon from '../images/logo/badge-logo-icon.svg'

const BadgeMonthly = ({badge}) => {
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
        <div className='border-lime-6 border-radius-08 overflow-all-hidden '>
            <div className='badge d-flex-column mb-xs-20 '>
                <div className='position-relative badge-top'>
                    <span className='position-absolute bottom-12 left-5 z-index-4 font-body fsize-xs-8 fsize-lg-10 f-w-800'>A {months[badge.month]} {badge.year}</span>
                    <img className='w-10 position-absolute top-5 left-5 z-index-5' src={BadgeLogoIcon} />
                    <img className='w-100 z-index-3' src={BadgeHeader} />
                </div>
                <div className='d-flex-column j-c-center align-items-start position-relative ml-xs-4'>
                    <div className='d-flex-column z-index-4'>
                        <span className='font-body fsize-xs-8 fsize-lg-10 green-fluo f-w-800'>{badge.username}</span>
                        <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600'><span className='font-body gold f-w-800'>è arrivato {badge.position}°</span> nella classifica di</p>
                        <span className='font-body fsize-xs-8 fsize-lg-10 green-fluo f-w-800'>{badge.artistName}</span>
                        <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600'>con {badge.points} punti!</p>
                    </div>
                </div> 
                <div className='d-flex-column j-c-center align-items-center '>
                    <img className='w-95 ' src={BadgeLogo} />
                </div> 
                                   
            </div>
        </div>
        
    )
}

export default BadgeMonthly