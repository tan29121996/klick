import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, setDoc, deleteDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import {
  ThumbUpIcon,
  ThumbDownIcon,
  ShareIcon,
  AnnotationIcon
} from '@heroicons/react/solid';

function ForumsPost({ forumPost, openThread, setThreadId }) {
  const { data: session } = useSession();
  const [isActive, setIsActive] = useState(-1);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState('No replies');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, 'forumPosts', forumPost[1].id, 'likes'),
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
      onSnapshot(collection(db, 'forumPosts', forumPost[1].id, 'dislikes'),
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
        query(collection(db, 'forumPosts', forumPost[1].id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
        (snapshot) =>
          setComments(snapshot.docs)
      ),
    [db]
  );

  const viewThread = () => {
    openThread(true);
    setThreadId(forumPost[1].id);
  }

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'forumPosts', forumPost[1].id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', forumPost[1].id, 'likes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', forumPost[1].id, 'dislikes', session.user.uid));
    }
  };

  const dislikePost = async () => {
    if (hasDisliked) {
      await deleteDoc(doc(db, 'forumPosts', forumPost[1].id, 'dislikes', session.user.uid));
    } else {
      await setDoc(doc(db, 'forumPosts', forumPost[1].id, 'dislikes', session.user.uid), {
        username: session.user.username,
      });
      await deleteDoc(doc(db, 'forumPosts', forumPost[1].id, 'likes', session.user.uid));
    }
  };

  return (
    <div style={{
      width: 580,
      padding: 20, marginBottom: 20,
      borderRadius: 15,
      background: 'linear-gradient(#4f3a70, #452b5d)',
      boxShadow: '0px 10px 30px black' }}
    >
      <div style={{
        display: 'flex', alignItems: 'center',
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
        marginLeft: -20, marginRight: -20,
        marginTop: -20, marginBottom: 15,
        paddingLeft: 35, paddingRight: 35,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'linear-gradient(#392c54, #2e2343)' }}
      >
        <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: -15, letterSpacing: '1px', color: '#f6e0f4' }}>
          {forumPost[1].title}
        </div>
      </div>

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
            <div>{forumPost[1].displayName}</div>
            <Moment fromNow style={{ fontSize: 14, color: '#999bac' }}>{forumPost[1].timestamp}</Moment>
          </div>
        </div>

        <div id='non-select' style={{
          paddingTop: 7, paddingBottom: 7,
          paddingRight: 12, paddingLeft: 12,
          marginTop: 5, marginLeft: 24,
          fontSize: 14, textAlign: 'center',
          borderRadius: 20,
          color: 'white',
          background: 'linear-gradient(#a585bf, #6c54ac)'}}
        >
          {forumPost[1].community}
        </div>
      </div>

      <div style={{ fontSize: 14, marginTop: 10, color: 'silver' }}>
        {forumPost[1].content}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
        <div style={{ display: 'flex' }}>
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

          <div id='click' style={{
            height: 40,
            paddingLeft: 15, paddingRight: 15, borderRadius: 10,
            display: 'flex', alignItems: 'center',
            color: 'white',
            filter: isActive === 3 ? 'brightness(120%)' : null,
            boxShadow: isActive === 3 ? '0px 0px 20px #2d6b9b' : null,
            background: '#9f65b4' }}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(-1)}
            onClick={() => viewThread()}
          >
            <div style={{ fontSize: 14 }}>View thread</div>
          </div>

          <div id='non-select' style={{
            height: 18,
            display: 'flex', alignItems: 'center',
            paddingTop: 7, paddingBottom: 7,
            paddingRight: 12, paddingLeft: 12,
            marginLeft: 15, marginTop: 3,
            fontSize: 14, textAlign: 'center',
            borderRadius: 20,
            color: 'silver',
            border: '1px solid rgba(255, 255, 255, 0.2)'}}
          >
            {comments?.length}
            <AnnotationIcon style={{ width: 15, height: 15, marginLeft: 5 }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
  );
}

export default ForumsPost;
