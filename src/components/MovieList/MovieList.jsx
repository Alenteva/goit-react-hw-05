import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css['MoviesItem']}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css['Movies']}
            >
              <h2 className={css['MoviesTitle']}>{movie.title}</h2>
              <p className={css['MoviesReting']}>rating: {movie.popularity}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;
