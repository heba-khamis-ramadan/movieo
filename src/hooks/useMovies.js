import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState(() => sessionStorage.getItem('searchTerm') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(() => sessionStorage.getItem('searchTerm') || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => parseInt(sessionStorage.getItem('currentPage') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(() => JSON.parse(sessionStorage.getItem('filters') || '{"genre":"","year":"","minRating":""}'));

  const isFirstRender = useRef(true);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // reset page only when search or filters actually change (not on first mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
    sessionStorage.setItem('currentPage', '1');
  }, [debouncedSearchTerm, filters]);

  // save to sessionStorage whenever these change
  useEffect(() => { sessionStorage.setItem('currentPage', currentPage); }, [currentPage]);
  useEffect(() => { sessionStorage.setItem('searchTerm', searchTerm); }, [searchTerm]);
  useEffect(() => { sessionStorage.setItem('filters', JSON.stringify(filters)); }, [filters]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}genre/movie/list`, API_OPTIONS);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.log('Error fetching genres:', error);
    }
  };

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams({
        sort_by: 'popularity.desc',
        page,
        ...(filters.genre && { with_genres: filters.genre }),
        ...(filters.year && { primary_release_year: filters.year }),
        ...(filters.minRating && { 'vote_average.gte': filters.minRating }),
      });
      const endpoint = query
        ? `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}discover/movie?${params}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();
      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchGenres(); }, []);
  useEffect(() => { fetchMovies(debouncedSearchTerm, currentPage); }, [debouncedSearchTerm, currentPage, filters]);

  return {
    searchTerm, setSearchTerm,
    errorMessage,
    movieList,
    isLoading,
    currentPage, setCurrentPage,
    totalPages,
    genres,
    filters, setFilters,
  };
};

export default useMovies;