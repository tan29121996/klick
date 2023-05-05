import { useState, useEffect } from 'react';
import useSpotify from '../utils/useSpotify';

function Song({ order, song, setTrackId, setPlaying }) {
  const spotifyApi = useSpotify();
  const [isActive, setIsActive] = useState(0);

  const playSong = () => {
    setTrackId(song?.track?.id);
    setPlaying(true);
    //spotifyApi.play({ uris: [song?.track?.uri] })
  }

  return (
    <div id='click' style={{
      width: 616,
      height: 59.3,
      borderTop: '1px solid #6B5684',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: isActive === 1 ? 'white' : 'lightgrey' }}
      onMouseOver={() => setIsActive(1)}
      onMouseOut={() => setIsActive(0)}
      onClick={playSong}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p style={{ marginLeft: 5, marginRight: 10, width: 30, textAlign: 'center', color: '#999bac' }}>{order + 1}</p>
        <img style={{ width: 30, height: 30, marginRight: 10, backgroundColor: 'white', borderRadius: 5 }}
          src={song?.track?.album?.images?.[0]?.url}/>
        <div style={{ width: 220 }}>
          <p style={{ fontSize: 14, margin: 0, paddingRight: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {song?.track?.name}
          </p>
          <p style={{ fontSize: 14, margin: 0, paddingRight: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#999bac' }}>
            {'by '}{song?.track?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      <p style={{ width: 200, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#999bac' }}>
        {song?.track?.album?.name}
      </p>
      <p style={{ width: 50, textAlign: 'right', marginRight: 25, color: '#999bac' }}>
        {Math.floor(song?.track?.duration_ms / 60000) + ":" + ("0" + Math.floor((song?.track?.duration_ms % 60000)/1000)).slice(-2)}
      </p>
    </div>
  );
}

export default Song;
