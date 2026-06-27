import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Find Movies You'll Enjoy",
        allMovies: 'All Movies',
        searchPlaceholder: 'Start Searching ... ',
        loading: 'Loading...',
        error: 'Error fetching movies. Please try again later.',
        allGenres: 'All Genres',
        allYears: 'All Years',
        anyRating: 'Any Rating',
        reset: 'Reset',
        dark: 'Dark',
        light: 'Light',
        cinema: 'Cinema',
        forest: 'Forest',
        barbie: 'Barbie',
        back: 'Back',
        minutes: 'min',
        language: 'Language',
        status: 'Status',
        budget: 'Budget',
        revenue: 'Revenue',
        notAvailable: 'N/A',
      }
    },
    ar: {
      translation: {
        title: 'اعثر على أفلام تستمتع بها',
        allMovies: 'جميع الأفلام',
        searchPlaceholder:'ابدأ البحث ...' ,
        loading: 'جاري التحميل...',
        error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
        allGenres: 'جميع الأنواع',
        allYears: 'جميع السنوات',
        anyRating: 'أي تقييم',
        reset: 'إعادة تعيين',
        dark: 'داكن',
        light: 'فاتح',
        cinema: 'سينما',
        forest: 'غابة',
        barbie: 'باربي',
        back: 'رجوع',
        minutes: 'دقيقة',
        language: 'اللغة',
        status: 'الحالة',
        budget: 'الميزانية',
        revenue: 'الإيرادات',
        notAvailable: 'غير متاح',
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
});

export default i18n;