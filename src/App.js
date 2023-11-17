import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './index.css'

import InviteFriend from './routes/invite-friend.route';
import QuizResultRoute from "./routes/quiz-result.route";
import QuizGameplayRoute from "./routes/quiz-gameplay.route";

const router = createBrowserRouter([
  {
    path: '/',
    element: <InviteFriend />
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
