import { useLocation } from "react-router-dom";

import CardLeaderboardFan from "../components/card-leaderboard-fan.component";

import IconPoints from "../images/icons/icon-point-xs.svg";
import Fan2 from "../images/pictures/fan-6.jpg";
import Fan3 from "../images/pictures/fan-14.jpg";
import Fan4 from "../images/pictures/fan-10.jpg";
import Fan5 from "../images/pictures/fan-5.jpg";
import Fan6 from "../images/pictures/fan-4.jpg";

const LeaderboardRoute = () => {

    const location = useLocation()

    const leaderboard = [
        {
            image: Fan3,
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
            image: Fan4,
            username: "Danny Snatch",
            points: 1984,
            position: "7"
        },{
            image: Fan5,
            username: "Polly Lolly",
            points: 1888,
            position: "8"
        },{
            image: Fan6,
            username: "Kop Kalisti",
            points: 1467,
            position: "9"
        }
    ]

    return (
        <section className={`mt-xs-4`}>
            <div className="mb-xs-8">
                <div className="d-flex-row j-c-center">
                    <div className="d-flex-column w-33">
                        <div className="d-flex-row align-items-center j-c-center align-items-stretch position-relative first-position">
                            <img className="first-position object-fit-cover bg-gold-linear-gradient border-radius-100 p-xs-7" src={Fan3} />
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
                            <img className="second-position object-fit-cover bg-silver-linear-gradient border-radius-100 p-xs-6" src={Fan2} />
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
                            <img className="third-position object-fit-cover bg-bronze-linear-gradient border-radius-100 p-xs-5" src={Fan3} />
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

    )
}

export default LeaderboardRoute;