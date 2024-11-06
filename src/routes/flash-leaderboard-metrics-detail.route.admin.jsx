import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import WidgetMetricFlashLeaderboard from '../components/widget-metric-flash-leaderboard.component'
import TextTitle from '../components/text-title.component'


const FlashLeaderboardMetricsDetailRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { leaderboardId, artistName } = location.state || {}

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)

    const leaderboard = flashLeaderboards.find(lb => lb.id === leaderboardId)

    const songs = leaderboard.album.streamDetails

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    }

  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)} />
    <ContainerDefault containerSpecificStyle={'pb-xs-12'}>
        <TextTitle title={`${leaderboard.album ? leaderboard.album.title : leaderboard.song.title} - ${artistName}`} />
        <p className='fsize-xs-6 f-w-300 grey-100 letter-spacing-1 mt-xs-2'>Split per brano</p>
        <section className='mt-xs-2 mx-xs-auto'>
            {songs?.map((song, index) => (
            <div className='d-flex-col w-100'>
                {index > 0 && <hr />}
                <div className='d-flex-row w-100 j-c-space-between mt-xs-2 mb-xs-2'>
                    <p className='fsize-xs-0 grey-100 letter-spacing-1 no-shrink'>{index+1}. {song.songTitle}</p>
                    <p className='fsize-xs-1 grey-100'>{formatNumber(song.streamCount)}</p>
                </div>
            </div>
            ))}
            
        </section>
    </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardMetricsDetailRoute