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
import { FansProvider } from './contexts/fans.context'
import { ModerationsProvider } from './contexts/moderations.context'
import { ChatsProvider } from './contexts/chats.context'

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
import SubscriptionsSettingsRoute from './routes/subscriptions-settings.route'
import PaymentsInfoRoute from './routes/payments-info.route'
import FanclubForumRoute from './routes/fanclub-forum.route'
import FanclubAllRoute from './routes/fanclub-all.route'
import FanclubPostsRoute from './routes/fanclub-posts.route'
import FanclubEventsRoute from './routes/fanclub-events.route'
import FanclubLettersRoute from './routes/fanclub-letters.route'
import FanclubLeaderboardRoute from './routes/fanclub-leaderboard.route'
import FanLetterCreationRoute from './routes/fan-letter-creation.route'
import FanLetterCreationReviewRoute from './routes/fan-letter-creation-review.route'
import FanclubGroupChatRoute from './routes/fanclub-group-chat.route'
import HomeRoute from './routes/home.route'
import ForumSavedRoute from './routes/forum-saved.route'
import FanclubActivityRoute from './routes/fanclub-activity.route'
import FanclubFlashLeaderboardStatus from './routes/fanclub-flash-leaderboard-status.route'
import FanclubStoreRoute from './routes/fanclub-store.route'
import StoreItemRoute from './routes/store-item.route'
import PostFullScreenNewRoute from './routes/post-full-screen-new.route'
// ARTIST ROUTES
import FanclubRoute from './routes/fanclub.route.artist'
import FlashLeaderboardsRoute from './routes/flash-leaderboards.route.artist'
import ContentCreationRoute from './routes/content-creation.route.artist'
import ContentCreationReviewRoute from './routes/content-creation-review.route.artist'
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
import FanclubPaymentInfoRoute from './routes/fanclub-payment-info.route.artist'
import FanclubDashboardRoute from './routes/fanclub-dashboard.route.artist'
import FanclubDashboardCurrentMonthRoute from './routes/fanclub-dashboard-current-month.route.artist'
import FanclubDashboardLastMonthRoute from './routes/fanclub-dashboard-last-month.route.artist'
import FanclubDashboardGraphRoute from './routes/fanclub-dashboard-graph.route.artist'
import FanclubNotificationsRoute from './routes/fanclub-notifications.route.artist'
import ProfileArtistRoute from './routes/profile.route.artist'
import TermsConditionsArtistsRoute from './routes/terms-and-conditions-artists.route.artist'
import PrivacyPolicyArtistsRoute from './routes/privacy-policy-artists.route.artist'
import CookiePolicyArtistsRoute from './routes/cookie-policy-artists.route.artist'
import FanclubActivationInfoRoute from './routes/fanclub-activation-info.route.artist'
import FanclubActivationPricingRoute from './routes/fanclub-activation-pricing.route.artist'
import PostSettingsRoute from './routes/post-settings.route.artist'
import FanclubManageUsersRoute from './routes/fanclub-manage-users.route.artist'
import ConcertCreationRoute from './routes/concert-creation.route.artist'
import AddStopRoute from './routes/add-stop.route.artist'
import ConcertSettingsRoute from './routes/concert-settings.route.artist'
import ConcertSettingsStopsRoute from './routes/concert-settings-stops.route.artist'
import ChatsRoute from './routes/chats.route.artist'
import UserModerationRoute from './routes/user-moderation.route'
import UserModerationBlockRoute from './routes/user-moderation-block.route'
import UserModerationReportRoute from './routes/user-moderation-report.route'
import PostFullScreenRoute from './routes/post-full-screen.route'
import ChatConcertRoute from './routes/chat-concert.route'
import ChatTourRoute from './routes/chat-tour.route'
import ChatPrivateRoute from './routes/chat-private.route'
import TopicCreationRoute from './routes/topic-creation.route'
import TopicAddHashtagRoute from './routes/topic-add-hashtag.route'
import TopicDetailsRoute from './routes/topic-details.route'
import FanclubPostsRouteArtist from './routes/archived/fanclub-posts.route.artist'
import GroupChatRoute from './routes/group-chat.route.artist'
import UserModerationDeleteRoute from './routes/user-moderation-delete.route'

