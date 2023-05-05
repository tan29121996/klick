const API_KEY = 'a599bc64ef2a5e72a74993c70332643e';

export default {
  fetchPopular: {
    id: 1,
    title: 'Popular',
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    id: 2,
    title: 'Top Rated',
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchAction: {
    id: 3,
    title: 'Action',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedy: {
    id: 4,
    title: 'Comedy',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorror: {
    id: 5,
    title: 'Horror',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomance: {
    id: 6,
    title: 'Romance',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    id: 7,
    title: 'Mystery',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  fetchSciFi: {
    id: 8,
    title: 'Sci-Fi',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    id: 9,
    title: 'Western',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  fetchAnimation: {
    id: 10,
    title: 'Animation',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  fetchTV: {
    id: 11,
    title: 'TV',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  },
};
