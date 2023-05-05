import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, deleteDoc, setDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import {
  ThumbUpIcon,
  ThumbDownIcon,
  BookmarkIcon,
  HeartIcon, ShareIcon, AnnotationIcon, UserAddIcon
} from '@heroicons/react/solid';

function FeedPost({ feedPost, openComments, setCommentId, openFullPost, setPostId }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isActive, setIsActive] = useState(0);

  useEffect(
    () =>
      onSnapshot(collection(db, 'feed', feedPost[1].id, 'likes'),
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

  const viewFullPost = () => {
    openFullPost(true);
    setPostId(feedPost[1].id);
  }

  const viewComments = () => {
    openComments(true);
    setCommentId(feedPost[1].id);
  }

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'feed', feedPost[1].id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'feed', feedPost[1].id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div style={{
      width: 297,
      marginBottom: 20,
      borderRadius: 15,
      background: 'linear-gradient(#342d4e, #181524)',
      boxShadow: '0px 10px 30px black' }}
    >
      <div style={{ display: 'flex', padding: 15, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex'}}>
          <div id='click' style={{
            width: 40, height: 40,
            border: '2px solid #c257eb',
            borderRadius: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' }}
          >
            <img style={{ width: 34, height: 34, borderRadius: 12, background: 'white' }} />
          </div>

          <div style={{ color: 'white', marginLeft: 15 }}>
            <div id='click' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{feedPost[1].displayName}</div>
            <Moment fromNow style={{ fontSize: 14, color: '#999bac' }}>{feedPost[1].timestamp}</Moment>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ height: 70, width: 260, fontSize: 14, marginLeft: 20, marginRight: 20, marginBottom: 15, color: 'silver', overflow: 'scroll' }}>
          {feedPost[1].content}
        </div>
        <div id='click' style={{
          height: 40,
          paddingLeft: 15, paddingRight: 15,
          borderRadius: 10,
          marginBottom: 20,
          display: 'flex', alignItems: 'center',
          color: 'white',
          filter: isActive === 5 ? 'brightness(120%)' : null,
          boxShadow: isActive === 5 ? '0px 0px 20px #2d6b9b' : null,
          background: 'linear-gradient(135deg, #ca47af, #c77ee1)' }}
          onMouseOver={() => setIsActive(5)}
          onMouseOut={() => setIsActive(-1)}
          onClick={() => viewFullPost()}
        >
          <div style={{ fontSize: 14 }}>View full post</div>
        </div>
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
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
