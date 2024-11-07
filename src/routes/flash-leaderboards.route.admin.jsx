import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'
import { ArtistsContext } from '../contexts/artists.context'

import NavbarDefault from '../components/navbar-default.component'
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import WidgetFlashLeaderboard from '../components/widget-flash-leaderboard.component.jsx'


const FlashLeaderboardsDashboardRoute = () => {

    const navigate = useNavigate()
    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    const { artists } = useContext(ArtistsContext)

    const now = new Date()

    const filteredLeaderboards = flashLeaderboards.filter(leaderboard => {
        const announceStartDate = new Date(leaderboard.announceStartDate)
        const announceEndDate = new Date(leaderboard.announceEndDate)
        return now >= announceStartDate && now <= announceEndDate
    })

    const sortedLeaderboards = filteredLeaderboards.sort((a, b) => {
        const diffA = Math.abs(new Date(a.rankStartDate) - now)
        const diffB = Math.abs(new Date(b.rankStartDate) - now)
        return diffA - diffB 
    })

  return (
    <>
        <NavbarDefault />
        <ContainerDefault containerSpecificStyle={'pb-xs-12'}>
            <TextTitle title={'Dashboard admin classifiche flash'} />
            <p className='mt-xs-4 red-300'><span className='f-w-700'>⚠️ ATTENZIONE</span>: non divulgare questo link per alcun motivo a nessuno fuori dal team stretto di MIDLY.</p>
            <section id='leaderboards' className='mt-xs-4'>
                {sortedLeaderboards.map(leaderboard => {
                    const artist = artists.find(artist => artist.id === leaderboard.artistId)
                    const title = leaderboard.album ? leaderboard.album.title : leaderboard.song.title
                    const type = leaderboard.album ? 'ALBUM' : 'BRANO'
                    const isAlbum = leaderboard.album ? true : false
                    return (
                        <WidgetFlashLeaderboard leaderboard={leaderboard} type={type} artistName={artist.artistName} title={title} onClick={() => navigate('/flash-leaderboards-dashboard/flash-leaderboard-metrics-detail', { state: { leaderboardId: leaderboard.id, isAlbum : isAlbum } })} key={leaderboard.id} />
                    )
                })}
                {/* {sortedLeaderboards.map(leaderboard => {
                    const artist = artists.find(artist => artist.id === leaderboard.artistId)
                    const title = leaderboard.album ? leaderboard.album.title : leaderboard.song.title
                    const type = leaderboard.album ? 'ALBUM' : 'BRANO'
                    return (
                        <WidgetFlashLeaderboardDashboard leaderboard={leaderboard} type={type} artistName={artist.artistName} title={title} key={leaderboard.id} />
                    )
                })} */}
            </section>
            <Link to='/'>
                <p className='lime-400 t-align-center mt-xs-10 w-100'>Navigate back</p>
            </Link>
        </ContainerDefault>
    </>
  )
}

export default FlashLeaderboardsDashboardRoute