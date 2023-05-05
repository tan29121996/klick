import React from "react";
import Selected from './Selected';
import Tabs from './Tabs';
import {useState} from 'react';

function Sidebar({toggleState, setToggleState}) {
  const [isActive, setIsActive] = useState(0);

  const toggleTab = (index) => {
    setIsActive(index);
    setToggleState(index);
  }

  return (
    <div>
      <div
        id='click'
        onMouseOver={() => setIsActive(1)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => toggleTab(1)}
        style={{ position: 'relative' }}
      >
        { isActive === 1 ? <img style={{ position: 'absolute', top: 120, left: 18 }} src='/images/Assets/effect.png' height={45} /> : null }
        { toggleState === 1 ? <Selected /> : null }

        <div style={{
          position: 'absolute',
          top: 125.5,
          left: 21.5 }}
        >
          <img
            src='/images/Assets/circle.png'
            style={{ position: 'absolute', width: 33, height: 33, borderRadius: 33, opacity: 0.3 }}
          />
          <img
            src='/images/Assets/Home.png'
            style={{ width: 33, height: 33, borderRadius: 33, boxShadow: toggleState === 1 ? '0px 0px 10px #cd74f8' : '0px 0px 10px #2d6b9b' }}
          />
        </div>
      </div>

      <div
        id='click'
        onMouseOver={() => setIsActive(2)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => toggleTab(2)}
        style={{ position: 'relative', top: 60 }}
      >
        { isActive === 2 ? <img style={{ position: 'absolute', top: 120, left: 18 }} src='/images/Assets/effect.png' height={45} /> : null }
        { toggleState === 2 ? <Selected /> : null }

        <div style={{
          position: 'absolute',
          top: 125.5,
          left: 21.5 }}
        >
          <img
            src='/images/Assets/circle.png'
            style={{ position: 'absolute', width: 33, height: 33, borderRadius: 33, opacity: 0.3 }}
          />
          <img
            src='/images/Assets/Movie.png'
            style={{ width: 33, height: 33, borderRadius: 33, boxShadow: toggleState === 2 ? '0px 0px 10px #cd74f8' : '0px 0px 10px #2d6b9b'  }}
          />
        </div>
      </div>

      <div
        id='click'
        onMouseOver={() => setIsActive(3)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => toggleTab(3)}
        style={{ position: 'relative', top: 120 }}
      >
        { isActive === 3 ? <img style={{ position: 'absolute', top: 120, left: 18 }} src='/images/Assets/effect.png' height={45} /> : null }
        { toggleState === 3 ? <Selected /> : null }

        <div style={{
          position: 'absolute',
          top: 125.5,
          left: 21.5 }}
        >
          <img
            src='/images/Assets/circle.png'
            style={{ position: 'absolute', width: 33, height: 33, borderRadius: 33, opacity: 0.3 }}
          />
          <img
            src='/images/Assets/Game.png'
            style={{ width: 33, height: 33, borderRadius: 33, objectFit: 'cover', boxShadow: toggleState === 3 ? '0px 0px 10px #cd74f8' : '0px 0px 10px #2d6b9b'  }}
          />
        </div>
      </div>

      <div
        id='click'
        onMouseOver={() => setIsActive(4)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => toggleTab(4)}
        style={{ position: 'relative', top: 180 }}
      >
        { isActive === 4 ? <img style={{ position: 'absolute', top: 120, left: 18 }} src='/images/Assets/effect.png' height={45} /> : null }
        { toggleState === 4 ? <Selected /> : null }

        <div style={{
          position: 'absolute',
          top: 125.5,
          left: 21.5 }}
        >
          <img
            src='/images/Assets/circle.png'
            style={{ position: 'absolute', width: 33, height: 33, borderRadius: 33, opacity: 0.3 }}
          />
          <img
            src='/images/Assets/Photo.png'
            style={{ width: 33, height: 33, borderRadius: 33, objectFit: 'cover', boxShadow: toggleState === 4 ? '0px 0px 10px #cd74f8' : '0px 0px 10px #2d6b9b'  }}
          />
        </div>
      </div>

      <div
        id='click'
        onMouseOver={() => setIsActive(5)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => toggleTab(5)}
        style={{ position: 'relative', top: 240 }}
      >
        { isActive === 5 ? <img style={{ position: 'absolute', top: 120, left: 18 }} src='/images/Assets/effect.png' height={45} /> : null }
        { toggleState === 5 ? <Selected /> : null }

        <div style={{
          position: 'absolute',
          top: 125.5,
          left: 21.5 }}
        >
          <img
            src='/images/Assets/circle.png'
            style={{ position: 'absolute', width: 33, height: 33, borderRadius: 33, opacity: 0.3 }}
          />
          <img
            src='/images/Assets/Music.png'
            style={{ width: 33, height: 33, borderRadius: 33, boxShadow: toggleState === 5 ? '0px 0px 10px #cd74f8' : '0px 0px 10px #2d6b9b'  }}
          />
        </div>
      </div>

      <img
        src='/images/Assets/Sidebar.png'
        style={{ borderBottomLeftRadius: 30, borderTopLeftRadius: 20 }}
        height={792}
      />
    </div>

  );
};

export default Sidebar;
