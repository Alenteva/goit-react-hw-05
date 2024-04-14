import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';
import css from '../pages/PagesCss/HomePages.module.css';

// const TOKEN =
//   eyJhbGciOiJIUzI1NiJ9
//     .eyJhdWQiOiJlNTM0NGZlMTkwZmMxODczNThmZmM3YTQ4M2U5MjBhYSIsInN1YiI6IjY2MTQ2NWFiMTVhNGExMDE3ZGY3YmRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
//     .LpbcLScASVhJYlz81u8UhZy1t8vaz - DfCRhgx4mYweg;

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url =
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
      const options = {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTM0NGZlMTkwZmMxODczNThmZmM3YTQ4M2U5MjBhYSIsInN1YiI6IjY2MTQ2NWFiMTVhNGExMDE3ZGY3YmRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LpbcLScASVhJYlz81u8UhZy1t8vaz-DfCRhgx4mYweg',
        },
      };
      try {
        const response = await axios.get(url, options);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div className={css['HomePageBox']}>
      <h1>Trending Movies</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
};
export default HomePage;
