import Appbar from '../components/appbar.component.artist'
import CardFlashLeaderboard from '../components/card-flash-leaderboard.component.artist'
import Navbar from '../components/navbar.component.artist'
import Container from '../layout/container.layout'
import FullPageCenter from '../layout/full-page-center.layout'

const FlashLeaderboardsRoute = () => {

    return (
        <>
            <Navbar background='solid-black' />
            
            <FullPageCenter>
                <Container>
                    <CardFlashLeaderboard />
                </Container>
            </FullPageCenter>

            <Appbar />
        </>
    )
}

export default FlashLeaderboardsRoute