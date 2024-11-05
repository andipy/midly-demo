import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import WidgetMetricFlashLeaderboard from '../components/widget-metric-flash-leaderboard.component'
import TextTitle from '../components/text-title.component'


const FlashLeaderboardMetricsAdminRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { leaderboardId } = location.state || {}

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)

    const leaderboard = flashLeaderboards.find(lb => lb.id === leaderboardId)

    const numberFanFlashLeaderboards = leaderboard.participants
    const streamGenerated = leaderboard.totalStreams

    const calcRatio = () => {
        const result = streamGenerated / numberFanFlashLeaderboards 
        return result
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
    </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardMetricsAdminRoute