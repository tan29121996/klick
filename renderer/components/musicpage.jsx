import { useState, useEffect } from 'react';
import MusicPlayer from './Music';
import Song from './Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faStepBackward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { HeartIcon, PlayIcon } from '@heroicons/react/outline';
import useSpotify from '../utils/useSpotify';
import { useHorizontalScroll } from '../utils/HorizontalScroll';

function Music() {
  const spotifyApi = useSpotify();
  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [trackId, setTrackId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [toggleState, setToggleState] = useState(0);
  const scrollRef = useHorizontalScroll();


  const setCurrentPlaylist = (id, state) => {
    setPlaylist(id);
    setToggleState(state);
  }

  useEffect(() => {
    spotifyApi.getPlaylist('37i9dQZF1DWVzZlRWgqAGH').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DWVV27DiNWxkR').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('0MSCX9tZWQmitMQsfhvZIl').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('6wjCvkAFovrVIRM8VfZLZG').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('0cc8YMQWsSzODyTpdVB6mI').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('4kw9kdjzx1UmyWvpysl0y2').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DXc8kgYqQLMfH').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DXbYM3nMM0oPk').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DWWMOmoXKqHTD').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DXdPec7aLTmlC').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DX0s5kDXi1oC5').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZF1DWT1y71ZcMPe5').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZEVXbLiRSasKsNU9').then((data) => {setPlaylists(current => [...current, data.body])});
    spotifyApi.getPlaylist('37i9dQZEVXbNG2KDcFcKOF').then((data) => {setPlaylists(current => [...current, data.body])});

  }, [spotifyApi]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', height: 752, overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <img
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: 670, height: 752,
            objectFit: 'cover',
            opacity: 0.3
          }}
          src='/images/Assets/Backdrop2.jpg'
        />
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: 670, height: 752,
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))'
          }}
        >
          <img style={{ position: 'absolute', top: 0, width: 668, opacity: 0.5 }} src='/images/Assets/Glow.png' />
          <img style={{ position: 'absolute', top: 105, width: 400, opacity: 0.3 }} src='/images/Assets/wave.png' />
          <div style={{ width: 668, height: 100, background: 'linear-gradient(rgba(0, 0, 0, 0.7), transparent)' }} />
        </div>

        <div style={{ position:'absolute', top: 2, left: -52, width: '100%', borderRadius: 20 }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: 775,
            display: 'flex',
            justifyContent: 'center' }}
          >
            <div style={{
              position: 'absolute',
              top: 18, left: 52,
              width: 670,
              height: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center' }}
            >
              <div style={{ width: 195, marginTop: 8, paddingLeft: 30, color: 'lightgrey' }}>
                <p style={{ width: 72, padding: 7, fontSize: 14, textAlign: 'center', borderRadius: 20, background: 'linear-gradient(#54436d, #392b56)'}}>
                  Featured
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <img style={{ height: 45, paddingTop: 2 }}/>
                <img style={{ height: 50, filter: 'hue-rotate(270deg) brightness(140%)' }} src='/images/Assets/Music Banner.png' />
              </div>

              <div style={{ width: 195, display: 'flex', justifyContent: 'end', marginTop: 8, paddingRight: 30, color: 'lightgrey' }}>
                <p id='click' style={{ width: 125, padding: 7, fontSize: 14, textAlign: 'center', borderRadius: 20, background: 'linear-gradient(#54436d, #392b56)'}}>
                  {'Scroll for more >'}
                </p>
              </div>
            </div>

            <div ref={scrollRef} style={{ position: 'relative', top: 5, display: 'flex', width: 665, height: 200, overflowX: 'auto' }}>
              {playlists?.map((list, i) =>
                <div style={{ position: 'relative', top: 62, left: 24, marginRight: 27 }}>
                  <img id='click' style={{
                    width: 130, height: 130,
                    borderRadius: 10,
                    objectFit: 'cover',
                    border: '2px solid #8c74b4',
                    boxShadow: '0px 0px 20px black' }}
                    src={list?.images?.[0]?.url}
                    onClick={() => setCurrentPlaylist(list, i+1)}
                    onMouseOver={({target}) => target.style.boxShadow = '0px 0px 10px #8c74b4'}
                    onMouseOut={({target}) => target.style.boxShadow = '0px 0px 20px black'}
                  />
                  {toggleState === (i+1) ?
                    (<div style={{
                      position: 'absolute',
                      top: 2, left: 2,
                      width: 130, height: 130,
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(124, 97, 177, 0.8)',
                      color: 'white' }}
                    >
                      <p style={{ width: 100, marginTop: 0, marginBottom: 7, letterSpacing: '2px', fontSize: 14, textAlign: 'center' }}>
                        Selected
                      </p>
                      <FontAwesomeIcon icon={faPlay} style={{ fontSize: 25, textAlign: 'center' }} />
                    </div>
                  ) : null}
                </div>
              )}
              <div style={{ marginRight: 21 }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 222, width: 616, height: 433, backgroundColor: 'rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
            <img style={{ width: '100%', height: 460, borderRadius: 15, opacity: 0.3, filter: 'brightness(150%)' }} src='/images/Assets/Modal.png' />
          </div>

          <div style={{ position: 'absolute', top: 217, width: 616, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ marginTop: 20, marginLeft: 20, width: 40, height: 40 }}>
              <img id='click' style={{
                width: 40, height: 40,
                borderRadius: 40,
                boxShadow: '0px 0px 10px #120e1e' }}
                src='/images/Assets/Test Button.png'
                onMouseOver={({target}) => target.style.filter = 'brightness(150%)'}
                onMouseOut={({target}) => target.style.filter = 'brightness(100%)'}
              />
              <FontAwesomeIcon id='click'
                icon={faStepBackward}
                color='lightgrey'
                style={{ position: 'absolute', marginTop: 11, left: 34 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img style={{ height: 36, borderRadius: 2, marginRight: 15, border: playlist.length !== 0 ? '2px solid #999bac' : null }}
                src={playlist?.images?.[0]?.url}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p id='non-select' style={{ color: '#999bac', marginTop: 15 }}>{playlist?.tracks?.total}{playlist.length !== 0 ? ' songs' : null}</p>
                <p id='non-select' style={{
                  width: '100%',
                  fontSize: 18,
                  color: 'lightgrey',
                  marginTop: -13,
                  letterSpacing: '2px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap' }}
                >
                  {playlist?.name}
                </p>
              </div>
            </div>
            <div style={{ marginTop: 20, marginRight: 20, width: 40, height: 40 }}>
              <img id='click' style={{
                width: 40, height: 40,
                borderRadius: 40,
                boxShadow: '0px 0px 10px #120e1e' }}
                src='/images/Assets/Test Button.png'
                onMouseOver={({target}) => target.style.filter = 'brightness(150%)'}
                onMouseOut={({target}) => target.style.filter = 'brightness(100%)'}
              />
              <FontAwesomeIcon id='click'
                icon={faStepForward}
                color='lightgrey'
                style={{ position: 'absolute', marginTop: 11, right: 35 }}
              />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 292, height: 361, overflowY: 'scroll' }}>
            {playlist?.tracks?.items?.map((track, i) =>
              <Song song={playlist?.tracks?.items?.[i]} order={i} setTrackId={setTrackId} setPlaying={setPlaying} />)
            }
          </div>
          {playlist.length !== 0 ? null :
            <div id='non-select'
              style={{
                position: 'absolute',
                top: 222, width: 200, height: 455,
                display: 'flex',
                fontSize: 14,
                textAlign: 'center', alignItems: 'center',
                letterSpacing: '2px',
                lineHeight: 1.5,
                color: 'lightgrey' }}
            >
              No playlist selected. Select a playlist from the top to continue.
            </div>
          }
        </div>

        <div style={{ position: 'relative', top: 756 }}>
          <MusicPlayer {...{ setTrackId, trackId }}/>
        </div>
      </div>
    </div>
  );
};

export default Music;
