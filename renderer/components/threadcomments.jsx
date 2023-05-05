import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, addDoc, setDoc, deleteDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid';

export default function ThreadComments({ comment, threadId }) {
  const { data: session } = useSession();
  const [reply, setReply] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isActive, setIsActive] = useState(0);

  useEffect(
    () =>
      onSnapshot(collection(db, 'forumPosts', threadId, 'comments', comment.id, 'likes'),
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
      onSnapshot(collection(db, 'forumPosts', threadId, 'comments', comment.id, 'dislikes'),
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

  const sendReply = async (e) => {
    e.preventDefault();

    const commentToSend = reply;

    await addDoc(collection(db, 'forumPosts', threadId, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      replyTo: [comment.data().username, comment.data().comment],
      timestamp: serverTimestamp(),
    });

    setReply('');
  };

  const likeComment = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'likes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'dislikes', session.user.uid));
    }
  };

  const dislikeComment = async () => {
    if (hasDisliked) {
      await deleteDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'dislikes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'dislikes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', threadId, 'comments', comment.id, 'likes', session.user.uid));
    }
  };

  return (
    <div id='non-select' style={{
      display: 'flex', flexDirection: 'column', border: '1px solid #776b87',
      background: 'linear-gradient(#392c54, #2e2343)', borderRadius: 15, padding: 10, marginBottom: 20 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 13,
        color: 'silver' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <img style={{ width: 25, height: 25, margin: 5, borderRadius: 25, background: 'white' }} />
          <div style={{ width: 410, marginLeft: 5, marginRight: 10, fontSize: 15, color: '#efe2f9' }}>{comment.data().username}{': '}</div>
        </div>

        <Moment fromNow style={{ display: 'flex', width: 300, marginRight: 10, color: 'silver', justifyContent: 'end', whitespace: 'nowrap' }}>
          {comment.data().timestamp?.toDate()}
        </Moment>
      </div>

      {comment.data().replyTo &&
        <div>
          <div style={{ fontSize: 14, color: '#999bac', marginLeft: 5, marginTop: 5, marginBottom: 10 }}>In reply to:</div>
          <div id='non-select' style={{
            display: 'flex', flexDirection: 'column',
            color: 'silver', fontSize: 14,
            border: '1px solid #76727e',
            background: 'rgba(236, 227, 251, 0.1)',
            borderRadius: 10, padding: 10, marginTop: 5, marginBottom: 5 }}
          >
            <div style={{ marginBottom: 3 }}>{comment.data().replyTo[0]}: </div>
            <div>{comment.data().replyTo[1]}</div>
          </div>
        </div>
      }

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', fontSize: 14, color: 'silver', marginTop: 5 }}>
        <div style={{ marginLeft: 5, marginRight: 10 }}>{comment.data().comment}</div>
      </div>

      <div style={{ display: 'flex', marginTop: 10, marginLeft: 10 }}>
        <div style={{
          color: isActive === 1 || hasLiked ? '#cbf179' : '#79cbf1',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(-1)}
          onClick={likeComment}
        >
          <ThumbUpIcon style={{ width: 20, height: 20 }} />
        </div>
        <div style={{
          height: 40, minWidth: 20,
          paddingLeft: 15, paddingRight: 15,
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {likes.length - dislikes.length}
        </div>
        <div style={{
          color: isActive === 2 || hasDisliked ? '#e99dab' : '#cc9de9',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(-1)}
          onClick={dislikeComment}
        >
          <ThumbDownIcon style={{ width: 20, height: 20 }} />
        </div>

        <input
          value={reply}
          type='text'
          onChange={e => setReply(e.target.value)}
          placeholder='Reply to the comment'
          style={{
            width: 405, height: 30,
            border: '0px',
            marginTop: 2, marginLeft: 15,
            color: 'white',
            textAlign: 'center',
            borderRadius: 10,
            background: 'rgba(200, 200, 200, 0.1)' }}
        />
        <div id='click' style={{
          height: 18,
          paddingTop: 7, paddingBottom: 7,
          paddingLeft: 15, paddingRight: 15,
          marginLeft: 10, marginTop: 2,
          borderRadius: 10,
          display: 'flex', alignItems: 'center',
          fontSize: 13,
          background: '#9f65b4',
          color: 'white',
          boxShadow: isActive === 3 ? '0px 0px 20px #2d6b9b' : null }}
          disabled={!reply.trim()}
          onMouseOver={() => setIsActive(3)}
          onMouseOut={() => setIsActive(-1)}
          onClick={sendReply}
        >
          Reply
        </div>
      </div>
    </div>
  );
}
