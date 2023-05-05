import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, addDoc, setDoc, deleteDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import ThreadComments from './threadcomments.jsx';
import Moment from 'react-moment';
import {
  ThumbUpIcon,
  ThumbDownIcon,
  ShareIcon,
  AnnotationIcon,
  XIcon
} from '@heroicons/react/solid';

export default function Thread({ openThread, threadId }) {
  const { data: session } = useSession();
  const [threadData, setThreadData] = useState({});
  const [threadPost, setThreadPost] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isActive, setIsActive] = useState(0);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    await addDoc(collection(db, 'forumPosts', threadId, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      timestamp: serverTimestamp(),
    });

    setComment('');
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'forumPosts', threadId, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', threadId, 'likes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', threadId, 'dislikes', session.user.uid));
    }
  };

  const dislikePost = async () => {
    if (hasDisliked) {
      await deleteDoc(doc(db, 'forumPosts', threadId, 'dislikes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', threadId, 'dislikes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', threadId, 'likes', session.user.uid));
    }
  };

  useEffect(
    () =>
      onSnapshot(collection(db, 'forumPosts', threadId, 'likes'),
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
      onSnapshot(collection(db, 'forumPosts', threadId, 'dislikes'),
        (snapshot) =>
          setDislikes(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      setHasDisliked(
        dislikes.findIndex((dislike) => dislike.id === session?.user?.uid) !== -1
      ),
    [dislikes]
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'forumPosts')),
        (snapshot) => {
          setThreadData(snapshot.docs.filter((doc) => doc.id == threadId));
        }
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'forumPosts', threadId, 'comments'),
        orderBy('timestamp', 'desc')
      ),
        (snapshot) =>
          setComments(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    if (Object.keys(threadData).length > 0) {
      setThreadPost(threadData[0].data());
    }
  }, [db, threadData]);

  return (
    <div style={{ display: 'flex', width: 670, height: 752, justifyContent: 'center' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        background: 'linear-gradient(135deg, #342d4e, #181524)',
        height: '100%', overflowY: 'scroll',
        flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 15, color: '#efe2f9' }}>
          {threadPost?.title}
        </div>

        <div style={{ width: 625 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div id='click' style={{
                width: 50, height: 50,
                border: isActive === 1 ? '2px solid #fc85b4' : '2px solid #8d51e1',
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center' }}
                onMouseOver={() => setIsActive(1)}
                onMouseOut={() => setIsActive(-1)}
              >
                <img style={{ width: 44, height: 44, borderRadius: 16, objectFit: 'cover', background: 'white' }} />
              </div>

              <div style={{ marginLeft: 15, color: 'silver' }}>
                <div>{threadPost?.displayName}</div>
                <Moment fromNow style={{ fontSize: 14, color: '#999bac' }}>{threadPost?.timestamp}</Moment>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                <div style={{
                  width: 45, height: 40,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  background: '#79cbf1',
                  color: hasLiked ? 'white': '#d7effb',
                  filter: isActive === 4 ? 'brightness(110%)' : null,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseOver={() => setIsActive(4)}
                  onMouseOut={() => setIsActive(-1)}
                  onClick={likePost}
                >
                  <ThumbUpIcon style={{ width: 20, height: 20 }} />
                </div>
                <div style={{
                  height: 40, minWidth: 20,
                  paddingLeft: 15, paddingRight: 15,
                  background: '#a3b4ed', color: 'white',
                  borderLeft: '1px solid grey',
                  borderRight: '1px solid grey',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {likes.length - dislikes.length}
                </div>
                <div style={{
                  width: 45, height: 40,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  background: '#cc9de9',
                  color: hasDisliked ? 'white': '#efe2f9',
                  filter: isActive === 5 ? 'brightness(110%)' : null,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseOver={() => setIsActive(5)}
                  onMouseOut={() => setIsActive(-1)}
                  onClick={dislikePost}
                >
                  <ThumbDownIcon style={{ width: 20, height: 20 }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 14, marginTop: 10, color: 'silver' }}>
            {threadPost?.content}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
            <div id='click' style={{
              width: 40, height: 40,
              marginRight: 15,
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              filter: isActive === 2 ? 'brightness(120%)' : null,
              boxShadow: isActive === 2 ? '0px 0px 20px #2d6b9b' : null,
              background: '#9f65b4' }}
              onMouseOver={() => setIsActive(2)}
              onMouseOut={() => setIsActive(-1)}
            >
              <ShareIcon style={{ width: 15, height: 15 }} />
            </div>

            <div>
              <input
                value={comment}
                type='text'
                onChange={e => setComment(e.target.value)}
                placeholder='Add a comment'
                style={{
                  width: 430, height: 35,
                  border: '0px',
                  marginRight: 15,
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: 10,
                  background: 'rgba(150, 150, 150, 0.2)' }}
              />
            </div>
            <button id='click' style={{
              display: 'flex',
              width: 120, height: 40,
              borderRadius: 10, border: '0px',
              color: 'white',
              background: '#9f65b4',
              boxShadow: isActive === 3 ? '0px 0px 20px #2d6b9b' : null,
              justifyContent: 'center', alignItems: 'center' }}
              disabled={!comment.trim()}
              onMouseOver={() => setIsActive(3)}
              onMouseOut={() => setIsActive(0)}
              onClick={sendComment}
            >
              Add Comment
            </button>
        </div>
      </div>

        <div style={{ marginTop: 20, width: 625 }}>
          {comments.length > 0 ? (
            <div>
            {comments.map((comment, i) => (
              <ThreadComments {...{ comment, threadId }} />
              ))
            }
          </div>)
          : (
            <div id='non-select' key={comment.id} style={{
              display: 'flex', flexDirection: 'column', border: '1px solid #9987be',
              color: 'silver', fontSize: 14, alignItems: 'center',
              background: 'linear-gradient(#392c54, #2e2343)',
              borderRadius: 15, padding: 10, marginBottom: 20 }}
            >
              No Comments
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, marginLeft: -84 }}>
          <div style={{
            position: 'absolute',
            left: 84,
            width: 31,
            height: 30,
            marginTop: 0,
            background: 'linear-gradient(#ca47af, #c77ee1)',
            borderBottomRightRadius: 6,
            filter: isActive === 7 ? 'brightness(70%)' : 'brightness(50%)' }}
            onMouseOver={() => setIsActive(7)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => openThread(false)}
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
            onClick={() => openThread(false)}
            onMouseOver={() => setIsActive(7)}
            onMouseOut={() => setIsActive(0)}
          />
        </div>
      </div>
    </div>
  );
}
