import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom';
import { useDebounce } from "react-use";
import { useTranslation } from 'react-i18next';
import './i18n';
import MovieDetails from './pages/MovieDetails';
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from './components/LanguageToggle';
import FilterForm from './components/FilterForm';


const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
                      method: 'GET',
                      headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_KEY}`
                      }
                    };

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedsearchTerm, setDebouncedSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Translation
  const { t, i18n } = useTranslation();

  // Filter
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minRating: ''
  });

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}genre/movie/list`, API_OPTIONS);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.log('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoding(true);
    setErrorMessage('');

    try {
      const params = new URLSearchParams({
        sort_by: 'popularity.desc',
        page,
        ...(filters.genre && { with_genres: filters.genre }),
        ...(filters.year && { primary_release_year: filters.year }),
        ...(filters.minRingRating && { 'vote_average.gte': filters.minRating }),
      });
      const endpoint = `${API_BASE_URL}discover/movie?${params}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error("Faild to fetch movies");
      }

      const data = await response.json();

      if(data.Response === 'false'){
        setErrorMessage(data.Error || 'Faild to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 1);
      
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedsearchTerm, currentPage);
  }, [debouncedsearchTerm, currentPage, filters]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedsearchTerm, filters]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <ThemeToggle />
          <LanguageToggle />
          
          <img src="/hero-img.png" alt="Movies Posters" />
          <h1>{t('title')}</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterForm filters={filters} setFilters={setFilters} genres={genres} />
        </header>

        <section className="all-movies">
          <h2 className="mt-10">{t('allMovies')}</h2>
          { isLoding ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul> { movieList.map((movie) =>(
              <MovieCard key={movie.id} movie={movie} />
            ))}
            </ul>
          )}

          <Pagination currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage} />
        </section>
      </div>
    </main>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App
