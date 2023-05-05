import { useState } from 'react';

function Home({ setToggleState, toggleState }) {
  const [isActive, setIsActive] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflowY: 'scroll' }}>
      <img style={{ position: 'relative', alignSelf: 'center', top: 215, height: 20 }} src='/images/Assets/Entertainment.png'/>
      <img style={{ position: 'relative', alignSelf: 'center', top: 457, height: 19 }} src='/images/Assets/DigitalMedia.png'/>
      <img style={{ position: 'relative', alignSelf: 'center', top: 643, height: 15 }} src='/images/Assets/Socials.png'/>

      <div style={{ position: 'relative', top: -30 }}>
        <div style={{ left: 20, position:'absolute', height: 170, borderRadius: 20 }}>
          <img
            style={{ borderRadius: 20 }}
            src='/images/Assets/Banner.png'
            width={630}
          />
        </div>
        <div style={{ left: 21, top: 230, position:'absolute', height: 195, borderRadius: 20,
          boxShadow: isActive === 1 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(2)}
        >
          <img
            id='click'
            style={{ borderRadius: 20 }}
            src='/images/Assets/Featured Card 1.png'
            width={303}
          />
        </div>
        <div style={{ left: 345, top: 230, position:'absolute', height: 195, borderRadius: 20,
          boxShadow: isActive === 2 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(3)}
        >
          <img
            id='click'
            src='/images/Assets/Featured Card 2.png'
            width={303}
          />
        </div>
        <div style={{ left: 21, top: 495, position:'absolute', height: 142, borderRadius: 20,
          boxShadow: isActive === 3 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(3)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(4)}
        >
          <img
            id='click'
            src='/images/Assets/Popular Card 1.png'
            width={303}
          />
        </div>
        <div style={{ left: 345, top: 495, position:'absolute', height: 142, borderRadius: 20,
          boxShadow: isActive === 4 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(4)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(5)}
        >
          <img
            id='click'
            src='/images/Assets/Popular Card 2.png'
            width={303}
          />
        </div>
        <div style={{ left: 21, top: 695, position:'absolute', height: 183, borderRadius: 20,
          boxShadow: isActive === 5 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(5)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(8)}
        >
          <img
            id='click'
            src='/images/Assets/Frame 3696.png'
            width={183}
          />
        </div>
        <div style={{ left: 245, top: 695, position:'absolute', height: 183, borderRadius: 20,
          boxShadow: isActive === 6 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(6)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(9)}
        >
          <img
            id='click'
            src='/images/Assets/Frame 3697.png'
            width={183}
          />
        </div>
        <div style={{ left: 467, top: 695, position:'absolute', height: 183, borderRadius: 20,
          boxShadow: isActive === 7 ? '0px 2px 30px #2d6b9b' : '0px 5px 10px black' }}
          onMouseOver={() => setIsActive(7)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(10)}
        >
          <img
            id='click'
            src='/images/Assets/Frame 3698.png'
            style={{ marginBottom: 30 }}
            width={183}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
