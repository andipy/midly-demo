import Logo from "../images/logo/logo-simple-artists.svg"

import IconPlus from "../images/icons/icon-plus-black.svg"
import IconPlusW from "../images/icons/icon-plus.svg"

const Navbar = () => {
    return (
        <nav className="top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-center white z-index-max top-0 shadow-dark-400">
            <div className="container d-flex-row align-items-center j-c-space-between">
                <div className="d-flex-row align-items-center j-c-center">
                    <img src={Logo} alt="MIDLY" />
                </div>

                <div className="d-flex-row gap-0_5em">
                <div className="avatar-36 d-flex-row align-items-center j-c-center">
                        <img className="avatar-28" src={IconPlusW} alt="+" />
                    </div>

                    <div className="avatar-36 d-flex-row align-items-center j-c-center">
                        <img className="avatar-28" src={IconPlusW} alt="+" />
                    </div>

                    <div className="avatar-36 d-flex-row align-items-center j-c-center">
                        <img className="avatar-28" src={IconPlusW} alt="+" />
                    </div>
                    
                    <button className="bg-acid-lime d-flex-row align-items-center j-c-center fsize-xs-2 f-w-500 avatar-36" onclick='location.href="post-creation.html"'>
                        <img src={IconPlus} alt="+" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar