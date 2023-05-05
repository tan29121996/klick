import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Controls from '../components/controls';
import Header from '../components/header';
import Tabs from '../components/Tabs';
import Notifications from '../components/notifications';
import Sidebar from '../components/sidebar';
import User from '../components/user';
import Homepage from '../components/homepage';
import Moviepage from '../components/moviepage';
import Video from '../components/Video';
import Musicpage from '../components/musicpage';
import Mediapage from '../components/mediapage';
import Gamepage from '../components/gamepage';
import Friendspage from '../components/friendspage';
import Groupspage from '../components/groupspage';
import Chatpage from '../components/chatpage';
import Forumspage from '../components/forumspage';
import Feedpage from '../components/feedpage';
import SignIn from './signin';
import { useSession, signOut } from 'next-auth/react';
import { faker } from '@faker-js/faker';
import {
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon, MinusIcon
} from '@heroicons/react/solid';

function Home() {
  const [toggleState, setToggleState] = useState(1);
  const [isOpen, openModal] = useState(false);
  const [loginScreen, openloginScreen] = useState();
  const [movieData, setMovieData] = useState({});
  const { data: session } = useSession();

  return (
    <div>
      <Header />

      <div id='title-bar-btns'>
        <Controls />
      </div>

      <div style={{ display: 'flex', width: 1200, height: '100%' }}>

        <div style={{ width: 71, height: 792, marginTop: -43, marginLeft: -10, overflow: 'hidden' }}>
          <Sidebar {...{ setToggleState, toggleState }} />
        </div>

        <div style={{ width: 226, height: 750, backgroundColor: 'black', borderRight: '1px solid rgba(255, 255, 255, 0.6)' }}>
          <Tabs {...{ setToggleState, toggleState }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: 670, height: 752, backgroundColor: '#1e203c' }}>
          {toggleState === 1 && <Homepage {...{ setToggleState, toggleState }} />}
          {toggleState === 2 && <Moviepage {...{ isOpen, openModal, movieData, setMovieData }} />}
          {toggleState === 3 && <Gamepage />}
          {toggleState === 4 && <Mediapage {...{ session }} />}
          {toggleState === 5 && <Musicpage />}
          {toggleState === 6 && <Friendspage />}
          {toggleState === 7 && <Groupspage />}
          {toggleState === 8 && <Chatpage />}
          {toggleState === 9 && <Forumspage />}
          {toggleState === 10 && <Feedpage />}
          {toggleState === 11 && <SignIn />}

            <div style={{
              position: 'absolute',
              display:
                toggleState === 1 || toggleState === 2 || toggleState === 6 || toggleState === 7 || toggleState === 9 || toggleState === 10 ?
                'block' : 'none',
              bottom: 0,
              width: 634,
              height: 8,
              marginLeft: 18,
              marginRight: 18,
              borderRadius: 8,
              backgroundColor: 'black',
              opacity: 0.8 }}
            />

        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: 225,
          height: 750,
          backgroundColor: '#2c2f44',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
          borderBottomRightRadius: 10 }}
        >

          <div style={{ paddingTop: 15 }}>
            <User {...{ session }} />

            <text style={{
              position: 'relative',
              top: 70,
              left: 13,
              fontSize: 18,
              fontFamily: 'ZCOOL XiaoWei',
              color: '#999bac' }}
            >
              Notifications
            </text>

            <Notifications fullName={faker.name.firstName()} avatarUrl={faker.image.avatar()}/>
            <Notifications fullName={faker.name.firstName()} avatarUrl={faker.image.avatar()}/>
            <Notifications fullName={faker.name.firstName()} avatarUrl={faker.image.avatar()}/>
            <Notifications fullName={faker.name.firstName()} avatarUrl={faker.image.avatar()}/>
            <Notifications fullName={faker.name.firstName()} avatarUrl={faker.image.avatar()}/>

          </div>

          <text style={{
            position: 'absolute',
            bottom: 70,
            width: 225,
            textAlign: 'center',
            fontSize: 16,
            letterSpacing: '1px',
            fontFamily: 'ZCOOL XiaoWei',
            color: '#999bac' }}
          >
            My Socials
          </text>
        </div>

        <img style={{ position: 'absolute', bottom: 0, right: 0, width: 225, opacity: 0.7, borderBottomRightRadius: 10 }}
          src='/images/Assets/dock.png'
        />
        <img id='click' style={{ position: 'absolute', bottom: 20, right: 173, width: 30, borderRadius: 5, boxShadow: '0px 5px 10px #393d5b' }}
          src='/images/Assets/facebook.png'
          onMouseOver={({target}) => target.style.boxShadow = '0px 0px 20px #999bac' }
          onMouseOut={({target}) => target.style.boxShadow = '0px 5px 10px #393d5b' }
        />
        <img id='click' style={{ position: 'absolute', bottom: 20, right: 97, width: 30, borderRadius: 5, boxShadow: '0px 5px 10px #393d5b' }}
          src='/images/Assets/instagram.png'
          onMouseOver={({target}) => target.style.boxShadow = '0px 0px 20px #999bac' }
          onMouseOut={({target}) => target.style.boxShadow = '0px 5px 10px #393d5b' }
        />
        <img id='click' style={{ position: 'absolute', bottom: 20, right: 23, width: 30, borderRadius: 5, boxShadow: '0px 5px 10px #393d5b' }}
          src='/images/Assets/linkedin.png'
          onMouseOver={({target}) => target.style.boxShadow = '0px 0px 20px #999bac' }
          onMouseOut={({target}) => target.style.boxShadow = '0px 5px 10px #393d5b' }
        />
      </div>


      <div style={{ position: 'absolute', bottom: -5, left: 0 }}>
        <img
          src='/images/Assets/userbar.png'
          style={{ borderBottomLeftRadius: 20 }}
          width={296}
        />

        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 15,
          display: 'flex',
          flexDirection: 'row' }}
        >
          <div style={{
            width: 32, height: 32,
            border: '2px solid #9254ea',
            borderRadius: 14,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' }}
          >
            <img style={{ width: 26, height: 26, background: 'white', borderRadius: 8 }}
              src={session?.user?.image}
            />
          </div>

          <div style={{ width: 100, fontSize: 14, marginLeft: 12 , marginTop: 10, color: 'white', whiteSpace: 'nowrap' }}>{session?.user?.name}</div>

          <div id='click'
            style={{ display: 'flex', width: 100, marginLeft: 10, marginTop: 10, fontSize: 14, justifyContent: 'flex-end', color: '#999bac' }}
            onMouseOver={({target}) => target.style.filter = 'brightness(150%)' }
            onMouseOut={({target}) => target.style.filter = null }
            onClick={() => signOut()}
          >
            Sign Out
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {isOpen && <Video {...{ openModal, movieData }} />}
      </div>

    </div>
  );
};

export default Home;
