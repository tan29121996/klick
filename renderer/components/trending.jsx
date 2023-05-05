import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, getDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import { faker } from '@faker-js/faker';
import { useHorizontalScroll } from '../utils/HorizontalScroll';

function Trending({ openThread, setThreadId }) {
  const [threads, setThreads] = useState([]);
  const [isActive, setIsActive] = useState(-1);
  const scrollRef = useHorizontalScroll();
  const { data: session } = useSession();

  const viewThread = (thread) => {
    openThread(true);
    setThreadId(thread.id);
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'forumPosts')
      ),
      snapshot =>
        setThreads(
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
      marginTop: 7 }}
    >
      <div ref={scrollRef} style={{ display: 'flex', width: 670, overflowX: 'auto', paddingLeft: 25 }}>
        {threads.map((thread, i) =>
          <div key={i} id='click' style={{
            position: 'relative',
            paddingLeft: 55, paddingRight: 55,
            paddingTop: 25, paddingBottom: 20,
            marginRight: 25,
            borderRadius: 20,
            filter: isActive === i + 'a' ? 'brightness(130%)' : null,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            background: 'linear-gradient(#392c54, #2e2343)' }}
            onMouseOver={() => setIsActive(i + 'a')}
            onMouseOut={() => setIsActive(-1)}
            onClick={() => viewThread(thread)}
          >
            <img style={{
              position: 'absolute', top: 0, left: 0,
              width: 190, height: 53,
              borderTopLeftRadius: 18, borderTopRightRadius: 18,
              objectFit: 'cover',
              borderBottom: '2px solid #8d51e1'}}
              src={faker.image.image()}
            />

            <img id='click' style={{
              position: 'absolute', top: 25,
              width: 50, height: 50,
              border: isActive === i ? '2px solid #fc85b4' : '2px solid #8d51e1',
              borderRadius: 20,
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(i)}
              onMouseOut={() => setIsActive(-1)}
            />

            <div style={{
              position: 'absolute',
              top: 10, left: 10,
              paddingLeft: 10, paddingRight: 10,
              paddingBottom: 3, paddingTop: 3,
              borderRadius: 20,
              background: '#8852de',
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0px 0px 10px #8852de' }}
            >
              Hot
            </div>

            <div id='click' style={{
              width: 50, height: 50,
              border: isActive === i ? '2px solid #fc85b4' : '2px solid #8d51e1',
              borderRadius: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(i)}
              onMouseOut={() => setIsActive(-1)}
            />

            <div style={{ marginTop: 5, width: 80, display: 'flex', justifyContent: 'center', color: '#999bac' }}>
              <div style={{
                marginLeft: -30, marginRight: -30,
                fontSize: 14,
                textAlign: 'center', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {thread?.displayName}
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: -30, marginRight: -30, marginTop: 5,
              height: 35,
              fontSize: 13,
              color: '#f6e0f4',
              textAlign: 'center' }}
            >
              {thread?.title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
