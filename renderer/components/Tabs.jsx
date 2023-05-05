import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  ChatIcon,
  NewspaperIcon,
  DocumentTextIcon,
  LoginIcon
} from '@heroicons/react/solid';

function Tabs({setToggleState, toggleState}) {
  const [isActive, setIsActive] = useState(0);
  const [currentState, setCurrentState] = useState('Home');

  const toggleTab = (index) => {
    setIsActive(index);
    setToggleState(index);
  }

  useEffect(() => {
    if (toggleState === 2) {
      setCurrentState('Movies & TV');
    } else if (toggleState === 3) {
      setCurrentState('Gaming');
    } else if (toggleState === 4) {
      setCurrentState('Photo sharing');
    } else if (toggleState === 5) {
      setCurrentState('Music');
    } else {
      setCurrentState('Hub');
    }
  });

  return (
    <div style={{ position: 'relative'}}>
      <div>
        <img style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 750, opacity: 0.8, objectFit: 'cover' }}
          src='/images/Assets/Tabs.png'
        />
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 1 || toggleState === 2 || toggleState === 3 || toggleState === 4 || toggleState === 5 || isActive === 1 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleTab(1)}
        >
          <HomeIcon style={{ position: 'relative', top: 8, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>
            {currentState}
          </div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 6 || isActive === 6 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(6)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleTab(6)}
        >
          <UsersIcon style={{ position: 'relative', top: 8, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>Friends</div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 7 || isActive === 7 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(7)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(7)}
        >
          <UserGroupIcon style={{ position: 'relative', top: 8, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>Groups</div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 8 || isActive === 8 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(8)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(8)}
        >
          <ChatIcon style={{ position: 'relative', top: 8, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>Chat</div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 9 || isActive === 9 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(9)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(9)}
        >
          <DocumentTextIcon style={{ position: 'relative', top: 8, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>Forums</div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 10 || isActive === 10 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(10)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(10)}
        >
          <NewspaperIcon style={{ position: 'relative', top: 9, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>News Feed</div>
        </div>
      </div>

      <div>
        <div id='click' style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: 13,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 9,
          height: 36,
          borderRadius: 5,
          backgroundColor: toggleState === 11 || isActive === 11 ? '#322a5d' : null }}
          onMouseOver={() => setIsActive(11)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(11)}
        >
          <LoginIcon style={{ position: 'relative', top: 9, left: 10, width: 17, height: 17, color: 'white' }}/>
          <div id='non-select' style={{ position: 'relative', top: 8, left: 10, fontSize: 15, paddingLeft: 10, letterSpacing: '2px', color: 'white'}}>Sign In</div>
        </div>
      </div>
    </div>
  );
};
export default Tabs;
