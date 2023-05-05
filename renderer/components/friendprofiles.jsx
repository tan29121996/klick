import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { faker } from '@faker-js/faker';
import { db, storage } from '../firebase';
import { doc, addDoc, getDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import { useHorizontalScroll } from '../utils/HorizontalScroll';

function FriendProfiles() {
  const { data: session } = useSession();
  const [profiles, setProfiles] = useState([]);
  const [isActive, setIsActive] = useState(-1);
  const scrollRef = useHorizontalScroll();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'users'),
        where ('email', '!=', session?.user?.email)
      ),
      snapshot =>
        setProfiles(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })
        )
      )
    );
  }, [db]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: 670,
      marginTop: 16 }}
    >
      <div ref={scrollRef} style={{ display: 'flex', width: 670, overflowX: 'auto', paddingLeft: 15.5, paddingLeft: 15.5 }}>
        {profiles.map((profile) =>
          <div key={profile.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div id='click' style={{
              width: 50, height: 50,
              border: isActive === profile.id ? '2px solid #fc85b4' : '2px solid #8d51e1',
              borderRadius: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(profile.id)}
              onMouseOut={() => setIsActive(-1)}
            >
              <img style={{ width: 44, height: 44, borderRadius: 16, objectFit: 'cover' }} src={profile.photoUrl} />
            </div>
            <div style={{ marginTop: 5, width: 80, display: 'flex', justifyContent: 'center', color: '#999bac' }}>
              <div style={{ width: 50, fontSize: 14, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.displayName}</div>
            </div>
          </div>
        )}
        <div style={{ marginRight: 15 }} />
      </div>
    </div>
  );
};

export default FriendProfiles;
