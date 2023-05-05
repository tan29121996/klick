import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Grid from '@mui/material/Grid';
import FriendProfiles from './friendprofiles';
import {
  UserRemoveIcon,
  ChatIcon
} from '@heroicons/react/solid';

function Friends() {
  const [isActive, setIsActive] = useState(-1);
  const [profiles, setProfiles] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const toggleNav = (index) => {
    setIsActive(index);
    setToggleState(index);
  }

  useEffect(() => {
    const profiles = [...Array(20)].map((_, i) => ({
      fullName: faker.name.fullName(),
      avatarUrl: faker.image.avatar(),
      id: i,
    }));

    setProfiles(profiles);

  }, []);

  return (
    <div style={{ paddingTop: 60, paddingLeft: 67, paddingBottom: 10, width: '100%', height: '100%', overflowY: 'scroll' }}>
      <div style={{ position: 'relative', top: -60, left: -67, width: 668 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div id='non-select' style={{
            width: 87,
            padding: 7,
            marginTop: 5, marginLeft: 24,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: 'white',
            opacity: 0.8,
            background: 'linear-gradient(#392c54, #2e2343)'}}
          >
            Suggested
          </div>

          <img style={{ height: 40, filter: 'contrast(60%) brightness(140%) opacity(80%)' }}
            src='/images/Assets/Friends Banner.png'
          />
          <div id='non-select' style={{ width: 87, padding: 7, marginTop: 5, marginLeft: 24 }} />
        </div>

        <div style={{
          position: 'absolute',
          top: 50, left: -20,
          width: 22, height: 80,
          marginLeft: 20,
          background: 'linear-gradient(to right, #1e203c, transparent)', }}
        />

        <FriendProfiles />

        <div style={{
          position: 'absolute',
          top: 50, left: 628,
          width: 22, height: 80,
          marginLeft: 20,
          background: 'linear-gradient(to left, #1e203c, transparent)', }}
        />
      </div>

      <div style={{ position: 'relative', top: -45, marginBottom: 15, display: 'flex', width: 570, whiteSpace: 'nowrap', paddingLeft: 2 }}>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 1 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 1 || isActive === 1 ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleNav(1)}
        >
          All Friends
        </p>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 2 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 2 || isActive === 2 ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleNav(2)}
        >
          Mutual Friends
        </p>
        <p id='click' style={{
          letterSpacing: '2px', fontSize: 15,
          marginTop: 0, marginBottom: 0, marginRight: 36,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 20,
          background: toggleState === 3 ? 'rgba(200, 200, 200, 0.3)' : null,
          color: toggleState === 3 || isActive === 3 ? 'white' : '#999bac' }}
          onMouseOver={() => setIsActive(3)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => toggleNav(3)}
        >
          Currently Online
        </p>
      </div>

      <Grid container spacing={7} >
        {profiles.map((profile) =>
          <Grid item xs={3.555} style={{ height: 280, padding: 15, marginBottom: -30 }}>
            <div key={profile.id} style={{ position: 'relative', height: 280 }}>
              <div style={{ position: 'relative', height: 180 }}>
                <img style={{
                  width: '100%', height: '100%',
                  background: 'white',
                  border: '2px solid #b897eb',
                  borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                  src={faker.image.avatar()}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%', height: 40,
                  marginTop: 10, marginBottom: -5, marginLeft: 2,
                  background: 'linear-gradient(transparent, rgba(108, 84, 172, 0.5), #6C54AC)',
                  color: 'white' }}
                >
                  {profile.fullName}
                </div>
                <div style={{ position: 'absolute', top: 13, left: 13, width: 15, height: 15, borderRadius: 20, background: '#8852de', boxShadow: '0px 0px 10px #8852de' }} />
              </div>

              <div id='click' style={{ width: 189, display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                <div style={{
                  width: 52, height: 45,
                  borderBottomLeftRadius: 15,
                  background: 'linear-gradient(#c77ee1, #ca47af)',
                  filter: isActive === profile.id ? 'brightness(110%)' : 'contrast(80%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' }}
                  onMouseOver={() => setIsActive(profile.id)}
                  onMouseOut={() => setIsActive(-1)}
                >
                  <UserRemoveIcon style={{ width: 22, height: 22, color: '#fafbf8' }} />
                </div>
                <div id='click' style={{
                  width: 142, height: 45,
                  borderBottomRightRadius: 15,
                  color: '#fafbf8',
                  background: 'linear-gradient(#a585bf, #6c54ac)',
                  filter: isActive === profile.id + 'x' ? 'brightness(110%)' : 'contrast(80%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' }}
                  onMouseOver={() => setIsActive(profile.id + 'x')}
                  onMouseOut={() => setIsActive(-1)}
                >
                  <ChatIcon style={{ width: 22, height: 22 }} />
                  <div style={{ fontSize: 14, marginLeft: 7 }}>Message</div>
                </div>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Friends;
