import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'
import NavbarLeaderboardFlashPage from '../components/navbar-leaderboard-flash-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import CardLeaderboardFan from '../components/card-leaderboard-fan.component'
import LiveMessages from '../components/live-messages.component'
import LiveMusicProduct from '../components/live-music-product.component'

import IconPoints from '../images/icons/icon-point-xs.svg'
import Fan1 from '../images/pictures/fan-1.jpg'
import Fan2 from '../images/pictures/fan-2.jpg'
import Fan3 from '../images/pictures/fan-3.jpg'
import Fan4 from '../images/pictures/fan-4.jpg'
import Fan5 from '../images/pictures/fan-5.jpg'
import Fan6 from '../images/pictures/fan-6.jpg'
import Fan7 from '../images/pictures/fan-7.jpg'
import Fan8 from '../images/pictures/fan-8.jpg'
import Fan9 from '../images/pictures/fan-9.jpg'
import SpecialBadge1P from '../images/illustrations/special-badge-01-grad.png'
import SpecialBadge2P from '../images/illustrations/special-badge-02-grad.png'
import SpecialBadge3P from '../images/illustrations/special-badge-03-grad.png'
import AlbumCover from '../images/pictures/thasup-album-cover.jpeg'

const LeaderboardFlashRoute = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

    const [spotifyConnected, setSpotifyConnected] = useState(true)
    const connectSpotify = () => {
        //setSpotifyConnected(prev => !prev)
    }

    const leaderboard = [
        {
            image: Fan4,
            username: "Danny Snatch",
            points: 176,
            position: "1"
        },{
            image: Fan3,
            username: "Lil kid __",
            points: 158,
            position: "2"
        },{
            image: Fan5,
            username: "Polly Lolly",
            points: 146,
            position: "3"
        },{
            image: Fan9,
            username: "kevin alfa",
            points: 121,
            position: "4"
        },{
            image: Fan1,
            username: "The King",
            points: 99,
            position: "5"
        },{
            image: Fan7,
            username: "_freak 3x_",
            points: 82,
            position: "6"
        },{
            image: Fan6,
            username: "Kop Kalisti",
            points: 74,
            position: "7"
        },{
            image: Fan8,
            username: "craft andG",
            points: 54,
            position: "8"
        },{
            image: Fan2,
            username: "Big Law ::",
            points: 32,
            position: "9"
        }
    ]

    return (
        <>
            <NavbarLeaderboardFlashPage smallTitle={state.artName} avatarImage={state.image} />
            <CoverArtistPage artName={state.artName} image={AlbumCover} />

            <ContainerDefault containerSpecificStyle={'mt-avatar-header-2 pb-xs-24 pb-md-8'}>
                <div className="d-flex-column position-sticky top-navbar z-index-max">
                    <LiveMusicProduct />
                    {spotifyConnected ?
                        <CardLeaderboardYourPosition currentFanPoints={271} currentFanPosition={23} currentFanImage={Fan8} onClick={connectSpotify} />
                            :
                        <Button style={'bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4'} label={'CONNETTI SPOTIFY E COMPETI'} onClick={connectSpotify} />
                    }
                </div>
                
                <section>
                    <div className="mb-xs-4">
                        <div className="d-flex-row j-c-center">
                            <div className="d-flex-column align-items-center w-33 position-relative gap-0_5em">
                                <div className='first-position position-relative'>
                                    <img className="first-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-7 z-index-2" src={leaderboard[0].image} />
                                    <img className='position-absolute-x-y first-position-graphic z-index-1' src={SpecialBadge1P} />
                                </div>

                                <div className="d-flex-column align-items-center">
                                    <span className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[0].username}</span>
                                    <div className="d-flex-row letter-spacing-1">
                                        <span className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[0].points}</span>
                                        <img className="ml-xs-2" src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex-row j-c-start mt-xs-negative5">
                            <div className="d-flex-column align-items-center w-33 position-relative gap-0_5em">
                                <div className='second-position position-relative'>
                                    <img className="second-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-7 z-index-2" src={leaderboard[1].image} />
                                    <img className='position-absolute-x-y second-position-graphic z-index-1' src={SpecialBadge2P} />
                                </div>

                                <div className="d-flex-column align-items-center">
                                    <span className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[1].username}</span>
                                    <div className="d-flex-row letter-spacing-1">
                                        <span className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[1].points}</span>
                                        <img className="ml-xs-2" src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex-row j-c-end mt-xs-negative30">
                            <div className="d-flex-column align-items-center w-33 position-relative gap-0_5em">
                                <div className='third-position position-relative'>
                                    <img className="third-position position-absolute-x-y object-fit-cover border-radius-100 p-xs-7 z-index-2" src={leaderboard[2].image} />
                                    <img className='position-absolute-x-y third-position-graphic z-index-1' src={SpecialBadge3P} />
                                </div>

                                <div className="d-flex-column align-items-center">
                                    <span className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[2].username}</span>
                                    <div className="d-flex-row letter-spacing-1">
                                        <span className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[2].points}</span>
                                        <img className="ml-xs-2" src={IconPoints} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {leaderboard.map(fan => fan.position > 3 && <CardLeaderboardFan fanImage={fan.image}  fanUsername={fan.username} fanPoints={fan.points} fanPosition={fan.position} key={fan.position} />)}
                </section>
            </ContainerDefault>

            <LiveMessages />

            <Outlet />
        </>
    )
}

export default LeaderboardFlashRoute;