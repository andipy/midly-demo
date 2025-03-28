import BadgeLogoIcon from '../images/logo/badge-logo-icon-white.svg'
import BadgeFlashGraphic from '../images/illustrations/badge_flash_base_graphic.png'
import IconDownload from '../images/icons/icon-download-white.svg'

const BadgeFlash = ({ badge, transition }) => {
    
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
        <div className='w-100 position-relative'>
            <div className='position-relative h-80vh border-radius-08 overflow-all-hidden w-100 bg-black border-dark-soft-1'>
                {/* Top Section */}
                <div className='w-100 d-flex-row align-items-center j-c-space-between pl-xs-8 pr-xs-8 pt-xs-2 pb-xs-4 z-index-3 position-relative'>
                    <div className='avatar-28'></div>
                    <span className='font-body f-w-700 letter-spacing-1'>SUPERFAN</span>
                    <img className='avatar-28' src={BadgeLogoIcon} />
                </div>

                {/* Username and Position Section */}
                <div className='d-flex-row j-c-start align-items-center gap-0_5em ml-xs-8 z-index-3 position-relative'>
                    <p className='font-body fsize-xs-4 fsize-lg-10 white f-w-700 line-height-140'>{badge.username}</p>
                    <img className='avatar-24 border-radius-100' src={badge.userImage} />
                </div>

                <div className='ml-xs-8 mt-xs-4 z-index-3 position-relative'>
                    <p className='w-70 font-body fsize-xs-9 fsize-lg-10 white f-w-800 line-height-1'>Sei {badge.position}° nella <br/> classifica <br/> flash di <br/> {badge.artistName}</p>
                </div>

                {/* Artist Image Section */}
                <div className='position-absolute-badge-flash avatar-180 d-flex-row align-items-center j-c-center border-radius-100 overflow-all-hidden z-index-4'>
                    <img className='w-inherit' src={badge.coverImage} alt="" />
                </div>

                {/* Bottom Section */}
                <div className='position-absolute bottom-0 bg-dark-overlay-badge w-100 z-index-3 pt-xs-4 pb-xs-12'>
                    <p className='t-align-center fsize-xs-7 f-w-700 line-height-1 mb-xs-2'>{badge.productName}</p>
                    {badge.productType === 'ALBUM' ?
                        <p className='t-align-center fsize-xs-1'>IL NUOVO ALBUM</p>
                    : badge.productType === 'SONG' ?
                        <p className='t-align-center fsize-xs-1'>IL NUOVO BRANO</p>
                    : null
                    }
                </div>

                {/* Background Graphic */}
                <img className='position-absolute-x-y w-inherit opacity-0_9 z-index-1' src={BadgeFlashGraphic} />
            </div>

            <div className='avatar-32 d-flex-row align-items-center j-c-center border-radius-04 border-white position-absolute bottom-2 right-2 z-index-5'>
                <img className='avatar-24' src={IconDownload} />
            </div>
        </div>
    )
}

export default BadgeFlash