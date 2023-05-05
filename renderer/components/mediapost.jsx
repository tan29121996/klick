import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, deleteDoc, setDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { HeartIcon, ShareIcon, AnnotationIcon, UserAddIcon } from '@heroicons/react/solid';

function Mediapost({ key, id, username, userImg, img, caption, timestamp, openComments, setCommentId, setImageHover, setShowImage }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isActive, setIsActive] = useState(0);

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'),
        (snapshot) =>
          setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const viewComments = () => {
    openComments(true);
    setCommentId(id);
  }

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const expandImage = (img) => {
    setImageHover(img);
    setShowImage(true);
  }

  return (
    <div style={{
      position: 'relative',
      left: 22, top: -6,
      marginTop: 24,
      width: 626,
      borderRadius: 25,
      boxShadow: '0px 2px 10px #1c1c1c',
      filter: 'saturate(90%)',
      background: 'linear-gradient(135deg, #615676, #392c54)' }}
    >
      <div style={{
        position: 'relative',
        width: 313,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        overflow: 'hidden',
        border: '1px solid #5e5e5e',
        boxShadow: '0px 2px 10px #1c1c1c',
        background: 'linear-gradient(135deg, #615676, #392c54, #2e2343)' }}
      >
        <div style={{ width: 293, display: 'flex', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <div id='click' style={{
            width: 40, height: 40,
            border: '2px solid #c257eb',
            borderRadius: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' }}
          >
            <img style={{ width: 34, height: 34, borderRadius: 12, background: 'white' }}
              src={userImg}
            />
          </div>

          <div style={{ color: 'white', width: 180, textAlign: 'center' }}>
            <div id='click' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{username}</div>
            <Moment fromNow style={{ fontSize: 14, color: '#999bac' }}>{timestamp?.toDate()}</Moment>
          </div>

          <div id='click' style={{
            width: 40, height: 30,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid #999bac',
            filter: isActive === 4 ? 'brightness(120%)' : null,
            background: 'linear-gradient(#615676, #392c54)' }}
            onMouseOver={() => setIsActive(4)}
            onMouseOut={() => setIsActive(0)}
          >
            <p style={{ marginTop: 0, color: 'white' }}>{'. . .'}</p>
          </div>
        </div>
        <img style={{ width: '100%', height: 237, marginBottom: -10, borderRadius: 25, objectFit: 'cover', backgroundColor: 'black' }}
          onMouseOver={() => expandImage(img)}
          onMouseOut={() => setShowImage(false)}
          src={img}
        />
      </div>

      <div id='non-select' style={{ position: 'absolute', top: 0, left: 313, width: 313, display: 'flex' }}>
        <p style={{ height: 107, marginTop: 18, marginLeft: 30, marginRight: 30, fontSize: 14, color: '#e6e6e6', overflowY: 'scroll' }}>
          {caption}
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 313, width: 313, display: 'flex', justifyContent: 'space-evenly' }}>
        <div id='click' style={{
          width: 50, height: 50,
          border: isActive === 1 ? '2px solid #39c0ed' : '2px solid #fc85b4',
          borderRadius: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isActive === 1 ? '#39c0ed' : '#fc85b4',
            filter: isActive === 1 ? 'brightness(150%)' : 'contrast(80%) brightness(120%)',
            background: hasLiked ? 'linear-gradient(#fdaacb, #b97992)' : 'linear-gradient(#01dea0, #426a9d, #7e56a8, #896a9b)',
            boxShadow: hasLiked ? '0px 0px 20px #cc0003' : null}}
            onClick={likePost}
          >
            <HeartIcon style={{ width: 20, height: 20, color: hasLiked ? '#fd2b2f' : null }} />
          </div>
        </div>

        <div id='click' style={{
          width: 50, height: 50,
          border: isActive === 2 ? '2px solid #39c0ed' : '2px solid lightgrey',
          borderRadius: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            color: isActive === 2 ? '#39c0ed' : 'lightgrey',
            filter: isActive === 2 ? 'brightness(150%)' : 'contrast(80%) brightness(120%)',
            background: 'linear-gradient(#01dea0, #426a9d, #7e56a8, #896a9b)' }}
            onClick={() => viewComments()}
          >
            <UserAddIcon style={{ width: 20, height: 20 }} />
          </div>
        </div>

        <div id='click' style={{
          width: 50, height: 50,
          border: isActive === 3 ? '2px solid #39c0ed' : '2px solid #85d8fc',
          borderRadius: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
          onMouseOver={() => setIsActive(3)}
          onMouseOut={() => setIsActive(0)}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            color: isActive === 3 ? '#39c0ed' : '#85d8fc',
            filter: isActive === 3 ? 'brightness(150%)' : 'contrast(80%) brightness(120%)',
            background: 'linear-gradient(#01dea0, #426a9d, #7e56a8, #896a9b)' }}
          >
            <ShareIcon style={{ width: 20, height: 20 }} />
          </div>
        </div>
      </div>

      <div id='click' style={{
        position: 'absolute',
        bottom: 25, left: 343,
        width: 177, height: 50,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'lightgrey',
        backgroundColor: isActive === 5 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)' }}
        onMouseOver={() => setIsActive(5)}
        onMouseOut={() => setIsActive(0)}
        onClick={() => viewComments()}
      >
        <AnnotationIcon style={{ width: 20, height: 20, marginRight: 10 }} />
        <p style={{ fontSize: 14 }}>View Comments</p>
      </div>

      <div id='non-select' style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: 80, height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'lightgrey',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 22,
        opacity: 0.8,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))' }}
      >
        <HeartIcon style={{ width: 20, height: 20, marginRight: 5 }} />
        <p style={{ fontSize: 14 }}>{likes.length}</p>
      </div>

    </div>
  );
};

export default Mediapost;
