import Appbar from '../components/appbar.component.artist'
import CardFlashLeaderboard from '../components/card-flash-leaderboard.component.artist'
import Navbar from '../components/navbar.component.artist'
import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'

const FlashLeaderboardsRoute = () => {

    return (
        <>
            <Navbar />
            
            <FullPageCenter>
                <ContainerDefault>
                    <CardFlashLeaderboard />
                </ContainerDefault>
            </FullPageCenter>

            <Appbar />
        </>
    )
}

export default FlashLeaderboardsRoute