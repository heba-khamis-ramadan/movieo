import { useTranslation } from 'react-i18next';
import useMovies from '../hooks/useMovies';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import FilterForm from '../components/FilterForm';

const Home = () => {
  const { t } = useTranslation();
  const {
    searchTerm, setSearchTerm,
    errorMessage,
    movieList,
    isLoading,
    currentPage, setCurrentPage,
    totalPages,
    genres,
    filters, setFilters,
  } = useMovies();

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
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>{movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}</ul>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </section>
      </div>
    </main>
  );
};

export default Home;