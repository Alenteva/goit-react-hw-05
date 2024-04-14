import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MovieCast.module.css';
import { useParams } from 'react-router-dom';

const API_KEY = '361693f4a852f8a277166f7371377e89';

const MovieCast = () => {
  // console.log("movieId in MovieCast:", movieId);
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(url);
        setCast(response.data.cast);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul className={css['CastBox']}>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              width={200}
              height={300}
            />
            <div className={css.nameActor}>
              <p>{actor.name}</p>
              <p>Сharacter: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
