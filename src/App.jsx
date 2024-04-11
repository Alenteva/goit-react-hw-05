import { useState } from 'react';
// import './App.css';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation/Navigation';

import { Routes, Route } from 'react-router-dom';
// import HomePage from 'path/to/pages/HomePage';
// import MovieDetailsPage from 'path/to/pages/MovieDetailsPage';
// import MoviesPage from 'path/to/pages/MoviesPage';
// import NotFoundPage from 'path/to/pages/NotFoundPage';
import css from './App.module.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
