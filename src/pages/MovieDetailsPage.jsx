import { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import css from '../pages/PagesCss/MovieDetailsPage.module.css';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const API_KEY = 'e5344fe190fc187358ffc7a483e920aa';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? '/');

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-U`;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, release_date, vote_average, genres } =
    movieDetails;
  const ganre = [];
  for (const ganreMovie of genres) {
    ganre.push(ganreMovie.name);
  }
  return (
    <div className={css['MovieDetailsBox']}>
      <div className={css['BackBtn']}>
        <NavLink className={css['BackBtnLink']} to={goBack.current}>
          <HiArrowNarrowLeft />
          Go Back
        </NavLink>
      </div>
      <h2>{title}</h2>
      <div className={css['MovieDetails']}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <ul>
          <li>
            <p>User Score: {vote_average}</p>
          </li>
          <li>
            {' '}
            <p>Release Date: {release_date}</p>
          </li>
          <li>
            <h3>Overview:</h3>
            <p>{overview}</p>
          </li>
          <li>
            <h3>Genres</h3>
            <p>{`${ganre}`}</p>
          </li>
        </ul>
      </div>
      <div>
        <ul className={css['CastReviewsBox']}>
          <li>
            <NavLink
              className={css['CastReviews']}
              to="cast"
              state={{ movieId }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className={css['CastReviews']}
              to="reviews"
              state={{ movieId }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
