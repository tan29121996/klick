import { useState, useEffect, useRef } from 'react';
import ForumsPost from './forumspost';
import PostThread from './postThread';
import Thread from './thread';
import Trending from './trending';
import { db, storage } from '../firebase';
import { doc, addDoc, getDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/solid';

function Forums() {
  const [toggleState, setToggleState] = useState(1);
  const [isActive, setIsActive] = useState(-1);
  const [forumPosts, setForumPosts] = useState({});
  const [isOpen, openModal] = useState(false);
  const [thread, openThread] = useState(false);
  const [threadId, setThreadId] = useState();

  const toggleNav = (index) => {
    setIsActive(index);
    setToggleState(index);
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'forumPosts'),
        orderBy('timestamp', 'desc')
      ),
      snapshot =>
        setForumPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })
        )
      )
    );
  }, [db]);

  const viewComments = () => {
    openThread(true);
    setCommentId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(#0d0d15, transparent, transparent)' }}>
      <div style={{ position: 'relative', width: 668, background: 'linear-gradient(rgba(0, 0, 0, 0.7), transparent)' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <div id='non-select' style={{
            paddingTop: 7, paddingBottom: 7,
            paddingLeft: 12, paddingRight: 12,
            marginTop: 5, marginLeft: 24,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: 'white',
            opacity: 0.8,
            background: 'linear-gradient(#392c54, #2e2343)'}}
          >
            Trending
          </div>

          <img style={{ width: 150, filter: 'grayscale(80%)' }}
            src='/images/Assets/Forums Banner.png'
          />

          <div id='non-select' style={{ width: 87, padding: 7, marginTop: 5, marginLeft: 24 }} />
        </div>
      </div>

      <Trending {...{ openThread, setThreadId }}/>

      <div style={{
        position: 'absolute',
        width: 620, height: 50,
        borderRadius: 15,
        top: 290,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(#392c54, #2e2343)',
        color: 'white',
        boxShadow: '0px 0px 20px black' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div id='non-select' style={{
            paddingTop: 7, paddingBottom: 7,
            paddingRight: 12, paddingLeft: 12,
            marginLeft: 10,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: toggleState === 1 || isActive === 1 ? 'white' : '#999bac',
            background: toggleState === 1 ? 'linear-gradient(#a585bf, #6c54ac)' : null }}
            onMouseOver={() => setIsActive(1)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => toggleNav(1)}
          >
            Hot
          </div>
          <div id='non-select' style={{
            paddingTop: 7, paddingBottom: 7,
            paddingRight: 12, paddingLeft: 12,
            marginLeft: 10,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: toggleState === 2 || isActive === 2 ? 'white' : '#999bac',
            background: toggleState === 2 ? 'linear-gradient(#a585bf, #6c54ac)' : null }}
            onMouseOver={() => setIsActive(2)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => toggleNav(2)}
          >
            New
          </div>
          <div id='non-select' style={{
            paddingTop: 7, paddingBottom: 7,
            paddingRight: 12, paddingLeft: 12,
            marginLeft: 10,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: toggleState === 3 || isActive === 3 ? 'white' : '#999bac',
            background: toggleState === 3 ? 'linear-gradient(#a585bf, #6c54ac)' : null }}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => toggleNav(3)}
          >
            Trending
          </div>
        </div>

        <div id='click' style={{
          display: 'flex',
          justifyContent: 'center', alignItems: 'center',
          width: 30, height: 30,
          borderRadius: 10,
          margin: 10,
          color: 'white',
          opacity: 0.8,
          background: '#9f65b4' }}
          onClick={() => openModal(true)}
        >
          <PlusIcon style={{ width: 15, height: 15 }} />
        </div>
      </div>

      <div style={{
        width: 670, height: 435,
        paddingTop: 60, marginTop: 30,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll' }}
      >
        {Object.entries(forumPosts)?.map((forumPost) =>
          <ForumsPost {...{ forumPost, openThread, setThreadId }} />
        )}
        <div style={{ marginBottom: 10 }} />
      </div>

      <div style={{ position: 'absolute' }}>
        {isOpen && <PostThread {...{ openModal }} />}
      </div>

      <div style={{ position: 'absolute' }}>
        {thread && <Thread {...{ openThread, threadId }} />}
      </div>

    </div>
  );
}

export default Forums;
