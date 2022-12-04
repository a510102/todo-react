import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Todo = lazy(() => import('./pages/Todo'));
const Loading = lazy(() => import('./pages/Loading'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='todo' element={<Todo />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
