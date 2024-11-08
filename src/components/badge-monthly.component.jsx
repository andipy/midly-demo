import BadgeHeader from '../images/illustrations/badge-top.jpg'
import BadgeLogo from '../images/logo/badge-logo.png'
import BadgeLogoIcon from '../images/logo/badge-logo-icon.svg'

const BadgeMonthly = () => {
    return (
        <div className='badge d-flex-column mb-xs-20'>
            <div className='position-relative badge-top'>
                <span className='position-absolute bottom-12 left-5 z-index-4 font-body fsize-xs-8 fsize-lg-10 f-w-800'>A Febbraio 2023</span>
                <img className='w-10 position-absolute top-5 left-5 z-index-5' src={BadgeLogoIcon} />
                <img className='w-100 z-index-3' src={BadgeHeader} />
            </div>
            <div className='position-relative badge-bottom'>
                <div className='d-flex-column position-absolute left-5 top-5 z-index-4'>
                    <span className='font-body fsize-xs-8 fsize-lg-10 green-fluo f-w-800'>username</span>
                    <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600'><span className='font-body gold f-w-800'>è arrivato 1°</span> nella classifica di</p>
                    <span className='font-body fsize-xs-8 fsize-lg-10 green-fluo f-w-800'>artist name</span>
                    <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600'>con 5664 punti!</p>
                </div>
                <img className='w-100 position-absolute bottom-negative-12' src={BadgeLogo} />
            </div>                    
        </div>
    )
}

export default BadgeMonthly