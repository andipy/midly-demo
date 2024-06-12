import { useState } from "react"

import Appbar from "../components/appbar.component.artist"
import CardFlashLeaderboard from "../components/card-flash-leaderboard.component.artist"
import Navbar from "../components/navbar.component.artist"
import ContainerDefault from "../layout/container-default.layout"
import FullPageEmptyState from "../layout/full-page-empty-state.layout"

const FlashLeaderboardsRoute = () => {

    const [flashLeaderboard, setFlashLeaderboard] = useState(true)

    return (
        <>
            <Navbar />
            
            <FullPageEmptyState>
                <ContainerDefault>
                    <CardFlashLeaderboard flashLeaderboard={flashLeaderboard} />
                </ContainerDefault>
            </FullPageEmptyState>

            <Appbar />
        </>
    )
}

export default FlashLeaderboardsRoute