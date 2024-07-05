import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'

import './index.css'

import { ArtistsProvider } from './contexts/artists.context'
import { CurrentFanProvider } from './contexts/currentFan.context'
import { CurrentArtistProvider } from './contexts/currentArtist.context'
import { FlashLeaderboardsProvider } from './contexts/flash-leaderboards.context'
import { LeaderboardsProvider } from './contexts/leaderboards.context'
import { FanclubsProvider } from './contexts/fanclubs.context'

//FAN ROUTES
import InviteFriendRoute from './routes/invite-friend.route'
import QuizResultRoute from './routes/quiz-result.route'
import QuizGameplayRoute from './routes/quiz-gameplay.route'
import YourFavouritesRoute from './routes/your-favourites.route'
import ArtistRoute from './routes/artist.route'
import LeaderboardRoute from './routes/leaderboard.route'
import FlashLeaderboardRoute from './routes/flash-leaderboard.route'
import Sanremo2024Route from './routes/sanremo-2024.route'
import FlashLeaderboardRewardsRoute from './routes/flash-leaderboard-rewards.route'
import Fanclub from './routes/fanclub.route'

// ARTIST ROUTES
import FanclubRoute from './routes/fanclub.route.artist'
import FlashLeaderboardsRoute from './routes/flash-leaderboards.route.artist'
import FanclubNameRoute from './routes/fanclub-name.route.artist'
import FanclubCoverRoute from './routes/fanclub-cover.route.artist'
import FanclubPricingRoute from './routes/fanclub-pricing.route.artist'
import FanclubActivatedRoute from './routes/fanclub-activated.route.artist'
import ContentCreationRoute from './routes/content-creation.route.artist'
import MetricsRoute from './routes/metrics.route.artist'
import FanclubSettingsRoute from './routes/fanclub-settings.route.artist'
import FanclubSettingsEditRoute from './routes/fanclub-settings-edit.route.artist'
import FanclubTipsRoute from './routes/fanclub-tips.routes.artist'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Navigate to='/your-favourites' />
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
      },{
        path: '/artist/:artistSlug/fanclub',
        element: <Fanclub />
      }
    ]
  },{
    path: '/artist/:artistSlug/invite-friend',
    element: <InviteFriendRoute />
  },{
    path: '/artist/:artistSlug/flash-leaderboard',
    element: <FlashLeaderboardRoute />,
    children: [
      {
        path: '/artist/:artistSlug/flash-leaderboard/rewards',
        element: <FlashLeaderboardRewardsRoute />
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
    path: '/artist-app/fanclub',
    element: <FanclubRoute />
  },{
    path: '/artist-app/flash-leaderboards',
    element: <FlashLeaderboardsRoute />
  },{
    path: '/artist-app/flash-leaderboard',
    element: <FlashLeaderboardRoute />,
    children: [
      {
        path: '/artist-app/flash-leaderboard/rewards',
        element: <FlashLeaderboardRewardsRoute />
      }
    ]
  },{
    path: '/artist-app/fanclub/name',
    element: <FanclubNameRoute />
  },{
    path: '/artist-app/fanclub/cover',
    element: <FanclubCoverRoute />
  },{
    path: '/artist-app/fanclub/pricing',
    element: <FanclubPricingRoute />
  },{
    path: '/artist-app/fanclub/activated',
    element: <FanclubActivatedRoute />
  },{
    path: '/artist-app/fanclub/settings',
    element: <FanclubSettingsRoute />
  },{
    path: '/artist-app/fanclub/settings/edit',
    element: <FanclubSettingsEditRoute />
  },{
    path: '/artist-app/fanclub/tips',
    element: <FanclubTipsRoute />
  },{
    path: '/artist-app/content-creation',
    element: <ContentCreationRoute />
  },{
    path: '/artist-app/metrics',
    element: <MetricsRoute />
  }
])

function App() {
  return (
    <ArtistsProvider>
      <CurrentFanProvider>
        <CurrentArtistProvider>
          <LeaderboardsProvider>
            <FlashLeaderboardsProvider>
              <FanclubsProvider>
                <RouterProvider router={router} />
              </FanclubsProvider>
            </FlashLeaderboardsProvider>
          </LeaderboardsProvider>
        </CurrentArtistProvider>
      </CurrentFanProvider>
    </ArtistsProvider>
  );
}

export default App