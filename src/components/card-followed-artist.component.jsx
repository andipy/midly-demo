import React from "react";
import { useNavigate } from "react-router-dom";

const CardFollowedArtist = ({artistSlug, artName, image}) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/artist/${artistSlug}/leaderboard`, { state : {artistSlug: artistSlug, artName: artName, image: image} })} className={`d-flex-row align-items-center bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em`}>                        
                <img className="followed-artist-img object-fit-cover border-radius-1" src={image} />

                <h5 className="fsize-xs-4 f-w-500">{artName}</h5>

                {artName == 'thasup' &&
                    <div className="avatar-14 border-radius-100 bg-red-400 position-relative ml-xs-2">
                        <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                    </div>
                }
        </div>
    )
}

export default CardFollowedArtist;