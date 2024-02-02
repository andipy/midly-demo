import React from "react";
import { Link } from "react-router-dom";

const CardFollowedArtist = ({artistSlug, artName, image}) => {
    return (
        <Link to={`/artist/${artistSlug}`} className="d-flex-row align-items-center bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 gap-0_5em">                        
                <img className="followed-artist-img object-fit-cover border-radius-1" src={image} />

                <h5 className="fsize-xs-4 f-w-500">{artName}</h5>
        </Link>
    )
}

export default CardFollowedArtist;