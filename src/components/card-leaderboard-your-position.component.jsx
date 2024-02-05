import IconPoints from "../images/icons/icon-point-xs.svg";

const CardLeaderboardYourPosition = ({ currentFanPosition, currentFanPoints, currentFanImage, onClick }) => {
    return (
        <article className="d-flex-row align-items-center j-c-space-between w-100 position-sticky z-index-5 top-navbar bg-dark-soft pb-xs-6 pt-xs-6 pr-xs-6 pl-xs-6 border-radius-1 mb-xs-4" onClick={onClick}>
            <div className="d-flex-row align-items-center j-c-start no-shrink">
                <img className="avatar-28 border-radius-100 mr-xs-6" src={currentFanImage} />
                <span className="fsize-xs-2 f-w-500 grey-100 no-shrink">La tua posizione</span>
            </div>

            <div className="d-flex-row align-items-center gap-1em">
                <span className="fsize-xs-5 f-w-400">{currentFanPosition}°</span>

                <div className="d-flex-row align-items-center">
                    <div className="fsize-xs-3">{currentFanPoints} </div>
                    <img className="avatar-12 ml-xs-2" src={IconPoints} alt="points" />
                </div>
            </div>
        </article>
    )
}

export default CardLeaderboardYourPosition;