// import SpecialBadgeGradientCircle01 from '../images/illustrations/special-badge-gradient-circle-01.png'
// import SpecialBadgeGradientCircle02 from '../images/illustrations/special-badge-gradient-circle-02.png'

// import SpecialBadgeGradientCircleGold from '../images/illustrations/special-badge-gradient-circle-gold.png'
// import SpecialBadgeGradientCircleSilver from '../images/illustrations/special-badge-gradient-circle-silver.png'
// import SpecialBadgeGradientCircleBronze from '../images/illustrations/special-badge-gradient-circle-bronze.png'

const BadgeSpecialPreview = ({ badge }) => {
    return (
        <div className="d-flex-column j-c-space-between w-min-100 bg-dark-soft pt-xs-6 pb-xs-8 pl-xs-8 pr-xs-4 border-radius-1 gap-1em mr-xs-2 position-relative overflow-all-hidden">
            <span className="fsize-xs-10 f-w-700 lime-400 line-height-1 z-index-2">SUPER <br></br> FAN #{badge.position}</span>
            
            <span className="f-w-300 grey-200 w-50 z-index-2">della classifica FLASH sul {badge.musicProduct.musicProductType == 'track' ? 'brano' : 'disco'}</span>
            <span className="fsize-xs-6 f-w-600 white w-60 z-index-2">{badge.musicProduct.musicProductName}</span>

            <img className="position-absolute right-0 bottom-12 flash-badge-image-rotation w-45 z-index-1" src={badge.image} alt="" />
            {/* <img className='position-absolute right-0 bottom-0'
                src={
                    badge.position == 1 ? SpecialBadgeGradientCircleGold
                    : badge.position == 2 ? SpecialBadgeGradientCircleSilver
                    : badge.position == 3 && SpecialBadgeGradientCircleBronze
                }
            /> */}

            {/* <img className='position-absolute left-0 top-0' src={SpecialBadgeGradientCircle01} /> */}
        </div>
    )
}

export default BadgeSpecialPreview;