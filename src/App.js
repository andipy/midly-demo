import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './index.css'

import InviteFriendRoute from './routes/invite-friend.route';
import QuizResultRoute from "./routes/quiz-result.route";
import QuizGameplayRoute from "./routes/quiz-gameplay.route";
import YourFavouritesRoute from "./routes/your-favourites.route";
import Sanremo2024Route from "./routes/sanremo-2024.route";

const router = createBrowserRouter([
  {
    path: '/your-favourites',
    element: <YourFavouritesRoute />
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
