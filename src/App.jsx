import { useEffect, useState } from "react"
import { useDebounce } from "react-use";
import { useTranslation } from 'react-i18next';
import './i18n';
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from './components/LanguageToggle';

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
                      method: 'GET',
                      headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_KEY}`
                      }
                    };

const App = () => {
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

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoding(true);
    setErrorMessage('');

    try {
      const endpoint = query? `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}&page=${page}` 
                            : `${API_BASE_URL}discover/movie?sort_by=popularity.desc&page=${page}`;
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
  }, [debouncedsearchTerm, currentPage]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedsearchTerm]);

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

export default App
