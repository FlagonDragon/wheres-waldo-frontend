import Game from './components/Game.jsx';
import Home from './components/Home.jsx';
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "game",
    element: <Game />,
    errorElement: <ErrorPage />
  },
];

export default routes;