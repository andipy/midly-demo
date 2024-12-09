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
import { LiveQuizProvider } from './contexts/live-quiz.context'

//FAN ROUTES
import InviteFriendRoute from './routes/invite-friend.route'
import QuizResultRoute from './routes/quiz-result.route'
import QuizGameplayRoute from './routes/quiz-gameplay.route'
import YourFavouritesRoute from './routes/your-favourites.route'
import ArtistRoute from './routes/artist.route'
import LeaderboardRoute from './routes/leaderboard.route'
import FlashLeaderboardRoute from './routes/flash-leaderboard.route'
import Sanremo2024Route from './routes/sanremo-2024.route'
import FlashLeaderboardRulesRoute from './routes/flash-leaderboard-rules.route'
import FlashLeaderboardExplanationRoute from './routes/flash-leaderboard-explanation.route'
import Fanclub from './routes/fanclub.route'
import SearchRoute from './routes/search.route'
import ProfileRoute from './routes/profile.route'
import UserInfoRoute from './routes/user-info.route'
import FaqRoute from './routes/faq.route'
import TermsConditionsRoute from './routes/terms-conditions-fans.route'
import PrivacyPolicyRoute from './routes/privacy-policy-fans.route'
import CookiePolicyRoute from './routes/cookie-policy-fans.route'
import UserInfoFieldRoute from './routes/user-info-field.route'
import UserInfoFieldModifyRoute from './routes/user-info-field-modify.route'
import LiveQuizRoute from './routes/live-quiz.route'
import LiveQuizResultRoute from './routes/live-quiz-result.route'
import RegistrationRoute from './routes/registration.route'
import RecoverPasswordRoute from './routes/recover-password.route'
import BadgesRoute from './routes/badges.route'
import PersonalUserPointsRoute from './routes/personal-user-points.route'
import FanPublicProfileRoute from './routes/fan-public-profile.route'
import ShowCommentsRoute from './routes/show-comments.route'

// ARTIST ROUTES
import FanclubRoute from './routes/fanclub.route.artist'
import FlashLeaderboardsRoute from './routes/flash-leaderboards.route.artist'
import FanclubPricingRoute from './routes/fanclub-pricing.route.artist'
import ContentCreationRoute from './routes/content-creation.route.artist'
import MetricsRoute from './routes/metrics.route.artist'
import FanclubSettingsRoute from './routes/fanclub-settings.route.artist'
import FanclubSettingsEditRoute from './routes/fanclub-settings-edit.route.artist'
import FanclubTipsRoute from './routes/fanclub-tips.routes.artist'
import LoadersRoute from './routes/loaders.route'
import LoadingRoute from './routes/loading.route'
import LoginRoute from './routes/login.route'
import Cool1Route from './routes/cool-1.route'
import Cool2Route from './routes/cool-2.route'
import FanclubTermsRoute from './routes/fanclub-terms.route.artist'
import FanclubInfoRoute from './routes/fanclub-info.route.artist'
import FanclubPaymentInfoRoute from './routes/fanclub-payment-info.route.artist'
import EarningsDashboardRoute from './routes/earnings-dashboard.route.artist'
import EarningsCurrentMonthRoute from './routes/earnings-current-month.route.artist'
import EarningsLastMonthRoute from './routes/earnings-last-month.route.artist'
import EarningsGraphRoute from './routes/earnings-graph.route.artist'
import FanclubNotificationsRoute from './routes/fanclub-notifications.route.artist'
import ProfileArtistRoute from './routes/profile.route.artist'
import TermsConditionsArtistsRoute from './routes/terms-and-conditions-artists.route.artist'
import PrivacyPolicyArtistsRoute from './routes/privacy-policy-artists.route.artist'
import CookiePolicyArtistsRoute from './routes/cookie-policy-artists.route.artist'

//ADMIN ROUTES
import FlashLeaderboardsDashboardRoute from './routes/flash-leaderboards.route.admin'
import FlashLeaderboardMetricsDetailRoute from './routes/flash-leaderboard-metrics-detail.route.admin'


//SPOTIFY ROUTES
import SpotifyAcceptRoute from './routes/spotify-accept.route.spotify'
import SpotifyLoginRoute from './routes/spotify-login.route.spotify'
import { FansProvider } from './contexts/fans.context'

//TEST ROUTES
import NewComponentsTestRoute from './routes/new-components-test.route'

