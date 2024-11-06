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

    const numberFanFlashLeaderboards = leaderboard.participants
    const streamGenerated = leaderboard.totalStreams

    const calcRatio = () => {
        const result = streamGenerated / numberFanFlashLeaderboards 
        const rounded = Math.round(result * 10) / 10
        return rounded
    }

    const metrics = [
        {
            id: 1,
            widgetLabel: 'STREAM GENERATI',
            widgetValue: streamGenerated
        },{
            id: 2,
            widgetLabel: 'FAN IN CLASSIFICA FLASH',
            widgetValue: numberFanFlashLeaderboards,
        },{
            id: 3,
            widgetLabel: 'ASCOLTI MEDI PER FAN',
            widgetValue: calcRatio(),
        }
    ]

  return (
    <>
    <NavbarBackOnly onClick={() => navigate(-1)} />
    <ContainerDefault containerSpecificStyle={'pb-xs-12'}>
        <TextTitle title={`${leaderboard.album ? leaderboard.album.title : leaderboard.song.title} - ${artistName}`} />
        <p className='fsize-xs-6 f-w-300 grey-100 letter-spacing-1 mt-xs-2'>Split per brano</p>
        <section className='mt-xs-2 mx-xs-auto'>
            {/* map songs of the albums here */}
        </section>
    </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardMetricsDetailRoute