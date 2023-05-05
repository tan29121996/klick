import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, addDoc, onSnapshot, collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { XIcon } from '@heroicons/react/solid';

export default function FeedComments({ openComments, commentId }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isActive, setIsActive] = useState(0);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    await addDoc(collection(db, 'feed', commentId, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      timestamp: serverTimestamp(),
    });

    setComment('');
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'feed', commentId, 'comments'),
        orderBy('timestamp', 'desc')
      ),
        (snapshot) =>
          setComments(snapshot.docs)
      ),
    [db]
  );

  return (
    <div style={{ display: 'flex', width: 670, height: 752, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        borderRadius: 5,
        background: 'linear-gradient(135deg, #342d4e, #181524)',
        boxShadow: '0px 0px 20px black',
        flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ marginTop: 10, fontSize: 14, color: 'white' }}>
            Comments
          </div>
        </div>

        <div style={{ margin: 15, width: 550, height: 250, overflowY: 'scroll' }}>
          {comments.length > 0 ? (
            <div>
            {comments.map((comment) => (
              <div id='non-select' key={comment.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                <div
                  style={{
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

                  <Moment fromNow style={{ display: 'flex', marginRight: 10, color: 'silver' }}>
                    {comment.data().timestamp?.toDate()}
                  </Moment>

                </div>

                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', fontSize: 14, color: 'silver' }}>
                  <div style={{ marginLeft: 5, marginRight: 10 }}>{comment.data().comment}</div>
                </div>
              </div>
              ))
            }
          </div>)
          : (
          <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', fontSize: 14, color: 'silver' }}>
            No Comments
          </div>
          )}
        </div>

        <div>
          <input
            value={comment}
            type='text'
            onChange={e => setComment(e.target.value)}
            placeholder='Add a comment'
            style={{ width: 525, border: '0px', color: 'white', textAlign: 'center', background: 'transparent'}}
          />
        </div>

        <button id='click' style={{
          display: 'flex',
          width: 140, height: 50,
          borderRadius: 10, border: '0px',
          marginTop: 20, marginBottom: 25,
          marginLeft: 25, marginRight: 25,
          color: 'white',
          background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
          boxShadow: isActive === 2 ? '0px 0px 20px #2d6b9b' : null,
          justifyContent: 'center', alignItems: 'center' }}
          disabled={!comment.trim()}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
          onClick={sendComment}
        >
          Add Comment
        </button>

        <div style={{ position: 'absolute', top: 0, left: 0, marginLeft: -84 }}>
          <div style={{
            position: 'absolute',
            left: 83.5,
            width: 31,
            height: 30,
            marginTop: 0,
            background: 'linear-gradient(#ca47af, #c77ee1)',
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 5,
            filter: isActive === 3 ? 'brightness(70%)' : 'brightness(50%)' }}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(0)}
            onClick={() => openComments(false)}
          />
          <XIcon
            style={{
              position: 'absolute',
              left: 92,
              width: 15,
              marginTop: 7,
              fontSize: 13,
              letterSpacing: '2px',
              color: isActive === 3 ? 'white' : '#c2c3cd'
            }}
            onClick={() => openComments(false)}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(0)}
          />
        </div>

      </div>
    </div>
  );
}
