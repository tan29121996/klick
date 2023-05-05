import {
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';

import {
  BellIcon,
  ChatIcon,
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

import HeaderIcon from './HeaderIcon';

function Header() {
  return (
    <div style={{
      display: 'flex',
      width: 1122,
      height: 28,
      marginTop: -8,
      marginLeft: 61,
      paddingTop: 13,
      backgroundColor: '#2c2f44',
      border: '1px solid #57575f',
      borderTopRightRadius: 20 }}
      className='title-bar'
    >
      <div style={{ width: 230, marginTop: -13, backgroundColor: '#6c54ac' }}>
        <img style={{ width: 120, marginLeft: 18 }} src='/images/Assets/Klick.png' />
      </div>
      <div style={{ width: 680, justifyContent: 'center', borderRadius: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 175, height: 20, borderRadius: 5, marginTop: -3.5, backgroundColor: '#2a2c44', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <SearchIcon style={{ top: 14, left: 547, position:'absolute', height: 15, color: '#8a8d9f' }} />
            <input style={{ backgroundColor: 'transparent', borderColor: 'transparent', textAlign: 'center' }} type='text' />
          </div>
        </div>
      </div>

      <div style={{ width: 230, justifyContent: 'center' }}>
        <div style={{ display: 'flex', paddingLeft: 15, paddingRight: 15, justifyContent: 'space-between' }}>
          <HeaderIcon Icon={HomeIcon}/>
          <HeaderIcon Icon={FlagIcon}/>
          <HeaderIcon Icon={PlayIcon}/>
          <HeaderIcon Icon={UserGroupIcon}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
