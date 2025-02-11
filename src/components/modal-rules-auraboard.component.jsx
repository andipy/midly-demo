import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import FullPageCenter from "../layout/full-page-center.layout"
import Container from "../layout/container.layout"
import Carousel from "../layout/carousel.layout"
import IconExit from '../images/icons/icon-exit.svg'
import Button from "./button.component"
import SpotifyLogo from '../images/icons/icon-spotify.svg'

const ModalRulesAuraboard = ({closeModal}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {currentFan} = useContext(CurrentFanContext)
    const [page, setPage] = useState(1)
    const [isExiting, setIsExiting] = useState(false)
    const handleNextPage = () => {
        setIsExiting(true)
        setTimeout(() => {
        setPage(2)
        setIsExiting(false)
        }, 300)
    }
    const handleClose = () => {
        setIsExiting(true)
        setTimeout(closeModal, 300)
    }
    const handleSpotifyConnect = () => {
        localStorage.setItem('pageFrom', location?.pathname)
        navigate('/spotify-login')
    }
  return (
    <>
    <FullPageCenter style="z-index-1200 bg-black-transp80">
      <Container style={`centered-popup ${isExiting ? "fade-out" : "fade-in"}`}>
        <Carousel>
          <div className="bg-dark-gradient artist-card-highlight-multiple position-relative overflow-x border-radius-08 no-shrink pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4 d-flex-column j-c-space-between align-items-center h-min-100">
              {page === 1 ? (
                <>
                    <div className="d-flex-column j-c-center align-items-center mb-xs-8">
                        <h1 className="fsize-xs-5 f-w-600 letter-spacing-1 mb-xs-4">
                        Come funziona la classifica
                        </h1>
                        <p className='fsize-xs-2 f-w-300 t-align-center'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <Button 
                        style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                        label='Avanti'
                        onClick={handleNextPage}
                    />
                </>
              ) : (
                <>
                    <div className="d-flex-column j-c-start align-items-center mb-xs-8">
                        <h1 className="fsize-xs-5 f-w-600 letter-spacing-1 mb-xs-4">
                            Che azioni danno punti?
                        </h1>
                        <p className='fsize-xs-2 f-w-300 t-align-center'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className="d-flex-column w-100">
                        {
                            !currentFan.hasSpotify ?
                            <Button 
                                style='bg-green-spotify fsize-xs-3 f-w-500 white mt-xs-2'
                                label='Connetti spotify'
                                onClick={handleSpotifyConnect}
                            >
                                <img className='social-logo' src={SpotifyLogo} alt='SPOTIFY'/>
                            </Button>
                            :
                            <Button 
                                style='bg-white-transp15 fsize-xs-3 f-w-500 grey-400 mt-xs-2'
                                label='Spotify connesso'
                                disabled={true}
                                onClick={handleSpotifyConnect}
                            >
                            </Button>
                        }
                        
                        <Button 
                            style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                            label='Chiudi'
                            onClick={handleClose}
                        />
                    </div>
                    
                </>
              )}
            
          </div>
        </Carousel>
      </Container>
    </FullPageCenter>
    </>
  )
}

export default ModalRulesAuraboard