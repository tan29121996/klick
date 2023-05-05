import { useState, useEffect } from 'react';
import requests from '../utils/requests';
import { useHorizontalScroll } from '../utils/HorizontalScroll';

function MovieNav({toggleState, setToggleState}) {
  const [isActive, setIsActive] = useState(1);
  const scrollRef = useHorizontalScroll();

  const toggleNav = (index) => {
    setIsActive(index);
    setToggleState(index);
  }

  return <nav style={{ position: 'relative' }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: 40,
      width: 50,
      background: 'linear-gradient(to right, #1c1d33, transparent)', }}
    />
    <div ref={scrollRef} style={{ display: 'flex', width: 570, marginTop: -3, marginBottom: -7, overflowX: 'auto', whiteSpace: 'nowrap', paddingLeft: 40 }}>
      {Object.entries(requests).map(([key, { id, title, url }]) => (
        <p
          id='click'
          key={key}
          style={{
            letterSpacing: '2px',
            marginRight: 36,
            fontSize: 15,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 20,
            background: toggleState === id ? 'linear-gradient(#966aa6, #a159b4)' : null,
            color: toggleState === id || isActive === id ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive(id)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleNav(id)}
        >
          {title}
        </p>
      ))}
    </div>
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: 40,
      width: 50,
      background: 'linear-gradient(to left, #1c1d33, transparent)' }}
    />

  </nav>;
};

export default MovieNav;
