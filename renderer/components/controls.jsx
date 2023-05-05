import React, { useState } from "react";
import {
  XIcon, MinusIcon
} from '@heroicons/react/solid';

function Controls() {
  const [isActive, setIsActive] = useState(0);

  return (
    <div>
      <img src='/images/Assets/controls.png' width={60} style={{ marginTop: -1, borderTopLeftRadius: 10, borderBottomRightRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)' }} />
      <div style={{
        position: 'absolute',
        top: 1,
        left: 3,
        width: 29,
        height: 28,
        backgroundColor: '#30b4ee',
        borderTopLeftRadius: 5,
        opacity: isActive === 1 ? 0.5 : 0 }}
        onClick={() => window.close()}
        onMouseOver={() => setIsActive(1)}
        onMouseOut={() => setIsActive(0)}
      >

      </div>

      <div style={{
        position: 'absolute',
        top: 1,
        left: 33,
        width: 27,
        height: 28,
        backgroundColor: '#30b4ee',
        borderBottomRightRadius: 10,
        opacity: isActive === 2 ? 0.5 : 0 }}
        onClick={() => require("@electron/remote").BrowserWindow.getFocusedWindow().minimize()}
        onMouseOver={() => setIsActive(2)}
        onMouseOut={() => setIsActive(0)}
      >

      </div>

      <XIcon style={{
        position: 'absolute',
        top: 7,
        marginLeft: -52,
        width: 15,
        color: isActive === 1 ? 'white' : '#999bac' }}
        onClick={() => window.close()}
        onMouseOver={() => setIsActive(1)}
        onMouseOut={() => setIsActive(0)}
      />

      <MinusIcon style={{
        position: 'absolute',
        top: 8,
        marginLeft: -23,
        width: 15,
        color: isActive === 2 ? 'white' : '#999bac' }}
        onClick={() => require("@electron/remote").BrowserWindow.getFocusedWindow().minimize()}
        onMouseOver={() => setIsActive(2)}
        onMouseOut={() => setIsActive(0)}
      />
    </div>
  )
}

export default Controls
