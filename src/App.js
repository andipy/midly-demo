import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import './index.css'

import { ArtistsProvider } from "./contexts/artists.context"
import { CurrentFanProvider } from "./contexts/currentFan.context"
import { CurrentArtistProvider } from "./contexts/currentArtist.context";

import InviteFriendRoute from './routes/invite-friend.route'
import QuizResultRoute from "./routes/quiz-result.route"
import QuizGameplayRoute from "./routes/quiz-gameplay.route"
import YourFavouritesRoute from "./routes/your-favourites.route"
import ArtistRoute from "./routes/artist.route"
import LeaderboardRoute from "./routes/leaderboard.route"
import LeaderboardFlashRoute from "./routes/leaderboard-flash.route"
import Sanremo2024Route from "./routes/sanremo-2024.route"
import LeaderboardFlashRewardsRoute from "./routes/leaderboard-flash-rewards.route"

import FanclubRoute from "./routes/fanclub.route.artist"
import FlashLeaderboardsRoute from "./routes/flash-leaderboards.route.artist"

const router = createBrowserRouter([
  {
    path: '/',
    element:<Navigate to="/your-favourites" />
  },{
    path: '/your-favourites',
    element: <YourFavouritesRoute />
  },{
    path: '/artist/:artistSlug',
    element: <ArtistRoute />,
    children: [
      {
        path: '/artist/:artistSlug/leaderboard',
        element: <LeaderboardRoute />
      }
    ]
  },{
    path: '/artist/:artistSlug/invite-friend',
    element: <InviteFriendRoute />
  },{
    path: '/artist/:artistSlug/leaderboard-flash',
    element: <LeaderboardFlashRoute />,
    children: [
      {
        path: '/artist/:artistSlug/leaderboard-flash/rewards',
        element: <LeaderboardFlashRewardsRoute />
      }
    ]
  },{
    path: '/sanremo-2024',
    element: <Sanremo2024Route />
  },{
    path: '/quiz-result',
    element: <QuizResultRoute />
  },{
    path: '/quiz-gameplay',
    element: <QuizGameplayRoute />
  },{
    path: '/artist-app/fan-club',
    element: <FanclubRoute />
  },{
    path: '/artist-app/flash-leaderboards',
    element: <FlashLeaderboardsRoute />
  },{
    path: '/artist-app/flash-leaderboard',
    element: <LeaderboardFlashRoute />
  }
])

function App() {
  return (
    <ArtistsProvider>
      <CurrentFanProvider>
        <CurrentArtistProvider>
          <RouterProvider router={router} />
        </CurrentArtistProvider>
      </CurrentFanProvider>
    </ArtistsProvider>
  );
}

export default App;