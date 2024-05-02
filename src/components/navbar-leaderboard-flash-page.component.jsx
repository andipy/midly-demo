import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import IconPerson from '../images/icons/icon-person.svg'

const NavbarLeaderboardFlashPage = ({ smallTitle, avatarImage }) => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <nav className={`top-bar-area-overlay-fixed d-flex-row align-items-center j-c-center white z-index-max top-0`}>
            <div className="container d-flex-row align-items-center j-c-space-between w-100">
                <div className="avatar-28" onClick={() => navigate(-1)}>
                    <img className="avatar-28 bg-dark-soft-transp75 border-radius-100" src={IconArrowLeft} />
                </div>

                <div className={`d-flex-row align-items-center j-c-center bg-black-transp50 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-4 border-radius-100`}>
                    <div className="avatar-32 position-relative mr-xs-4">
                        <img className="avatar-32 border-radius-100" src={avatarImage} />
                        <img className="artist-avatar-verified-icon avatar-12" src={IconVerifiedArtist} />
                    </div>                    
                    <h2 className="f-w-600 fsize-xs-1 letter-spacing-1 no-shrink">{smallTitle}</h2>
                </div>

                <div className={`d-flex-row align-items-center j-c-center bg-black-transp50 pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 border-radius-100`}>
                    <img className="avatar-18 border-radius-100" src={IconPerson} />
                    <p className="fsize-xs-1 f-w-500">7438</p>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLeaderboardFlashPage;