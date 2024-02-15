import { useNavigate } from "react-router-dom";

import Button from "./button.component";

const MessageFlashLeaderboard = ({ state }) => {

    const navigate = useNavigate()

    return (
        <div className="d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-red-dashed-1 pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2" onClick={() => navigate(`/artist/${state.artistSlug}/leaderboard-flash`, { state: state })}>
            <div className="d-flex-row align-items-center gap-0_5em">
                <div className="avatar-14 border-radius-100 bg-red-400 position-relative">
                    <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                </div>
                <p className="fsize-xs-2">Classifica FLASH live now.</p>
            </div>

            <Button style={"bg-red-400 border-radius-100 white w-auto pl-xs-4 pr-xs-4 pt-xs-2 pb-xs-2"} label="Watch" />
        </div>
    )
}

export default MessageFlashLeaderboard;