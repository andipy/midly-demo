import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'
import { ArtistsContext } from '../contexts/artists.context'

import NavbarDefault from '../components/navbar-default.component'
import Container from '../layout/container.layout'
import TextTitle from '../components/text-title.component'
import CardFlashLeaderboard from '../components/card-flash-leaderboard.component.admin.jsx'

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
            <Container style={'pb-xs-12'}>
                <TextTitle title={'Dashboard admin classifiche flash'} />
                <p className='fsize-xs-2 mt-xs-4 red-300'><span className='f-w-700'>⚠️ ATTENZIONE</span>: non divulgare questo link per alcun motivo a nessuno fuori dal team stretto di MIDLY.</p>
                <section id='leaderboards' className='mt-xs-4'>
                    {sortedLeaderboards.map(leaderboard => {
                        const artist = artists.find(artist => artist.id === leaderboard.artistId)
                        return (
                            <CardFlashLeaderboard
                                leaderboard={leaderboard}
                                artistName={artist.artistName}
                                key={leaderboard.id}
                                onClick={
                                    () => navigate('/flash-leaderboards-admin/flash-leaderboard-metrics-detail', { 
                                        state: {
                                            leaderboard: leaderboard,
                                            artistName: artist.artistName
                                        } 
                                    })
                                } 
                            />
                        )
                    })}
                </section>
                <Link to='/'>
                    <p className='lime-400 t-align-center mt-xs-10 w-100'>Navigate back</p>
                </Link>
            </Container>
        </>
    )
}

export default FlashLeaderboardsDashboardRoute