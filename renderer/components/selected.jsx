import React from "react";

function Selected() {
  return (
    <div style={{ position: 'relative' }}>
      <div>
        <img
          style={{ position: 'absolute', top: 120, left: 18 }}
          src='/images/Assets/effect.png'
          height={45}
        />
        <img
          style={{ position: 'absolute', top: 125, left: 4 }}
          src='/images/Assets/Selected.png'
          height={38}
        />
      </div>
    </div>
  );
};
export default Selected;
