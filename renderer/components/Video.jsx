import { useCallback, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faExpand } from '@fortawesome/free-solid-svg-icons';
import { VolumeUpIcon, VolumeOffIcon, XIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

const vid1 = 'https://ia804609.us.archive.org/25/items/coven-2020-vose/Coven%202020%20vose.ia.mp4';
const vid2 = 'https://gdurl.com/CdtF';
const vid3 = 'https://gdurl.com/KNfs';
const vid4 = 'https://gdurl.com/tH1o';
const vid5 = 'https://gdurl.com/2hJv';
const vid = 'https://gdurl.com/BIiS';

const src = vid;

function VideoModal({ openModal, movieData }) {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(0);
  const [isHidden, setHidden] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setMute] = useState(false);

  const videoHandler = (control) => {
    if (control === 'play') {
      videoRef.current.play();
      setPlaying(true);
      setIsActive(2);
    } else if (control === 'pause') {
      videoRef.current.pause();
      setPlaying(false);
      setIsActive(0);
    }
  };

  const forward = () => {
    videoRef.current.currentTime += 5;
  };

  const backward = () => {
    videoRef.current.currentTime -= 5;
  };

  const seek = (time) => {
    videoRef.current.currentTime = time;
  }

  const mute = () => {
    if (isMute === false) {
      videoRef.current.muted = true;
      setMute(true);
    } else if (isMute === true) {
      videoRef.current.muted = false;
      setMute(false);
    }
  }

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.volume = volume;
      var vid = document.getElementById('video');
      vid.onloadedmetadata = function() {
        setVideoTime(vid.duration);
        setIsActive(2);
      };
    }
  }, [videoRef, volume]);

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  return (
    <div style={{ width: 1193, height: 795, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'  }}>
      <div style={{
        width: 1025,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        background: 'linear-gradient(#342d4e, #181524)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', margin: 0 }}>
          <div
            style={{ position: 'relative', width: '100%' }}
            onMouseOver={() => setHidden(true)}
            onMouseOut={() => setHidden(false)}
          >
            <video
              id='video'
              autoplay='autoplay'
              ref={videoRef}
              src={src}
              style={{ width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 5, backgroundColor: 'black' }}
              onClick={() => videoHandler('pause')}
            />

            {playing ? null :
            (<div style={{
              position: 'absolute',
              top: 0,
              bottom: 5,
              left:  0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 50,
              borderTopLeftRadius: 6, borderTopRightRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              onClick={() => videoHandler('play')}
            >
              <p style={{
                textAlign: 'center',
                fontSize: 30,
                letterSpacing: '10px',
                color: 'white'}}
              >
                {movieData.title}
              </p>
            </div>)}

            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isHidden ? 1 : 0 }}
            >
              {isActive === 0 && (<img
                src='/images/Assets/Bar.png'
                style={{
                  position: 'absolute',
                  bottom: 5,
                  width: '100%'
                }}
              />)}
              {isActive === 1 && (<img
                src='/images/Assets/BarHover.png'
                style={{
                  position: 'absolute',
                  bottom: 5,
                  width: '100%'
                }}
              />)}
              {isActive === 2 && (<img
                src='/images/Assets/BarPause.png'
                style={{
                  position: 'absolute',
                  bottom: 5,
                  width: '100%'
                }}
              />)}
              {isActive === 3 && (<img
                src='/images/Assets/BarPauseHover.png'
                style={{
                  position: 'absolute',
                  bottom: 5,
                  width: '100%'
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
                onClick={() => videoHandler('pause')}
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
                onClick={() => videoHandler('play')}
              >
                <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Play.png' />
                <img style={{ position: 'absolute', width: 45, opacity: 0 }} src='/images/Assets/Playing.png' />
              </div>)}

              <FontAwesomeIcon id='click'
                icon={faBackward}
        				color='rgba(194, 195, 205, 0.8)'
                style={{ position: 'absolute', left: 453, fontSize: 20, top: -60, opacity: isActive === 5 ? 0 : 1 }}
                onMouseOver={({target})=>target.style.color='white'}
                onMouseOut={({target})=>target.style.color='rgba(194, 195, 205, 0.8)'}
                onClick={backward}
        			/>
              <FontAwesomeIcon id='click'
                icon={faForward}
                color='rgba(194, 195, 205, 0.8)'
                style={{ position: 'absolute', right: 453, fontSize: 20, top: -60, opacity: isActive === 5 ? 0 : 1 }}
                onMouseOver={({target})=>target.style.color='white'}
                onMouseOut={({target})=>target.style.color='rgba(194, 195, 205, 0.8)'}
                onClick={forward}
              />

              <p id='non-select' style={{ position: 'absolute', left: 373, top: -60, fontSize: 14, color: 'white', opacity: isActive === 5 ? 0 : 1 }}>
                {Math.floor(currentTime / 3600) + ":" + ("0" + Math.floor((currentTime % 3600)/60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
              </p>
              <p id='non-select' style={{ position: 'absolute', right: 383, top: -60, fontSize: 14, color: 'white', opacity: isActive === 5 ? 0 : 1 }}>
                {Math.floor(videoTime / 3600) + ":" + ("0" + Math.floor((videoTime % 3600)/60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
              </p>

              <p id='non-select' style={{
                position: 'absolute',
                left: 20,
                top: -63,
                width: 320,
                color: 'white',
                opacity: isActive === 5 ? 0 : 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' }}
              >{movieData.title}</p>

              <div id='click'
                style={{ position: 'absolute', right: 170, top: -50, opacity: isActive === 5 ? 0 : 1 }}
                onClick={() => mute()}
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
              style={{ position: 'absolute', right: 55, top: -46, opacity: isActive === 5 ? 0 : 1 }}
              onChange={e => {
                setVolume(e.target.valueAsNumber)
              }}
            />

            <FontAwesomeIcon id='click'
              icon={faExpand}
              style={{ position: 'absolute', right: 20, top: -47, fontSize: 20, color: 'white', opacity: isActive === 5 ? 0 : 1 }}
              onClick={() => videoRef.current.requestFullscreen()}
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
               top: 21,
               width: 1023,
               height: 7,
               margin: 28,
               background: 'linear-gradient(to right, #7a8b9c, #c8b0e0)',
               borderRadius: 5,
               opacity: isHidden ? 1 : 0 }}
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
                  max={videoTime}
                  step={5}
                  value={currentTime}
                  style={{ position: 'absolute', top: -3, marginLeft: -0.5, width: 1023, height: '100%' }}
                  onChange={e => {seek(e.target.valueAsNumber)}}
                />
             </div>
          </div>
        </div>
          <div style={{ opacity: isHidden ? 1 : 0 }}
            onMouseOver={() => setHidden(true)}
          >
            <img id='click'
              style={{
                position: 'absolute',
                left: 83.5,
                width: 31,
                height: 30,
                borderBottomRightRadius: 6,
                borderTopLeftRadius: 5,
                display: 'flex',
                marginTop: 0,
                objectFit: 'cover',
                filter: 'brightness(50%)'
              }}
              src='/images/Assets/control.png'
              onClick={() => openModal(false)}
            />
            <div style={{
              position: 'absolute',
              left: 83.5,
              width: 31,
              height: 30,
              marginTop: 0,
              background: 'linear-gradient(#ca47af, #c77ee1)',
              borderBottomRightRadius: 6,
              borderTopLeftRadius: 5,
              opacity: 0.6,
              filter: isActive === 5 ? 'brightness(70%)' : 'brightness(50%)' }}
              onClick={() => openModal(false)}
              onMouseOver={() => setIsActive(5)}
              onMouseOut={() => setIsActive(0)}
            >
            </div>
            <XIcon
              style={{
                position: 'absolute',
                left: 92,
                width: 15,
                marginTop: 7,
                fontSize: 13,
                letterSpacing: '2px',
                color: isActive === 5 ? 'white' : '#c2c3cd'
              }}
              onClick={() => openModal(false)}
              onMouseOver={() => setIsActive(5)}
              onMouseOut={() => setIsActive(0)}
            />
          </div>
        </div>

        <div style={{ position: 'relative', top: -5, marginLeft: -5, display: 'flex', justifyContent: 'center' }}>
          <img style={{ position: 'absolute', width: 981, filter: 'brightness(70%)', opacity: 0.5 }} src='/images/Assets/Front.png' />
        </div>

        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          width: 981,
          height: 30,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 25,
          paddingBottom: 5,
          paddingLeft: 30,
          paddingRight: 30
        }}>
          <div>
            <button id='click' style={{
              marginLeft: 10,
              width: 107, height: 40,
              borderRadius: 20,
              border: '0px',
              color: 'white',
              filter: isActive === 6 ? 'brightness(100%)' : 'brightness(80%)',
              background: 'linear-gradient(#973ecb, #582476)' }}
              onMouseOver={() => setIsActive(6)}
              onMouseOut={() => setIsActive(0)}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onMouseOver={() => setIsActive(6)}
                onMouseOut={() => setIsActive(0)}
              >
                <HeartIcon style={{ width: 20, marginLeft: -5, marginRight: 5, color: 'white' }} />
                Favorite
              </div>
            </button>
            <button id='click' style={{
              marginLeft: 20,
              width: 93, height: 40,
              borderRadius: 20,
              border: '0px',
              color: 'white',
              filter: isActive === 7 ? 'brightness(100%)' : 'brightness(80%)',
              background: 'linear-gradient(#973ecb, #582476)' }}
              onMouseOver={() => setIsActive(7)}
              onMouseOut={() => setIsActive(0)}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onMouseOver={() => setIsActive(7)}
                onMouseOut={() => setIsActive(0)}
              >
                <ShareIcon style={{ width: 20, marginLeft: -5, marginRight: 5, color: 'white' }} />
                Share
              </div>
            </button>
          </div>
          <p id='non-select' style={{ width: 400, fontSize: 20, marginTop: -2.5, textAlign: 'center', color: '#cacad3' }}>{movieData.title}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p id='non-select' style={{ fontSize: 14, width: 100, marginRight: 30, textAlign: 'center', color: '#cacad3' }}>{'Released: '}
              {movieData.date.slice(0, 4)}
            </p>
            <div id='non-select' style={{ fontSize: 14, width: 50, marginRight: 30, textAlign: 'center', color: '#cacad3' }}>
              {'Rating: '}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {movieData.rating}
                <StarIcon style={{ marginTop: 1, marginLeft: 5, color: 'white' }} height={15}/>
              </div>
            </div>
          </div>
        </div>

        <p id='non-select' style={{
          fontSize: 14,
          paddingTop: 10,
          paddingBottom: 15,
          paddingLeft: 30,
          paddingRight: 30,
          color: '#cacad3' }}
        >
          {movieData.overview}
        </p>
      </div>
    </div>
  )
}

export default VideoModal;
