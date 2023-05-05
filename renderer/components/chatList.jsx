import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { faker } from '@faker-js/faker';
import { db, storage } from '../firebase';
import { doc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import Moment from 'react-moment';

function ChatList({ setChatDetails, chat }) {
  const [isActive, setIsActive] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [lastMessage, setLastMessage] = useState('');
  const { data: session } = useSession();

  const getInfo = (users, currentUserProfile) => {
    const newUsers = {...users};
    delete newUsers[currentUserProfile];

    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user }
  };

  useEffect(() => {
    setUserDetails(getInfo(chat[1]?.users, session?.user?.uid));
    }, [chat, session]
  );

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, 'userChats', chat[1]?.id, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(1)
      ),
      snapshot =>
        setLastMessage(snapshot.docs[0]?.data()?.message)
    ), [chat, db]
  );

  return (
    <div key={chat.uid} id='click' style={{
      height: 102,
      marginTop: 20,
      borderRadius: 20,
      background: 'linear-gradient(270deg, #684e97, #4c4662)',
      filter: isActive ? 'brightness(130%)' : null }}
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
      onClick={() => setChatDetails(chat[1])}
    >
      <div style={{ height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 15, color: 'silver' }}>
        <div id='click' style={{
          width: 40, height: 40,
          border: '2px solid #b0a8d9',
          borderRadius: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
        >
          <img style={{ width: 34, height: 34, borderRadius: 12, background: 'white', objectFit: 'cover' }} src={userDetails?.photoUrl} />
        </div>
        <div style={{ height: 50, marginLeft: 15, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <div style={{ fontSize: 14 }}>{userDetails?.displayName}</div>
          <div style={{ maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13 }}>{userDetails?.email}</div>
        </div>
      </div>
      <div style={{ width: 228, fontSize: 14, marginLeft: 20, marginTop: -2, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: 225, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'lightgrey' }}>{lastMessage || 'No messages'}</div>
      </div>
    </div>
  );
}

export default ChatList;
