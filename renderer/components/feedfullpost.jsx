import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, deleteDoc, setDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { HeartIcon, ShareIcon, AnnotationIcon, XIcon } from '@heroicons/react/solid';

function FeedFullPost({ openComments, setCommentId, openFullPost, postId }) {
  const { data: session } = useSession();
  const [postData, setPostData] = useState({});
  const [feedPost, setFeedPost] = useState();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isActive, setIsActive] = useState(0);

  useEffect(
    () =>
      onSnapshot(collection(db, 'feed', postId, 'likes'),
        (snapshot) =>
          setLikes(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'feed')),
        (snapshot) => {
          setPostData(snapshot.docs.filter((doc) => doc.id == postId));
        }
      ),
    [db]
  );

  useEffect(() => {
    if (Object.keys(postData).length > 0) {
      setFeedPost(postData[0].data());
    }
  }, [db, postData]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'feed', postId, 'comments')
      ),
        (snapshot) =>
          setComments(snapshot.docs)
      ),
    [db]
  );

  const viewComments = () => {
    openComments(true);
    setCommentId(postId);
  }

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'feed', postId, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'feed', postId, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div style={{ height: 752, display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'relative',
        maxWidth: 500,
        borderRadius: 15,
        background: 'linear-gradient(#342d4e, #181524)',
        boxShadow: '0px 10px 30px black' }}
      >
        <div style={{ display: 'flex', padding: 15, justifyContent: 'space-between' }}>
          <div style={{ width: 30 }}/>

          <div>
            <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: -5 }}>
              <div id='click' style={{
                width: 40, height: 40,
                marginBottom: 5,
                border: '2px solid #c257eb',
                borderRadius: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center' }}
              >
                <img style={{ width: 34, height: 34, borderRadius: 12, background: 'white' }} />
              </div>
              <div id='click' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feedPost?.displayName}</div>
              <Moment fromNow style={{ fontSize: 14, color: '#999bac' }}>{feedPost?.timestamp}</Moment>
            </div>
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxheight: 600, fontSize: 14, marginLeft: 20, marginRight: 20, marginBottom: 15, color: 'silver', overflow: 'scroll' }}>
            {feedPost?.content}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <img style={{ width: 500, maxHeight: 400 }} src={feedPost?.image} />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
          paddingLeft: 35, paddingRight: 35,
          paddingTop: 10, paddingBottom: 10,
          borderTop: '1px solid rgba(200, 200, 200, 0.5)',
          background: 'linear-gradient(#604c7d, #463263)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <div id='click' style={{
              width: 40, height: 40,
              border: isActive === 1 ? '2px solid #39c0ed' : '2px solid #fc85b4',
              color: isActive === 1 ? '#39c0ed' : '#fc85b4',
              background: 'linear-gradient(#4f3a70, #452b5d)',
              boxShadow: hasLiked ? '0px 0px 10px #fd2b2f' : null,
              borderRadius: 45,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(1)}
              onMouseOut={() => setIsActive(0)}
              onClick={likePost}
            >
              <HeartIcon style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ width: 30, color: 'silver', marginLeft: 10 }}>{likes.length}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center'}}>
            <div id='click' style={{
              width: 45, height: 45,
              border: isActive === 2 ? '2px solid #39c0ed' : '2px solid #b897eb',
              color: isActive === 2 ? '#39c0ed' : '#b897eb',
              background: 'linear-gradient(#4f3a70, #452b5d)',
              borderRadius: 45,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(2)}
              onMouseOut={() => setIsActive(0)}
              onClick={() => viewComments()}
            >
              <AnnotationIcon style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ width: 30, color: 'silver', marginLeft: 10 }}>{comments.length}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center'}}>
            <div id='click' style={{
              width: 45, height: 45,
              border: isActive === 3 ? '2px solid #39c0ed' : '2px solid #999bac',
              color: isActive === 3 ? '#39c0ed' : '#999bac',
              background: 'linear-gradient(#4f3a70, #452b5d)',
              borderRadius: 45,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}
              onMouseOver={() => setIsActive(3)}
              onMouseOut={() => setIsActive(0)}
            >
              <ShareIcon style={{ width: 20, height: 20 }} />
            </div>
            <div style={{ width: 30, color: 'silver', marginLeft: 10 }}>0</div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, marginLeft: -84 }}>
            <div style={{
              position: 'absolute',
              left: 84,
              width: 31,
              height: 30,
              marginTop: 0,
              background: 'linear-gradient(#ca47af, #c77ee1)',
              borderBottomRightRadius: 6, borderTopLeftRadius: 6,
              filter: isActive === 7 ? 'brightness(70%)' : 'brightness(50%)' }}
              onMouseOver={() => setIsActive(7)}
              onMouseOut={() => setIsActive(0)}
              onClick={() => openFullPost(false)}
            />
            <XIcon
              style={{
                position: 'absolute',
                left: 92,
                width: 15,
                marginTop: 7,
                fontSize: 13,
                letterSpacing: '2px',
                color: isActive === 7 ? 'white' : '#c2c3cd'
              }}
              onClick={() => openFullPost(false)}
              onMouseOver={() => setIsActive(7)}
              onMouseOut={() => setIsActive(0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedFullPost;
