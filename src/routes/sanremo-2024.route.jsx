import { useState } from "react";

import ContainerDefault from "../layout/container-default.layout";

import NavbarArtistPage from "../components/navbar-artist-page.component";
import CoverArtistPage from "../components/cover-artist-page.component";
import CardLeaderboardFan from "../components/card-leaderboard-fan.component";
import CardLeaderboardYourPosition from "../components/card-leaderboard-your-position.component";
import Button from '../components/button.component'

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
import Sanremo2024 from '../images/pictures/sanremo.png'

const Sanremo2024Route = () => {

    const [spotifyConnected, setSpotifyConnected] = useState(true)
    const connectSpotify = () => {
        //setSpotifyConnected(prev => !prev)
    }

    const leaderboard = [
        {
            image: Fan1,
            username: "The King",
            points: 3689,
            position: "1"
        },{
            image: Fan2,
            username: "Big Law ::",
            points: 3021,
            position: "2"
        },{
            image: Fan3,
            username: "Lil kid __",
            points: 2907,
            position: "3"
        },{
            image: Fan4,
            username: "Danny Snatch",
            points: 1984,
            position: "4"
        },{
            image: Fan5,
            username: "Polly Lolly",
            points: 1888,
            position: "5"
        },{
            image: Fan6,
            username: "Kop Kalisti",
            points: 1467,
            position: "6"
        },{
            image: Fan7,
            username: "_freak 3x_",
            points: 1107,
            position: "7"
        },{
            image: Fan8,
            username: "craft andG",
            points: 467,
            position: "8"
        },{
            image: Fan9,
            username: "kevin alfa",
            points: 399,
            position: "9"
        }
    ]

    return (
        <>
            <NavbarArtistPage smallTitle={'Sanremo 2024'} avatarImage={Sanremo2024} />
            <CoverArtistPage artName={'Sanremo 2024'} image={Sanremo2024} />

            <ContainerDefault containerSpecificStyle={'pb-xs-8 pb-lg-2'}>

            <div className="container mt-avatar-header">
                {spotifyConnected ?
                    <CardLeaderboardYourPosition currentFanPoints={467} currentFanPosition={8} currentFanImage={Fan8} onClick={connectSpotify} />
                :
                    <Button style={'bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4 mb-xs-4 position-sticky z-index-5 top-navbar'} label={'CONNETTI SPOTIFY'} onClick={connectSpotify} />
                }

                <section className="mt-xs-4">

                <div className="mb-xs-4">
                    <div className="d-flex-row j-c-center">
                        <div className="d-flex-column w-33">
                            <div className="d-flex-row align-items-center j-c-center align-items-stretch position-relative first-position">
                                <img className="first-position object-fit-cover bg-gold-linear-gradient border-radius-100 p-xs-7" src={leaderboard[0].image} />
                                <div className="podium-position-indicator p-xs-16 bg-gold-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0">{leaderboard[0].position}°</div>
                            </div>
                            <div className="text-info d-flex-column align-items-center">
                                <div className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[0].username}</div>
                                <div className="d-flex-row letter-spacing-1">
                                    <div className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[0].points} </div>
                                    <img className="ml-xs-2" src={IconPoints} alt=" points" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex-row j-c-start mt-xs-negative20">
                        <div className="d-flex-column w-33">
                            <div className="d-flex-row align-items-center j-c-center align-items-stretch position-relative second-position">
                                <img className="second-position object-fit-cover bg-silver-linear-gradient border-radius-100 p-xs-6" src={leaderboard[1].image} />
                                <div className="podium-position-indicator p-xs-14 bg-silver-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0">{leaderboard[1].position}°</div>
                            </div>
                            <div className="text-info d-flex-column align-items-center">
                                <div className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[1].username}</div>
                                <div className="d-flex-row letter-spacing-1">
                                    <div className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[1].points} </div>
                                    <img className="ml-xs-2" src={IconPoints} alt=" points" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex-row j-c-end mt-xs-negative25">
                        <div className="d-flex-column w-33">
                            <div className="d-flex-row align-items-center j-c-center align-items-stretch position-relative third-position">
                                <img className="third-position object-fit-cover bg-bronze-linear-gradient border-radius-100 p-xs-5" src={leaderboard[2].image} />
                                <div className="podium-position-indicator p-xs-12 bg-bronze-radial-gradient d-flex-row align-items-center j-c-center position-absolute border-radius-100 top-0 right-0">{leaderboard[2].position}°</div>
                            </div>
                            <div className="text-info d-flex-column align-items-center">
                                <div className="fsize-xs-1 t-align-center letter-spacing-1">{leaderboard[2].username}</div>
                                <div className="d-flex-row letter-spacing-1">
                                    <div className="grey-400 fsize-xs-1 letter-spacing-1">{leaderboard[2].points} </div>
                                    <img className="ml-xs-2" src={IconPoints} alt=" points" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    {leaderboard.map(fan => fan.position > 3 && <CardLeaderboardFan fanImage={fan.image}  fanUsername={fan.username} fanPoints={fan.points} fanPosition={fan.position} key={fan.position} />)}
                </section>
            </div>
            </ContainerDefault>
        </>
    )
}

export default Sanremo2024Route;