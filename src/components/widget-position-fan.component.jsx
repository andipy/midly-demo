import { useContext, useEffect, useState } from "react"
import IconPoints from '../images/icons/icon-points.svg'


import { ArtistsContext } from "../contexts/artists.context"
function WidgetPositionFan({ artistId, leaderboard, fanDetails }) {

    const { artists } = useContext(ArtistsContext)

    const [artist, setArtist] = useState()

     useEffect(() => {
        const foundArtist = artists.find(artist => artist.id === artistId)
        setArtist(foundArtist)
       
    }, [artistId])

    const [points, setPoints] = useState(0)
    const [fanPosition, setFanPosition] = useState(0)

    useEffect(() => {
        if (leaderboard && fanDetails) {
            const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points)

            const fanEntry = sortedLeaderboard.find(entry => entry.userId === fanDetails.userId)

            if (fanEntry) {
                setPoints(fanEntry.points)

                const fanPosition = sortedLeaderboard.findIndex(entry => entry.userId === fanDetails.userId) + 1 
                setFanPosition(fanPosition)
            }
        }
    }, [leaderboard, fanDetails])  

  return (

    <article className='d-flex-row w-50 position-relative align-items-start j-c-start bg-dark-gradient border-radius-1 mb-xs-3 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-6 gap-0_5em '>
			<img className='avatar-48 object-fit-cover border-radius-08' src={artist?.image} />
			<div className='d-flex-column mt-xs-2 no-shrink '>
                <p className='fsize-xs-1 white'>{artist?.artistName}</p>
                <div className="d-flex-row j-c-space-between gap-1em">
                    <div className="d-flex-row j-c-center align-items-center">
			        <p className='fsize-xs-1 white no-shrink'>{points}  </p>
                    <img className="avatar-12 ml-xs-2" src={IconPoints}></img>

                    </div>
                    <p className='fsize-xs-1 white no-shrink'>{fanPosition}°</p>

                </div>
			</div>
		</article>

  )
}

export default WidgetPositionFan