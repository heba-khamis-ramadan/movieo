import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}movie/${id}`, API_OPTIONS);

        if (!response.ok) throw new Error('Failed to fetch movie');

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setErrorMessage('Failed to load movie details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <p className="text-red-500 text-center mt-10">{errorMessage}</p>;

  return (
    <main className="movie-details-page">
      <div className="wrapper">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {t('back')}
        </button>

        <div className="movie-details">
          {/* Poster */}
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'}
            alt={movie.title}
            className="movie-details-poster"
          />

          {/* Info */}
          <div className="movie-details-info">
            <h1>{movie.title}</h1>

            <div className="movie-details-meta">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>•</span>
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>•</span>
              <span>{movie.runtime} {t('minutes')}</span>
            </div>

            {/* Genres */}
            <div className="movie-details-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            {/* Overview */}
            <p className="movie-details-overview">{movie.overview}</p>

            {/* Extra info */}
            <div className="movie-details-extra">
              <p><span>{t('language')}:</span> {movie.original_language?.toUpperCase()}</p>
              <p><span>{t('status')}:</span> {movie.status}</p>
              <p><span>{t('budget')}:</span> {movie.budget ? `$${movie.budget.toLocaleString()}` : t('notAvailable')}</p>
              <p><span>{t('revenue')}:</span> {movie.revenue ? `$${movie.revenue.toLocaleString()}` : t('notAvailable')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;