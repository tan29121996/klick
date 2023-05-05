import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Grid from '@mui/material/Grid';
import {
  UserGroupIcon,
} from '@heroicons/react/solid';
import modal from '../public/images/Assets/Modal.png';

function Groups() {
  const [isActive, setIsActive] = useState(-1);
  const [groups, setGroups] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const toggleNav = (index) => {
    setToggleState(index);
  }

  useEffect(() => {
    const groups = [...Array(20)].map((_, i) => ({
      id: i,
    }));

    setGroups(groups);
  }, []);

  useEffect(() => {
    const profiles = [...Array(12)].map((_, i) => ({
      id: i,
    }));

    setProfiles(profiles);
  }, []);

  return (
    <div style={{
      paddingTop: 60, paddingLeft: 67,
      paddingBottom: 10,
      width: '100%', height: '100%',
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), transparent)',
      overflowY: 'scroll' }}
    >
      <div style={{ position: 'relative', top: -40, marginBottom: 15, display: 'flex', width: 570, whiteSpace: 'nowrap', paddingLeft: 13 }}>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 1 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 1 || isActive === 'a' ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive('a')}
          onMouseOut={() => setIsActive(-1)}
          onClick={() => toggleNav(1)}
        >
          Find Groups
        </p>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 2 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 2 || isActive === 'b' ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive('b')}
          onMouseOut={() => setIsActive(-1)}
          onClick={() => toggleNav(2)}
        >
          Joined Groups
        </p>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 3 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 3 || isActive === 'c' ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive('c')}
          onMouseOut={() => setIsActive(-1)}
          onClick={() => toggleNav(3)}
        >
          Create Group
        </p>
      </div>

      <div style={{ position: 'relative', top: -53, left: -67, width: 668 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <img style={{ height: 40, filter: 'hue-rotate(250deg) contrast(60%) brightness(140%) opacity(80%)' }}
            src='/images/Assets/Groups Banner.png'
          />
        </div>
      </div>

      <Grid container spacing={7} style={{ marginTop: -45 }}>
        {groups.map((group) =>
          <Grid item xs={3.575} style={{ height: 262, padding: 12 }}>
            <div key={group.id} style={{ height: 262, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div id='non-select' style={{
                paddingTop: 7, paddingBottom: 7,
                paddingLeft: 13, paddingRight: 13,
                marginTop: -10, marginBottom: 14,
                fontSize: 14, textAlign: 'center',
                borderRadius: 20,
                border: '1px solid grey',
                color: 'white',
                opacity: 0.8,
                background: 'transparent'}}
              >
                {faker.random.word()}{' Group'}
              </div>

              <div style={{ height: 200, borderRadius: 20, backgroundImage: 'url(images/Assets/Modal.png)', backgroundPosition: 'center' }}>
                <div style={{ height: 120, paddingLeft: 28, marginTop: 10, overflowY: 'scroll' }}>
                  <Grid container spacing={3} style={{ marginTop: -5 }}>
                    {profiles.map((profile) =>
                      <Grid item xs={3.65} style={{ height: 60, padding: 0 }}>
                        <div id='click' style={{ width: 50, margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <img style={{ width: 35, height: 35, borderRadius: 35, background: 'white' }} src={faker.image.avatar()} />
                          <div style={{ width: 42, marginTop: 2, textAlign: 'center', color: 'silver', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 12 }}>
                            {faker.name.firstName()}
                          </div>
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </div>

                <div id='click' style={{
                  width: 160, height: 42,
                  marginLeft: 15,
                  marginTop: 12,
                  borderRadius: 13,
                  color: '#fafbf8',
                  background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
                  filter: isActive === group.id ? 'brightness(130%)' : null,
                  boxShadow: isActive === group.id ? '0px 0px 10px #2d6b9b' : null,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' }}
                  onMouseOver={() => setIsActive(group.id)}
                  onMouseOut={() => setIsActive(-1)}
                >
                  <UserGroupIcon style={{ width: 20, height: 20 }} />
                  <div style={{ fontSize: 15, marginLeft: 7 }}>Join Group</div>
                </div>

              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Groups;
