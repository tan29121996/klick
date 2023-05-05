import { useState } from 'react';
import {
  StarIcon,
} from '@heroicons/react/solid';

function MovieThumbnailRight({ movie, openModal, setMovieData }) {
  const [isActive, setIsActive] = useState(0);

  const BASE_URL = 'https://image.tmdb.org/t/p/original';

  const openVideo = (data) => {
    openModal(true);
    setMovieData(data);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 24, marginRight: -100 }}>

      <div id='click' style={{ position: 'relative', left: 345, width: 303, height: 170, borderRadius: 10,
        boxShadow: isActive === 1 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
        onMouseOver={() => setIsActive(1)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => openVideo({ title: movie.title, overview: movie.overview, date: movie.release_date, rating: movie.vote_average })}
      >
        <img
          layout='responsive'
          src={
            `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
            `${BASE_URL}${movie.poster_path}`
          }
          style={{ borderRadius: 10, objectFit: 'cover', border: '1px solid #566f92', filter: isActive === 1 ? null : 'brightness(90%)' }}
          width={303} height={170}
        />
        <div style={{
          position: 'absolute',
          top: 119,
          left: 1,
          paddingLeft: 15,
          paddingRight: 15 }}
        >
          <img style={{
            position: 'absolute', top: -17, left: 0,
            width: 303,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            opacity: 0.7 }} src='/images/Assets/Background.png' />

          <img style={{ position: 'absolute', top: -33, left: 0, width: 300, height: 120, opacity: 0.8 }} src='/images/Assets/Glow.png' />

          <p id='movie-text' style={{
            position: 'absolute',
            top: 8,
            fontSize: 15,
            letterSpacing: '1px',
            letterSpacing: '2px',
            textAlign: 'center',
            width: 277,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' }}
          >
            {movie.title || movie.original_name}
          </p>
        </div>

        <div style={{
          position: 'absolute',
          top: 100,
          left: 20,
          height: 11,
          marginTop: 10,
          paddingTop: 10,
          paddingLeft: 27,
          paddingRight: 10 }}
        >
          <StarIcon style={{ position: 'absolute', top: 7, left: 10, color: 'white' }} height={15}/>
          <p id='movie-text' style={{ position: 'relative', top: -15, fontSize: 12 }}>
            {movie.vote_average}{' rating'}
          </p>
        </div>

        <div style={{
          position: 'absolute',
          top: 100,
          right: 20,
          height: 11,
          marginTop: 10,
          paddingTop: 10,
          paddingLeft: 30,
          paddingRight: 10 }}
        >
          <p id='movie-text' style={{ position: 'relative', top: -15, fontSize: 12 }}>
            {movie.release_date || movie.first_air_date}
          </p>
        </div>

        <div style={{ position: 'absolute' , top: 95, right: 131 }}>
          <img style={{
            width: 37, height: 37,
            borderRadius: 37 }}
            src='https://i.imgur.com/Mnj2MNR.png'
          />
          <img style={{
            position: 'absolute', top: 0,
            width: 37, height: 37,
            borderRadius: 37,
            filter: isActive === 1 ? 'brightness(120%)' : null,
            display: isActive === 1 ? 'block' : 'none' ,
            boxShadow: isActive === 1 ? '0px 0px 20px #79ddf9' : null }}
            src='/images/Assets/Play.png'
          />
        </div>
      </div>
    </div>
  )
}

export default MovieThumbnailRight;
