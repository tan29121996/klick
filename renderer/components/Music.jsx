import { useCallback, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faExpand } from '@fortawesome/free-solid-svg-icons';
import { VolumeUpIcon, VolumeOffIcon, XIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import useSpotify from '../utils/useSpotify';

function MusicPlayer({ setTrackId, trackId }) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [songInfo, setSongInfo] = useState(null);

  const [isActive, setIsActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [trackTime, setTrackTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setMute] = useState(false);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlay = () => {
    spotifyApi.play({ uris: [songInfo?.track?.uri] });
  }

  const handlePause = () => {
    spotifyApi.pause();
  }

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (trackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then(res => res.json());

        setSongInfo(trackInfo);
      }
    }

    fetchSongInfo();

    if (spotifyApi.getAccessToken() && !trackId) {
      fetchCurrentSong();
    }
  }, [trackId, spotifyApi, session]);

  return (
    <div style={{ width: 670, justifyContent: 'center' }}>
      <div style={{ width: '100%' }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center' }}
        >
          {isActive === 0 && (<img
            src='/images/Assets/Bar.png'
            style={{
              position: 'absolute',
              bottom: 5,
              width: 1021,
              objectFit: 'cover'
            }}
          />)}
          {isActive === 1 && (<img
            src='/images/Assets/BarHover.png'
            style={{
              position: 'absolute',
              bottom: 5,
              width: 1021,
              objectFit: 'cover'
            }}
          />)}
          {isActive === 2 && (<img
            src='/images/Assets/BarPause.png'
            style={{
              position: 'absolute',
              bottom: 5,
              width: 1021,
              objectFit: 'cover'
            }}
          />)}
          {isActive === 3 && (<img
            src='/images/Assets/BarPauseHover.png'
            style={{
              position: 'absolute',
              bottom: 5,
              width: 1021,
              objectFit: 'cover'
            }}
          />)}

          {playing ? (<div id='click' style={{
            position: 'relative',
            top: -50,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'}}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(2)}
            onClick={handlePause}
          >
            <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Play.png' />
            <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Playing.png' />
          </div>) :
          (<div id='click' style={{
            position: 'relative',
            top: -50,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'}}
            onMouseOver={() => setIsActive(1)}
            onMouseOut={() => setIsActive(0)}
            onClick={handlePlay}
          >
            <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Play.png' />
            <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Playing.png' />
          </div>)}

          <FontAwesomeIcon id='click'
            icon={faBackward}
    				color='rgba(194, 195, 205, 0.8)'
            style={{ position: 'absolute', left: 278, fontSize: 20, top: -60 }}
            onMouseOver={({target})=>target.style.color='white'}
            onMouseOut={({target})=>target.style.color='rgba(194, 195, 205, 0.8)'}

    			/>
          <FontAwesomeIcon id='click'
            icon={faForward}
            color='rgba(194, 195, 205, 0.8)'
            style={{ position: 'absolute', right: 278, fontSize: 20, top: -60 }}
            onMouseOver={({target})=>target.style.color='white'}
            onMouseOut={({target})=>target.style.color='rgba(194, 195, 205, 0.8)'}

          />
          <p id='non-select' style={{ position: 'absolute', left: 415.5, top: -60, fontSize: 14, color: 'white' }}>{songInfo ? (Math.floor(songInfo?.duration_ms / 60000) + ":" + ("0" + Math.floor((songInfo?.duration_ms % 60000)/1000)).slice(-2)) : '0:00'}</p>
          <p id='non-select' style={{ position: 'absolute', right: 420.5, top: -60, fontSize: 14, color: 'white' }}>0:00</p>

          <img style={{
            position: 'absolute',
            bottom: 15, left: 10,
            width: 32, height: 32,
            borderRadius: 32,
            backgroundColor: 'white',
            border: '8px solid #202020',
            boxShadow: '0px 0px 20px black' }}
            src={songInfo?.album?.images?.[0]?.url}
          />

          <p id='non-select' style={{
            position: 'absolute',
            left: 70,
            top: -61,
            width: 140,
            fontSize: 14,
            color: 'white',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' }}
          >
            {songInfo ? songInfo?.name : 'No song selected'}
          </p>

          <div id='click'
            style={{ position: 'absolute', right: 135, top: -50 }}

          >
            {isMute ?
              (<VolumeOffIcon
                style={{ width: 25, color:'white' }}
              />) :
              (<VolumeUpIcon
                style={{ width: 25, color:'white' }}
              />)}
          </div>

          <input
            type='range'
            min={0}
            max={1}
            step={0.02}
            value={volume}
            style={{ position: 'absolute', right: 20, top: -46 }}
            onChange={e => {
              setVolume(e.target.valueAsNumber)
            }}
          />
        </div>

        <div style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'}}
        >
           <div style={{
             position: 'absolute',
             top: 20,
             width: 670,
             height: 7,
             marginTop: 28,
             background: 'linear-gradient(to right, #7a8b9c, #c8b0e0)',
             borderRadius: 5 }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                width: `${progress}%`,
                height: '100%',
                borderRadius: 5,
                background: 'linear-gradient(to right, #e5194f, #8e18ee)' }}/>
              <input
                id='slider'
                type='range'
                min={0}
                max={trackTime}
                step={5}
                value={currentTime}
                style={{ position: 'absolute', top: -3, marginLeft: -0.5, width: 959, height: '100%' }}
                onChange={e => {seek(e.target.valueAsNumber)}}
              />
           </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer;
