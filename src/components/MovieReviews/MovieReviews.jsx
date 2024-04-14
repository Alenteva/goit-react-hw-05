import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';

const API_KEY = 'e5344fe190fc187358ffc7a483e920aa';

const MovieReviews = () => {
  // console.log("movieId in MovieReviews:", movieId);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(url);
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css['ReviewsBox']}>
          {reviews.map(review => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
