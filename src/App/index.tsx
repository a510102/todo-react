import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Root from "./routes/root";
import ErrorPage from "./errorPage";

const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  errorElement: <ErrorPage />,
}]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
