import { useTranslation } from 'react-i18next';

const FilterForm = ({ filters, setFilters, genres }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ genre: '', year: '', minRating: '' });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="filter-form">
      {/* Genre */}
      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">{t('allGenres')}</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>

      {/* Year */}
      <select name="year" value={filters.year} onChange={handleChange}>
        <option value="">{t('allYears')}</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Min Rating */}
      <select name="minRating" value={filters.minRating} onChange={handleChange}>
        <option value="">{t('anyRating')}</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>

      {/* Reset */}
      <button onClick={handleReset}>{t('reset')}</button>
    </div>
  );
};

export default FilterForm;