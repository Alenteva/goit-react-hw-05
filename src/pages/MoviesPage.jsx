import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import css from '../components/SearchBar/SearchBar.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTM0NGZlMTkwZmMxODczNThmZmM3YTQ4M2U5MjBhYSIsInN1YiI6IjY2MTQ2NWFiMTVhNGExMDE3ZGY3YmRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LpbcLScASVhJYlz81u8UhZy1t8vaz-DfCRhgx4mYweg';

  const getFilmsSearch = async (query, page = 1) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const params = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(url, params);

      return response.data;
    } catch (error) {
      toast.error('An error occurred while fetching movies');
    }
  };
  useEffect(() => {
    setSearchResults([]);
    const searchData = async (query, page) => {
      try {
        const response = await getFilmsSearch(query, page);
        if (response && response.results) {
          setSearchResults(response.results);
          setTotalPages(response.total_pages);

          if (!response.total_results) {
            toast(
              'Sorry, we have not found the films for your request. Try to write it differently.',
              {
                duration: 5000,
              }
            );
          } else {
            toast.success(`Wow! We found ${response.total_results} films`);
          }
        }
      } catch (error) {
        toast.error(error);
      }
    };

    if (searchQuery) {
      searchData(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main>
      <section>
        <SearchBar
          onSubmit={query => setSearchParams({ search: query })}
          initialValue={searchQuery || ''}
        />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={
            {
              // className: css.toastTextCenter,
            }
          }
        />
        {searchResults.length !== 0 && <MovieList movies={searchResults} />}
        {searchResults.length !== 0 && (
          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
export default MoviesPage;
