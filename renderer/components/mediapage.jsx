import { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';
import Mediapost from './mediapost';
import PostImage from './postImage';
import MediaComments from './mediacomments';
import FriendProfiles from './friendprofiles';
import { ChatIcon, HomeIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import { doc, onSnapshot, collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

function Media({ session }) {
  const [toggleState, setToggleState] = useState(1);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [isOpen, openModal] = useState(false);
  const [comments, openComments] = useState(false);
  const [commentId, setCommentId] = useState();
  const [imageHover, setImageHover] = useState();
  const [showImage, setShowImage] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const imgElement = useRef(null);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs.filter((doc) => doc.data().username !== 'admin'));
        }
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setUserPosts(snapshot.docs.filter((doc) => doc.data().username === 'admin'));
        }
      ),
    [db]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'rgba(54, 54, 90, 0.5)', overflowY: 'scroll' }}>
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

          <img style={{ height: 40, filter: 'hue-rotate(250deg) contrast(60%) brightness(140%) opacity(80%)' }}
            src='/images/Assets/Photo Banner.png'
          />

          <div id='non-select' style={{ width: 87, padding: 7, marginTop: 5, marginLeft: 24 }} />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 112, left: 276,
        width: 22, height: 80,
        marginLeft: 20,
        background: 'linear-gradient(to right, #2a2b4b, transparent)', }}
      />

      <FriendProfiles />

      <div style={{
        position: 'absolute',
        top: 112, right: 207,
        width: 22, height: 80,
        marginRight: 20,
        background: 'linear-gradient(to left, #2a2b4b, transparent)', }}
      />

      {toggleState === 1 &&
        posts.map(post =>
          <Mediapost
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
            openComments={openComments}
            setCommentId={setCommentId}
            setImageHover={setImageHover}
            setShowImage={setShowImage}
          />
      )}

      {toggleState === 2 &&
        userPosts.map(post =>
          <Mediapost
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
            openComments={openComments}
            setCommentId={setCommentId}
            setImageHover={setImageHover}
            setShowImage={setShowImage}
          />
      )}

      <div style={{ marginTop: 90 }} />

      <div style={{ position: 'absolute', bottom: 0, width: 670, marginBottom: 0, display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '100%', opacity: 0.95,  }} src='/images/Assets/BottomBar.png' />
        <img id='click' style={{ position: 'absolute', top: -10, width: 90 }}
         src='/images/Assets/Add Button.png'
         onMouseOver={({target}) => target.style.filter = 'hue-rotate(120deg)'}
         onMouseOut={({target}) => target.style.filter = null}
         onClick={() => openModal(true)}
        />
        <div id='click' style={{
          position: 'absolute',
          top: 22, left: 15,
          width: 40, height: 40,
          borderRadius: 40,
          boxShadow: '0px 0px 10px #1c1c1c1c',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #615676, #392c54)',
          color: isActive === 1 ? 'white' : '#c8bbdb',
          filter: isActive === 1 ? 'brightness(170%)' : 'contrast(80%) brightness(120%)' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(1)}
        >
          <HomeIcon style={{ width: 20, height: 20 }} />
        </div>
        <div id='click' style={{ position: 'absolute', top: 33, left: 65, color: '#999bac', display: 'none' }}>Messages</div>
        <img id='click' style={{
          position: 'absolute',
          top: 22, right: 15,
          width: 40, height: 40,
          borderRadius: 40,
          background: 'white',
          boxShadow: '0px 0px 10px #1c1c1c1c',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: isActive === 2 ? 'white' : '#c8bbdb',
          filter: isActive === 2 ? 'brightness(150%)' : 'brightness(120%)' }}
          src={session?.user?.image}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => setToggleState(2)}
        />
        <div id='click' style={{ position: 'absolute', top: 33, right: 65, color: '#999bac', display: 'none' }}>Profile</div>
      </div>

      <div style={{ position: 'absolute' }}>
        {isOpen && <PostImage {...{ openModal }} />}
      </div>

      <div style={{ position: 'absolute' }}>
        {comments && <MediaComments {...{ openComments, commentId }} />}
      </div>

      <div style={{ position: 'absolute', left: 407, top: (795 - imageHeight) / 2 }}>
        {showImage &&
          <img style={{ width: 450, borderRadius: 10, boxShadow: '0px 0px 20px black' }}
            ref={imgElement}
            src={imageHover}
            onLoad={() => setImageHeight(imgElement.current.naturalHeight * (450 / imgElement.current.naturalWidth))}
            onMouseOver={() => setShowImage(true)}
            onMouseOut={() => setShowImage(false)}
          />
        }
      </div>

    </div>
  );
};

export default Media;
