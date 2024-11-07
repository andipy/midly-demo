import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import WidgetMetricFlashLeaderboard from '../components/widget-metric-flash-leaderboard.component'
import TextTitle from '../components/text-title.component'
import WidgetFlashLeaderboardMetricSongs from '../components/widget-flash-leaderboard-metric-song.component'


const FlashLeaderboardMetricsRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { leaderboardId, isAlbum } = location.state || {}


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
            widgetLabel: `STREAM ${isAlbum ? "SULL'ALBUM:" : 'SUL BRANO:'}`,
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
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
        <TextTitle title={'Statistiche'} />
        <p className='fsize-xs-3 f-w-300 grey-200 letter-spacing-1 mt-xs-2'>
            Totali per la classifica flash:
        </p>
        <section className='mt-xs-2 mx-xs-auto'>
            {metrics?.map(metric => {
                return (
                    <WidgetMetricFlashLeaderboard widgetLabel={metric.widgetLabel} widgetValue={metric.widgetValue} key={metric.id}/>
                )
            })}
        </section>
        { isAlbum && (
            
            <section id='songs' className='mt-xs-2 mx-xs-auto'>
                <WidgetFlashLeaderboardMetricSongs leaderboardId={leaderboardId} />
            </section>
        )}
    </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardMetricsRoute