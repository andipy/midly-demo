import { useContext } from 'react'
import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import ContainerDefault from "../layout/container-default.layout"
import TextTitle from "./text-title.component"

function WidgetFlashLeaderboardMetricSongs({leaderboardId}) {

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)

    const leaderboard = flashLeaderboards.find(lb => lb.id === leaderboardId)

    const songs = leaderboard.album.streamDetails

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
    }
    
  return (
    <ContainerDefault containerSpecificStyle={'pb-xs-6'}>
            <TextTitle title={'Split per brano'} />
            <section className='mt-xs-4 mx-xs-auto'>
                <div className="">
                    {songs?.map((song, index) => (
                    <div className='d-flex-col w-100'>
                        {index > 0 && <hr />}
                        <div className='d-flex-row w-100 j-c-space-between align-items-center mt-xs-2 mb-xs-2 gap-1em'>
                            <p className='fsize-xs-0 grey-100 letter-spacing-1 grow-1 '>{index+1}. {song.songTitle}</p>
                            <p className='fsize-xs-2 f-w-500 grey-100 no-shrink'>{formatNumber(song.streamCount)}</p>
                        </div>
                    </div>
                    ))}
                </div>  
            </section>
    </ContainerDefault>
  )
}

export default WidgetFlashLeaderboardMetricSongs