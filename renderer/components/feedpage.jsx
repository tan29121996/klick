import { useState, useEffect, useRef } from 'react';
import FeedPost from './feedpost';
import Post from './post';
import FriendProfiles from './friendprofiles';
import FeedComments from './feedcomments';
import FeedFullPost from './feedfullpost';
import Grid from '@mui/material/Grid';
import { db, storage } from '../firebase';
import { doc, addDoc, getDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import { PlusIcon } from '@heroicons/react/solid';

function Feed() {
  const [toggleState, setToggleState] = useState(1);
  const [isActive, setIsActive] = useState(-1);
  const [feedPosts, setFeedPosts] = useState({});
  const [isOpen, openModal] = useState(false);
  const [comments, openComments] = useState(false);
  const [commentId, setCommentId] = useState();
  const [fullPost, openFullPost] = useState(false);
  const [postId, setPostId] = useState();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'feed'),
        orderBy('timestamp', 'desc')
      ),
      snapshot =>
        setFeedPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })
        )
      )
    );
  }, [db]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(#191a29, transparent)' }}>
      <div style={{ position: 'relative', width: 668, background: 'linear-gradient(rgba(0, 0, 0, 0.7), transparent)' }}>
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

          <img style={{ height: 40, filter: 'grayscale(60%)' }}
            src='/images/Assets/Feed Banner.png'
          />

          <div id='non-select' style={{ width: 87, padding: 7, marginTop: 5, marginLeft: 24 }} />
        </div>
      </div>

      <FriendProfiles />

      <div style={{
        position: 'absolute',
        width: 620, height: 50,
        borderRadius: 15,
        top: 203,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(#615676, #392c54)',
        color: 'white',
        boxShadow: '0px 0px 20px black' }}
      >
        <div style={{ display: 'flex' }}>
          <div id='non-select' style={{
            paddingTop: 7, paddingBottom: 7,
            paddingRight: 12, paddingLeft: 12,
            marginLeft: 10,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: toggleState === 1 || isActive === 1 ? 'white' : 'silver',
            background: toggleState === 1 ? 'linear-gradient(#c77ee1, #ca47af)' : null }}
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
            color: toggleState === 2 || isActive === 2 ? 'white' : 'silver',
            background: toggleState === 2 ? 'linear-gradient(#c77ee1, #ca47af)' : null }}
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
            color: toggleState === 3 || isActive === 3 ? 'white' : 'silver',
            background: toggleState === 3 ? 'linear-gradient(#c77ee1, #ca47af)' : null }}
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
          background: 'linear-gradient(#c77ee1, #ca47af)' }}
          onClick={() => openModal(true)}
        >
          <PlusIcon style={{ width: 15, height: 15 }} />
        </div>
      </div>

      <div style={{
        width: 670, height: 525,
        paddingTop: 60, marginTop: 27,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll' }}
      >
        <Grid container spacing={0.5} >
          {Object.entries(feedPosts)?.map((feedPost) =>
            <Grid item xs={5.28} style={{ marginLeft: 25 }}>
              <FeedPost {...{ feedPost, openComments, setCommentId, openFullPost, setPostId }} />
            </Grid>
          )}
        </Grid>
        <div style={{ marginBottom: 10 }} />
      </div>

      <div style={{ position: 'absolute' }}>
        {isOpen && <Post {...{ openModal }} />}
      </div>

      <div style={{ position: 'absolute' }}>
        {fullPost && <FeedFullPost {...{ openComments, setCommentId, openFullPost, postId }} />}
      </div>

      <div style={{ position: 'absolute' }}>
        {comments && <FeedComments {...{ openComments, commentId }} />}
      </div>

    </div>
  );
}

export default Feed;