//ADMIN ROUTES
import FlashLeaderboardsDashboardRoute from './routes/flash-leaderboards.route.admin'
import FlashLeaderboardMetricsDetailRoute from './routes/flash-leaderboard-metrics-detail.route.admin'

//SPOTIFY ROUTES
import SpotifyAcceptRoute from './routes/spotify-accept.route.spotify'
import SpotifyLoginRoute from './routes/spotify-login.route.spotify'

import IconTestRoute from './routes/icon-test'


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
		element: <Navigate to='/your-favourites' />
	},{
		path: '/home',
		element: <HomeRoute />
	},{
		path: '/your-favourites',
		element: <YourFavouritesRoute />,
		children: [
			{
				path: 'user-moderation',
				element: <UserModerationRoute />,
			},{
				path: 'user-moderation/block',
				element: <UserModerationBlockRoute />,
			},{
				path: 'user-moderation/report',
				element: <UserModerationReportRoute />,
			},{
				path: 'user-moderation/delete',
				element: <UserModerationDeleteRoute />,
			}
		]
	},{
		path: '/your-favourites/:postId',
		element: <PostFullScreenNewRoute />,
		children: [
			{
				path: 'user-moderation',
				element: <UserModerationRoute />,
			},{
				path: 'user-moderation/block',
				element: <UserModerationBlockRoute />,
			},{
				path: 'user-moderation/report',
				element: <UserModerationReportRoute />,
			},{
				path: 'user-moderation/delete',
				element: <UserModerationDeleteRoute />,
			}
		]
	},{
		path: '/your-favourites/activity',
		element: <FanclubActivityRoute />,
	},{
		path: '/artist/:artistSlug',
		element: <ArtistRoute />,
		children: [
			/* {
				path: '',
				element: <Navigate to='posts' replace />,
			}, */
			{
				path: 'flash-chart',
				element: <FanclubFlashLeaderboardStatus />
			},{
				path: 'forum',
				element: <FanclubForumRoute />
			},{
				path: 'posts',
				element: <FanclubPostsRoute />
			},{
				path: 'events',
				element: <FanclubEventsRoute />
			}, {
				path: 'letters',
				element: <FanclubLettersRoute />
			},{
				path: 'leaderboard',
				element: <FanclubLeaderboardRoute />,
				children: [
					{
						path: 'fan', 
						element: <FanPublicProfileRoute />,
					},
				],
			},{
				path: 'group-chat',
				element: <FanclubGroupChatRoute />,
			},{
				path: 'store',
				element: <FanclubStoreRoute />,
			},{
				path: 'leaderboard-streaming',
				element: <LeaderboardRoute />,
				children: [
					{
						path: 'fan', 
						element: <FanPublicProfileRoute />,
					},
				],
			},{
				path: 'user-moderation',
				element: <UserModerationRoute />,
			},{
				path: 'user-moderation/block',
				element: <UserModerationBlockRoute />,
			},{
				path: 'user-moderation/report',
				element: <UserModerationReportRoute />,
			},{
				path: 'user-moderation/delete',
				element: <UserModerationDeleteRoute />,
			}
		/* MAJOR CHANGE */
		  /* {
			path: '/artist/:artistSlug/fanclub',
			element: <Fanclub />,
			children: [
				{
					path: '',
					element: <Navigate to="dashboard" replace />,
				},{
					path: 'user-moderation',
					element: <UserModerationRoute />,
				},{
					path: 'user-moderation/block',
					element: <UserModerationBlockRoute />,
				},{
					path: 'user-moderation/report',
					element: <UserModerationReportRoute />,
				},{
					path: 'forum',
					element: <FanclubForumRoute />
				},{
					path: 'dashboard',
					element: <FanclubAllRoute />
				},{
					path: 'posts',
					element: <FanclubPostsRoute />
				},{
					path: 'events',
					element: <FanclubEventsRoute />
				}, {
					path: 'letters',
					element: <FanclubLettersRoute />
				}, {
					path: 'leaderboard',
					element: <FanclubLeaderboardRoute />,
					children: [
						{
						  path: 'fan', 
						  element: <FanPublicProfileRoute />,
						},
					],
				}

			]
		  } */
		  
		],
	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/letters/creation', */
		path: '/artist/:artistSlug/letters/creation',
		element: <FanLetterCreationRoute />,

	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/letters/creation/review', */
		path: '/artist/:artistSlug/letters/creation/review',
		element: <FanLetterCreationReviewRoute />,

	},{
		path: '/artist/:artistSlug/chat',
		element: <ChatPrivateRoute />,
	},{
		path: '/artist/:artistSlug/concert/chat',
		element: <ChatConcertRoute />
	},{
		path: '/artist/:artistSlug/tour/chat',
		element: <ChatTourRoute />
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
			},{
				path: 'fan', 
				element: <FanPublicProfileRoute />,
			}
		]
	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/:postId', */
		path: '/artist/:artistSlug/:postId',
		element: <PostFullScreenNewRoute />,
		children: [
			{
				path: 'user-moderation',
				element: <UserModerationRoute />,
			},{
				path: 'user-moderation/block',
				element: <UserModerationBlockRoute />,
			},{
				path: 'user-moderation/report',
				element: <UserModerationReportRoute />,
			},{
				path: 'user-moderation/delete',
				element: <UserModerationDeleteRoute />,
			}
		]
	},{
		path: '/home/:postId',
		element: <PostFullScreenRoute />,
	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/forum/topic/details', */
		path: '/artist/:artistSlug/forum/topic/details',
		element: <TopicDetailsRoute />,
	},{
		path: '/home/topic/details',
		element: <TopicDetailsRoute />,
	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/dashboard/topic/details', */
		path: '/artist/:artistSlug/dashboard/topic/details',
		element: <TopicDetailsRoute />,
	},{
		/* MAJOR CHANGE */
		/* path: '/artist/:artistSlug/fanclub/forum/topic/creation', */
		path: '/artist/:artistSlug/forum/topic/creation',
		element: <TopicCreationRoute />,
		children: [
			{
				/* MAJOR CHANGE */
				/* path: '/artist/:artistSlug/fanclub/forum/topic/creation/hashtags', */
				path: '/artist/:artistSlug/forum/topic/creation/hashtags',
				element: <TopicAddHashtagRoute />
			}
		]
	},{
		path: '/artist/:artistSlug/forum/saved',
		element: <ForumSavedRoute />,
	},{
		path: '/artist/:artistSlug/store/item',
		element: <StoreItemRoute />
	},{
		path: '/artist/:artistSlug/forum/saved/topic/details',
		element: <TopicDetailsRoute />,
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
		element: <FanclubRoute />,
		children: [
			{
				path: '',
				element: <Navigate to="posts" replace />,
			},{
				path: '/artist-app/fanclub/activation/terms',
				element: <FanclubTermsRoute />
			},{
				path: '/artist-app/fanclub/edit-post/:postId',
				element: <PostSettingsRoute />
			},{
				path: '/artist-app/fanclub/edit-post-concert/:concertId',
				element: <ConcertSettingsRoute />,
			},{
				path: '/artist-app/fanclub/edit-post-concert/:concertId/edit-stops',
				element: <ConcertSettingsStopsRoute />,
			},{
				path: '/artist-app/fanclub/user-moderation',
				element: <UserModerationRoute />,
			},{
				path: '/artist-app/fanclub/user-moderation/block',
				element: <UserModerationBlockRoute />,
			},{
				path: '/artist-app/fanclub/user-moderation/report',
				element: <UserModerationReportRoute />,
			},{
				path: '/artist-app/fanclub/user-moderation/delete',
				element: <UserModerationDeleteRoute />,
			},{
				path: 'forum',
				element: <FanclubForumRoute />
			},{
				path: 'dashboard',
				element: <FanclubAllRoute />
			},{
				path: 'posts',
				element: <FanclubPostsRoute />
			},{
				path: 'events',
				element: <FanclubEventsRoute />
			},{
				path: 'store',
				element: <FanclubStoreRoute />,
			}, {
				path: 'letters',
				element: <FanclubLettersRoute />
			}, {
				path: 'leaderboard',
				element: <FanclubLeaderboardRoute />,
				/* children: [
					{
					  path: 'fan', 
					  element: <FanPublicProfileRoute />,
					},
				], */
			},{
				path: 'group-chat',
				element: <FanclubGroupChatRoute />,
			}
		]
	},{
		path: '/artist-app/fanclub/forum/topic/details',
		element: <TopicDetailsRoute />,
	},{
		path: '/artist-app/fanclub/forum/topic/creation',
		element: <TopicCreationRoute />,
		children: [
			{
				path: '/artist-app/fanclub/forum/topic/creation/hashtags',
				element: <TopicAddHashtagRoute />
			}
		]
	},{
		path: '/artist-app/fanclub/:postId',
		element: <PostFullScreenNewRoute />,
		children: [
			{
				path: '/artist-app/fanclub/:postId/edit-post',
				element: <PostSettingsRoute />
			}
		]
	},{
		path: '/artist-app/fanclub/concert/chat',
		element: <ChatConcertRoute />
	},{
		path: '/artist-app/fanclub/tour/chat',
		element: <ChatTourRoute />
	},{
		path: '/artist-app/fanclub/activation/info',
		element: <FanclubActivationInfoRoute />
	},{
		path: '/artist-app/fanclub/activation/pricing',
		element: <FanclubActivationPricingRoute />
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
		path: '/artist-app/fanclub/payment-info',
		element: <FanclubPaymentInfoRoute />
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
		path: '/artist-app/concert-creation',
		element: <ConcertCreationRoute />,
		children: [
			{
				path: '/artist-app/concert-creation/add-stop',
				element: <AddStopRoute />
			}
		]
	},{
		path: '/artist-app/content-creation/post-review',
		element: <ContentCreationReviewRoute />
	},{
		path: '/artist-app/metrics',
		element: <MetricsRoute />
	},{
		path:'/artist-app/fanclub-dashboard',
		element: <FanclubDashboardRoute />,
		children: [
		{
			path: '',
			element: <Navigate to='/artist-app/fanclub-dashboard/last-month' replace />
		},
		{
			path: 'last-month',
			element: <FanclubDashboardLastMonthRoute />
		},
		{
			path: 'current-month',
			element: <FanclubDashboardCurrentMonthRoute />
		},
		{
			path: 'graph',
			element: <FanclubDashboardGraphRoute />
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
	},{
		path: '/spotify-accept',
		element: <SpotifyAcceptRoute />
	},{
		path: '/spotify-login',
		element: <SpotifyLoginRoute />
	},{
		path: '/artist-app/fanclub/activity',
		element: <FanclubNotificationsRoute />
	},{
		path: '/artist-app/fanclub/chats',
		element: <ChatsRoute />
	},{
		path: '/artist-app/fanclub/chats/chat',
		element: <ChatPrivateRoute />,
	},{
		path: '/artist-app/fanclub/chats/group-chat',
		element: <GroupChatRoute />,
	},{
		path: '/artist-app/profile',
		element: <ProfileArtistRoute />
	},{
		path: '/artist-app/terms-and-conditions-artists',
		element: <TermsConditionsArtistsRoute />
	},{
		path: '/artist-app/privacy-policy-artists',
		element: <PrivacyPolicyArtistsRoute />
	},{
		path: '/artist-app/cookie-policy-artists',
		element: <CookiePolicyArtistsRoute />
	},{
		path: '/test',
		element: <IconTestRoute />
	},{
		path: '/artist-app/fanclub/settings/manage-users',
		element: <FanclubManageUsersRoute />
	}, {
		path: '/subscriptions',
		element: <SubscriptionsSettingsRoute />
	}, {
		path: '/payments-info',
		element: <PaymentsInfoRoute />
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
							<ModerationsProvider>
								<ChatsProvider>
									<RouterProvider router={router} />
								</ChatsProvider>
							</ModerationsProvider>
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