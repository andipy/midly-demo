import IconPoints from "../images/icons/icon-point-xs.svg";

const CardLeaderboardFan = ({ fanImage, fanUsername, fanPoints, fanPosition }) => {
    return (
        <article class="mb-xs-3 d-flex-row align-items-center j-c-space-between bg-dark-gradient pb-xs-4 pt-xs-4 pr-xs-6 pl-xs-6 border-radius-1">
            <div class="d-flex-row align-items-center w-100">
                <img class="avatar-48 border-radius-100 mr-xs-4" src={fanImage} />
                <div class="text-info d-flex-column">
                    <div class="letter-spacing-1">{fanUsername}</div>
                    <div class="d-flex-row letter-spacing-1">
                        <div class="grey-400 fsize-xs-1 letter-spacing-1">{fanPoints} </div>
                        <img class="ml-xs-2" src={IconPoints} alt=" points" />
                    </div>
                </div>
            </div>
            <span class="fsize-xs-7 f-w-300">{fanPosition}°</span>
        </article>
    )
}

export default CardLeaderboardFan;