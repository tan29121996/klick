import { useState, useEffect } from 'react';
import requests from '../utils/requests';
import MovieNav from './MovieNav';
import MovieThumbnailLeft from './MovieThumbnailLeft';
import MovieThumbnailRight from './MovieThumbnailRight';

function Movie({ isOpen, openModal, movieData, setMovieData }) {
  const [toggleState, setToggleState] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (toggleState === 1) {
      URL = requests.fetchPopular.url;
    } else if (toggleState === 2) {
      URL = requests.fetchTopRated.url;
    } else if (toggleState === 3) {
      URL = requests.fetchAction.url;
    } else if (toggleState === 4) {
      URL = requests.fetchComedy.url;
    } else if (toggleState === 5) {
      URL = requests.fetchHorror.url;
    } else if (toggleState === 6) {
      URL = requests.fetchRomance.url;
    } else if (toggleState === 7) {
      URL = requests.fetchMystery.url;
    } else if (toggleState === 8) {
      URL = requests.fetchSciFi.url;
    } else if (toggleState === 9) {
      URL = requests.fetchWestern.url;
    } else if (toggleState === 10) {
      URL = requests.fetchAnimation.url;
    } else if (toggleState === 11) {
      URL = requests.fetchTV.url;
    }

    fetch(URL)
    .then((res) => res.json())
    .then(data=> {
      setMovies(data.results);
    })
  }, [toggleState, setMovies]);


  const secondColumnStart = Math.floor(movies.length / 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'scroll' }}>
      <div style={{ position: 'absolute', top: 45, left: 296, width: 670, height: 752, background: 'linear-gradient(#1e203c, #19161f, black)', opacity: 0.5 }} />

      <div style={{ position: 'relative', top: 24 }}>
        <div style={{ left: 20, position:'absolute', height: 170, borderRadius: 20 }}>
          <img
            style={{ borderRadius: 20 }}
            src='/images/Assets/Banner 2.png'
            width={630}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 31 }}>
          <div style={{ position: 'relative', top: 187 }}><MovieNav {...{ setToggleState, toggleState }} /></div>
        </div>

        <div style={{ position: 'relative', top: 209 }}>
          <div style={{ position: 'absolute', top: 0 }}>
            {movies.slice(0,secondColumnStart).map(movie => (
              <MovieThumbnailLeft key={movie.id} {...{ movie, openModal, setMovieData }} />
            ))}
          </div>
          <div>
            {movies.slice(secondColumnStart).map(movie => (
              <MovieThumbnailRight key={movie.id} {...{ movie, openModal, setMovieData }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
