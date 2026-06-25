import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Find Movies You'll Enjoy",
        allMovies: 'All Movies',
        searchPlaceholder: 'Search movies...',
        loading: 'Loading...',
        error: 'Error fetching movies. Please try again later.',
        allGenres: 'All Genres',
        allYears: 'All Years',
        anyRating: 'Any Rating',
        reset: 'Reset',
      }
    },
    ar: {
      translation: {
        title: 'اعثر على أفلام تستمتع بها',
        allMovies: 'جميع الأفلام',
        searchPlaceholder: 'ابحث عن أفلام...',
        loading: 'جاري التحميل...',
        error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
        allGenres: 'جميع الأنواع',
        allYears: 'جميع السنوات',
        anyRating: 'أي تقييم',
        reset: 'إعادة تعيين',
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
});

export default i18n;