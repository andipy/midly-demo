import { useNavigate, useLocation } from 'react-router-dom'

import NavbarBackOnly from '../components/navbar-back-only.component'
import ContainerDefault from '../layout/container-default.layout'
import WidgetFlashLeaderboardMetric from '../components/widget-flash-leaderboard-metric.component.admin'
import SongMetricDetailFlashLeaderboard from '../components/song-metric-detail-flash-leaderboard.component.admin'

const FlashLeaderboardMetricsDetailRoute = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { leaderboard, artistName } = location.state || {}

    const calcRatio = () => {
        const result = leaderboard.totalStreams / leaderboard.participants 
        const rounded = Math.round(result * 10) / 10
        return rounded
    }

    const metrics = [
        {
            id: 1,
            widgetLabel: `STREAM ${leaderboard.album ? "SULL'ALBUM:" : 'SUL BRANO:'}`,
            widgetValue: leaderboard.totalStreams
        },{
            id: 2,
            widgetLabel: 'FAN IN CLASSIFICA FLASH:',
            widgetValue: leaderboard.participants,
        },{
            id: 3,
            widgetLabel: 'ASCOLTI MEDI PER FAN:',
            widgetValue: calcRatio(),
        }
    ]

    return (
        <>
        <NavbarBackOnly onClick={() => navigate(-1)} />
        <ContainerDefault style={'pb-xs-6'}>
            <div className='position-relative w-100 h-xs-20 mb-xs-4'>
                <img className='h-inherit w-100 object-fit-cover border-radius-08' src={leaderboard.image} />
            </div>

            <div className='d-flex-row align-items-center pt-xs-1 pb-xs-1 pl-xs-2 pr-xs-2 ml-xs-1 bg-white-transp15 border-radius-100 w-max-content mb-xs-4'>
                <p className='fsize-xs-1 f-w-600 lime-400 letter-spacing-2'>{leaderboard.album ? 'ALBUM' : 'BRANO'}</p>    
            </div>
            
            <h1 className='fsize-xs-7'>{`${leaderboard.album ? leaderboard.album.title : leaderboard.song.title} - ${artistName}`}</h1>
            
            <section className='mt-xs-2 mx-xs-auto'>
                {metrics?.map(metric => {
                    return (
                        <WidgetFlashLeaderboardMetric
                            widgetLabel={metric.widgetLabel}
                            widgetValue={metric.widgetValue}
                            key={metric.id}
                        />
                    )
                })}
            </section>
            
            {leaderboard.album &&
                <section className='mt-xs-6 mx-xs-auto'>
                    <p className='fsize-xs-5 f-w-600 mb-xs-4'>Ascolti su ogni brano di {leaderboard.album?.title}</p>
                    {leaderboard.album?.streamDetails?.map((song, index) => (
                        <SongMetricDetailFlashLeaderboard
                            index={index + 1}
                            songTitle={song.songTitle}
                            streamCount={song.streamCount}
                            key={index}
                        />
                    ))}
                </section>
            }
        </ContainerDefault>
        </>
    )
}

export default FlashLeaderboardMetricsDetailRoute