import SpecialBadgeGradientCircle01 from '../images/illustrations/special-badge-gradient-circle-01.png'
import SpecialBadgeGradientCircle02 from '../images/illustrations/special-badge-gradient-circle-02.png'

const BadgeSpecialPreview = ({ position, image, musicProduct }) => {
    return (
        <div className="d-flex-column j-c-center align-items-center w-min-100 bg-dark-soft pt-xs-6 pb-xs-8 pl-xs-4 pr-xs-4 border-radius-1 gap-0_5em mr-xs-2 position-relative overflow-all-hidden">
            <span className="fsize-xs-10 f-w-700 t-align-center green-fluo font-special-01">TOP FAN #</span>
            <img className="w-fit-content" src={image} alt="" />
            <div className="d-flex-column align-items-center gap-0_5em">
                <span className="t-align-center font-special-01 f-w-300 grey-200">della classifica speciale sul {musicProduct.musicProductType == 'track' ? 'brano' : 'disco'}</span>
                <span className="fsize-xs-6 t-align-center font-special-01 grey-50">"{musicProduct.musicProductName}"</span>
            </div>

            <img className='position-absolute right-0 bottom-0' src={SpecialBadgeGradientCircle01} />
            <img className='position-absolute left-0 top-0' src={SpecialBadgeGradientCircle02} />
        </div>
    )
}

export default BadgeSpecialPreview;