import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { ArtistsContext } from "../contexts/artists.context"
import { FansContext } from "../contexts/fans.context"
import { CurrentFanContext } from '../contexts/currentFan.context'
import { LeaderboardsContext } from "../contexts/leaderboards.context"

import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import NavbarBackOnly from "../components/navbar-back-only.component"
import ContainerDefault from "../layout/container-default.layout"
import Carousel from "../layout/carousel.layout"
import CardPreferredArtist from "../components/card-preferred-artist.component"
import WidgetPositionFan from "../components/widget-position-fan.component"
function LeaderboardFanModal() {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()

    const { artists } = useContext(ArtistsContext)
    const { fans } = useContext(FansContext)
    const { currentFan } = useContext(CurrentFanContext)
    const {leaderboards, setLeaderboards} = useContext(LeaderboardsContext)
    

    const [selectedFan, setSelectedFan ] = useState()

    const [mostListenedArtists, setMostListenedArtists] = useState([])
    const [commonArtists, setCommonArtists] = useState([])
    const [leaderboardsFan, setLeaderboardsFan] = useState([])

    useEffect(() => {
        console.log('Tutti i fan: ', fans)
        console.log('Fan selezionato: ', state.fan)
        const foundFan = fans.find(fan => fan.id === state.fan.userId)
        console.log('found fan: ', foundFan)
        setSelectedFan(foundFan)

        const items = artists.filter(artist => 
            foundFan.mostListenedArtistsOnSpotify.some(mostListenedArtist => artist.id === mostListenedArtist.artistId))
        console.log('Più ascoltati:', items)
        setMostListenedArtists(items)

        const currentFanFavouriteArtists = currentFan?.followedArtists || []
        const foundFanFavouriteArtists = foundFan?.followedArtists || []
        const common = currentFanFavouriteArtists.filter(artist =>
            foundFanFavouriteArtists.some(fanArtist => fanArtist.id === artist.id)
        )
        const commonUserArtists = artists.filter(artist => 
            common.some(mostListenedArtist => artist.id === mostListenedArtist.artistId))
        
        setCommonArtists(commonUserArtists)

    }, [state])

    useEffect(() => {
            const leaderboardsWithFan = leaderboards.filter(leaderboard => {
                // Controlla se il fan con selectedFan.id è presente nella leaderboard
                return leaderboard.leaderboard.some(fan => fan.userId === selectedFan?.id);
            })


        setLeaderboardsFan(leaderboardsWithFan)
    }, [selectedFan])

    const chunkArray = (array, chunkSize) => {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
        }
        return chunks
    }
    
    const chunkedLeaderboardsFan = chunkArray(leaderboardsFan, 2)


    
        


    const closeFanModal = () => {
        navigate(-1, { state : { invokedModal: false}})
    }
  return (
   <FullScreenModalLayout>
        <NavbarBackOnly onClick={() => closeFanModal()}/>
        <ContainerDefault containerSpecificStyle={''}>
            <div className="d-flex-column w-100 j-c-center align-items-center">
                <div className="d-flex-column j-c-center align-items-center">
                    <img className="avatar-120 border-radius-100" src={state.fan.image}></img>
                    <p className="fsize-xs-3 f-w-600">{state.fan.username}</p>
                </div>

                <div className="d-flex-column w-100 align-items-start mt-xs-4">
                    <h2 className="fsize-xs-4 f-w-600">Artisti che amate entrambi:</h2>
                        <Carousel>
                            {commonArtists.map(artist => {                                            
                                return (
                                    <CardPreferredArtist 
                                        artist = {artist}
                                        key = {artist.id}
                                        size={'small'}
                                        onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state :{ artist : artist} })}
                                    />
                                )
                            })}
                        </Carousel>

                </div>
                <div className="d-flex-column w-100 align-items-start mt-xs-4">
                    <h2 className="fsize-xs-4 f-w-600">A novembre ha ascoltato di più:</h2>
                        <Carousel>
                            {mostListenedArtists.map(artist => {                                            
                                return (
                                    <CardPreferredArtist 
                                        artist = {artist}
                                        key = {artist.id}
                                        size={'small'}
                                        onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state :{ artist : artist} })}
                                    />
                                )
                            })}
                        </Carousel>
                    
                </div>
                <div className="d-flex-column w-100 align-items-start mt-xs-4">
                    <h2 className="fsize-xs-4 f-w-600">Nelle classifiche di:</h2>
                    {chunkedLeaderboardsFan.map((chunk, chunkIndex) => (
                    <div className="w-100" key={chunkIndex}>
                        <Carousel>
                            {chunk.map((artist, index) => (
                                <WidgetPositionFan
                                    key={index}
                                    artistId={artist.artistId}
                                    leaderboard={artist.leaderboard}
                                    fanDetails={state.fan}
                                />
                            ))}
                        </Carousel>
                    </div>

                    ))}


                </div>

            </div>
            
        </ContainerDefault>
    </FullScreenModalLayout> 
  )
}

export default LeaderboardFanModal