const router = createBrowserRouter([
	{
		path: '/loaders',
		element: <LoadersRoute />
	},{
		path: '/loading',
		element: <LoadingRoute />
	},{
		path: '/login',
		element: <LoginRoute />
	},{
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
			element: <LeaderboardRoute />,
			children: [
			  {
				path: 'fan', 
				element: <FanPublicProfileRoute />,
			  },
			],
		  },
		  {
			path: '/artist/:artistSlug/fanclub',
			element: <Fanclub />,
		  },
		],
	},{
		path: '/artist/:artistSlug/invite-friend',
		element: <InviteFriendRoute />
	},{
		path: '/artist/:artistSlug/flash-leaderboard',
		element: <FlashLeaderboardRoute />,
		children: [
		{
			path: '/artist/:artistSlug/flash-leaderboard/rules',
			element: <FlashLeaderboardRulesRoute />
		}
		]
	},{
		path: '/flash-leaderboard-explanation',
		element: <FlashLeaderboardExplanationRoute />,
	},{
		path: '/sanremo-2024',
		element: <Sanremo2024Route />
	},{
		path: '/quiz-result-unactive',
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
			path: '/artist-app/flash-leaderboard/rules',
			element: <FlashLeaderboardRulesRoute />
		}
		]
	},{
		path: '/artist-app/fanclub/terms-and-conditions',
		element: <FanclubTermsRoute />
	},{
		path: '/artist-app/fanclub/info',
		element: <FanclubInfoRoute />
	},{
		path: '/artist-app/fanclub/payment-info',
		element: <FanclubPaymentInfoRoute />
	},{
		path: '/artist-app/fanclub/pricing',
		element: <FanclubPricingRoute />
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
	},{
		path:'/artist-app/earnings-dashboard',
		element: <EarningsDashboardRoute />,
		children: [
		{
			path: '',
			element: <Navigate to="/artist-app/earnings-dashboard/lastMonth" replace />
		},
		{
			path: 'lastMonth',
			element: <EarningsLastMonthRoute />
		},
		{
			path: 'currentMonth',
			element: <EarningsCurrentMonthRoute />
		},
		{
			path: 'graph',
			element: <EarningsGraphRoute />
		}
		]

	},{
		path: '/cool/1',
		element: <Cool1Route />
	},{
		path: '/cool/2',
		element: <Cool2Route />
	},{
		path: '/search',
		element: <SearchRoute />
	},{
		path: '/profile',
		element: <ProfileRoute />
	},{
		path:'/user-info',
		element: <UserInfoRoute />
	},{
		path: '/faq',
		element: <FaqRoute />
	},{
		path: '/terms-and-conditions-fans',
		element: <TermsConditionsRoute />
	},{
		path: '/privacy-policy-fans',
		element: <PrivacyPolicyRoute />
	},{
		path: '/cookie-policy-fans',
		element: <CookiePolicyRoute />
	},{
		path: '/user-info-field',
		element: <UserInfoFieldRoute />
	},{
		path: '/user-info-field-modify',
		element: <UserInfoFieldModifyRoute />
	},{
		path: '/quiz',
		element: <LiveQuizRoute />
	},{
		path: '/quiz-result',
		element: <LiveQuizResultRoute />
	},{
		path: '/signup',
		element: <RegistrationRoute />
	},{
		path: '/recover-password',
		element: <RecoverPasswordRoute />
	},{
		path: '/flash-leaderboards-admin',
		element: <FlashLeaderboardsDashboardRoute />
	},{
		path: '/flash-leaderboards-admin/flash-leaderboard-metrics-detail',
		element: <FlashLeaderboardMetricsDetailRoute />
	},{
		path: '/badges',
		element: <BadgesRoute />
	},{
		path: '/personal-user-points',
		element: <PersonalUserPointsRoute />
	}, {
		path: '/spotify-accept',
		element: <SpotifyAcceptRoute />
	}, {
		path: '/spotify-login',
		element: <SpotifyLoginRoute />
	}, {
		path: '/new-components-test',
		element: <NewComponentsTestRoute />,
		children: [
			{
				path: '/new-components-test/comments',
				element: <ShowCommentsRoute />,
			}
		]
	}, {
		path: '/artist-app/fanclub/activity',
		element: <FanclubNotificationsRoute />
	}, {
		path: '/artist-app/profile',
		element: <ProfileArtistRoute />
	}, {
		path: '/artist-app/terms-and-conditions-artists',
		element: <TermsConditionsArtistsRoute />
	}, {
		path: '/artist-app/privacy-policy-artists',
		element: <PrivacyPolicyArtistsRoute />
	},  {
		path: '/artist-app/cookie-policy-artists',
		element: <CookiePolicyArtistsRoute />
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
					<LiveQuizProvider>
						<FansProvider>
							<RouterProvider router={router} />
						</FansProvider>
					</LiveQuizProvider>
				</FanclubsProvider>
				</FlashLeaderboardsProvider>
			</LeaderboardsProvider>
			</CurrentArtistProvider>
		</CurrentFanProvider>
		</ArtistsProvider>
	)
}

export default App