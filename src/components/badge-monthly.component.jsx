import BadgeLogoIcon from '../images/logo/badge-logo-icon-white.svg'
import BadgeMonthlyGraphic from '../images/illustrations/badge_monthly_base_graphic.png'
import IconDownload from '../images/icons/icon-download-white.svg'
// import BadgeHeader from '../images/illustrations/badge-top.jpg'
// import BadgeLogo from '../images/logo/badge-logo.png'
// import BadgeFlashGraphic from '../images/illustrations/badge_flash_base_graphic.png'

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
        <div className='position-relative h-80vh border-radius-08 overflow-all-hidden w-100'>
            {/* Top Section */}
            <div className='w-100 d-flex-row align-items-center j-c-space-between pl-xs-8 pr-xs-8 pt-xs-2 pb-xs-4 z-index-3 position-relative'>
                <div className='avatar-28'></div>
                <span className='font-body f-w-700 letter-spacing-1'>SUPERFAN</span>
                <img className='avatar-28' src={BadgeLogoIcon} />
            </div>

            {/* Username and Position Section */}
            <div className='d-flex-row j-c-start align-items-center gap-0_5em ml-xs-4 z-index-3 position-relative'>
                <p className='font-body fsize-xs-4 fsize-lg-10 white f-w-700 line-height-140'>{badge.username}</p>
                <img className='avatar-24 border-radius-100' src={badge.userImage} />
            </div>

            <div className='ml-xs-4 mt-xs-2 z-index-3 position-relative'>
                <p className='w-70 font-body fsize-xs-9 fsize-lg-10 white f-w-800 line-height-1'>{badge.position}° posto nella classifica mensile di</p>
            </div>

            {/* Artist Image Section */}
            <div className='position-absolute-badge avatar-180 bg-red-300 d-flex-row align-items-center j-c-center border-radius-100 overflow-all-hidden z-index-3'>
                <img className='w-inherit' src={badge.artistImage} alt="" />
            </div>

            {/* Bottom Section */}
            <div className='position-absolute bottom-0 bg-dark-overlay-badge w-100 z-index-3 pt-xs-4 pb-xs-4'>
                <p className='t-align-center fsize-xs-10 f-w-700 line-height-1'>{badge.artistName}</p>
                <div className='d-flex-row j-c-space-between align-items-end'>
                    <div className='d-flex-column ml-xs-4'>
                        <p className='f-w-700 f-size-xs-4'>{months[badge.month]}</p>
                        <p className='f-w-700 f-size-xs-4'>{badge.year}</p>
                    </div>

                    <div className='avatar-32 d-flex-row align-items-center j-c-center border-radius-04 border-white'>
                        <img className='avatar-24' src={IconDownload} />
                    </div>
                </div>

            </div>

            {/* Background Graphic */}
            <img className='position-absolute-x-y w-inherit opacity-0_9 z-index-1' src={BadgeMonthlyGraphic} />
        </div>

        // <div className={`badge d-flex-column border-radius-08 overflow-all-hidden ${transition ? 'badge-fade-transition' : ''}`}>
        //     <div className='position-relative badge-top'>
        //         <span className='position-absolute bottom-12 left-5 z-index-4 font-body fsize-xs-5 fsize-lg-10 f-w-800'>A {months[badge.month]} {badge.year}</span>
        //         <img className='w-10 position-absolute top-5 left-5 z-index-5' src={BadgeLogoIcon} />
        //         <img className='w-100 z-index-3' src={BadgeHeader} />
        //     </div>
        //     <div className='d-flex-column j-c-center align-items-start ml-xs-4'>
        //         <p className='font-body fsize-xs-9 fsize-lg-10 green-fluo f-w-700 line-height-140'>{badge.username}</p>
        //         <p className='font-body fsize-xs-3 fsize-lg-6 f-w-600 line-height-140'><span className='font-body gold'>è arrivatə {badge.position}°</span> nella classifica di</p>
        //         <p className='font-body fsize-xs-9 fsize-lg-10 green-fluo f-w-700 line-height-140'>{badge.artistName}</p>
        //     </div> 
        //     <div className='d-flex-column j-c-center align-items-center '>
        //         <img className='w-95' src={BadgeLogo} />
        //     </div>
        // </div>
    )
}

export default BadgeMonthly