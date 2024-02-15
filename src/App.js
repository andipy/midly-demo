import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import './index.css'

import InviteFriendRoute from './routes/invite-friend.route';
import QuizResultRoute from "./routes/quiz-result.route";
import QuizGameplayRoute from "./routes/quiz-gameplay.route";
import YourFavouritesRoute from "./routes/your-favourites.route";
import ArtistRoute from "./routes/artist.route";
import LeaderboardRoute from "./routes/leaderboard.route";
import LeaderboardFlashRoute from "./routes/leaderboard-flash.route";
import Sanremo2024Route from "./routes/sanremo-2024.route";

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
    path: '/artist/:artistSlug/leaderboard-flash',
    element: <LeaderboardFlashRoute />
  },{
    path: '/sanremo-2024',
    element: <Sanremo2024Route />
  },{
    path: '/invite-friend',
    element: <InviteFriendRoute />
  },{
    path: '/quiz-result',
    element: <QuizResultRoute />
  },{
    path: '/quiz-gameplay',
    element: <QuizGameplayRoute />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
