import { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { doc, addDoc, getDoc, onSnapshot, collection, query, where, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import ChatList from './chatList';
import Moment from 'react-moment';
import { PhoneIcon, VideoCameraIcon, BanIcon, DotsVerticalIcon } from '@heroicons/react/outline';

function Chat() {
  const [isActive, setIsActive] = useState(0);
  const [chatDetails, setChatDetails] = useState({});
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [lastMessage, setLastMessage] = useState('');
  const messagesEndRef = useRef(null)
  const { data: session } = useSession();

  const getInfo = (users, currentUserProfile) => {
    const newUsers = {...users};

    delete newUsers[currentUserProfile];

    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    addDoc(collection(db, 'userChats', chatDetails?.id, 'messages'), {
      uid: session?.user?.uid,
      message: input,
      timestamp: serverTimestamp(),
    })
    setInput('');
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    let getData;

    const fetchChats = async () => {
      getData = onSnapshot(
        query(
        collection(db, 'userChats'),
        where ('chats', 'array-contains', session?.user?.uid)
      ),
      (snapshot) => {
        setChats(
          snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchChats();

    return getData;
  }, [db, session]);

  useEffect(() => {
    setReceiver(getInfo(chatDetails?.users, session?.user?.uid));
  }, [chatDetails, session]);

  useEffect(() => {
    if (Object.keys(chatDetails).length > 0) {
      onSnapshot(
        query(
          collection(db, 'userChats', chatDetails?.id, 'messages'),
          orderBy('timestamp', 'asc')
        ),
        snapshot =>
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })
          )
        )
      );
    }
  }, [db, chatDetails]);

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 30,
        width: 300,
        background: 'linear-gradient(#1e203c, transparent)', }}
      />
      <div style={{ width: 270, height: 752, marginLeft: 20, marginRight: 20, overflowY: 'scroll' }}>
        {Object.entries(chats)?.map((chat) =>
          <ChatList {...{ setChatDetails, chat }} />
        )}
        <div style={{ height: 30 }} />
      </div>

      <div style={{
        positiom: 'absolute', top: 0,
        width: 360, height: 752,
        background: 'linear-gradient(135deg, #342d4e, #181524)',
        boxShadow: '-3px 0px 10px rgba(0, 0, 0, 0.3)' }}
      >
        <div style={{
          width: 360, height: 161,
          marginRight: 30,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          display: Object.keys(chatDetails).length > 0 ? 'flex' : 'none',
          alignItems: 'center',
          flexDirection: 'column',
          boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)',
          background: 'rgba(112, 73, 179, 0.2)'}}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img style={{ width: 50, height: 50, borderRadius: 50, border: '2px solid silver', background: 'white', objectFit: 'cover' }} src={receiver?.photoUrl} />
            <div style={{ height: 60, margin: 15, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <div style={{ fontSize: 15, color: 'lightgrey' }}>{receiver?.displayName}</div>
              <div style={{ fontSize: 14, color: 'rgba(200, 200, 200, 0.7)' }}>{receiver?.email}</div>
            </div>
          </div>
          <div style={{ width: 300, display: 'flex', justifyContent: 'space-between' }}>
            <PhoneIcon id='click' style={{
              width: 24, height: 24,
              borderRadius: 12, padding: 12,
              color: 'lightgrey',
              border: '1px solid #ca47bc',
              background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
              filter: isActive === 1 ? 'brightness(120%) contrast(80%)' : 'grayscale(50%)' }}
              onMouseOver={() => setIsActive(1)}
              onMouseOut={() => setIsActive(0)}
            />
            <VideoCameraIcon id='click' style={{
              width: 24, height: 24,
              borderRadius: 12, padding: 12,
              color: 'lightgrey',
              border: '1px solid #ca47bc',
              background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
              filter: isActive === 2 ? 'brightness(120%) contrast(80%)' : 'grayscale(50%)' }}
              onMouseOver={() => setIsActive(2)}
              onMouseOut={() => setIsActive(0)}
            />
            <BanIcon id='click' style={{
              width: 24, height: 24,
              borderRadius: 12, padding: 12,
              color: 'lightgrey',
              border: '1px solid #ca47bc',
              background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
              filter: isActive === 3 ? 'brightness(120%) contrast(80%)' : 'grayscale(50%)' }}
              onMouseOver={() => setIsActive(3)}
              onMouseOut={() => setIsActive(0)}
            />
            <DotsVerticalIcon id='click' style={{
              width: 24, height: 24,
              borderRadius: 12, padding: 12,
              color: 'lightgrey',
              border: '1px solid #ca47bc',
              background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
              filter: isActive === 4 ? 'brightness(120%) contrast(80%)' : 'grayscale(50%)' }}
              onMouseOver={() => setIsActive(4)}
              onMouseOut={() => setIsActive(0)}
            />
          </div>
        </div>
        <div style={{ width: '100%', height: 550, overflowY: 'scroll', color: 'white', paddingTop: 20, marginLeft: 20, marginRight: 20 }}>
          {messages.map((message) =>
            <div id='non-select' style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <img style={{ width: 35, height: 35, borderRadius: 30, border: '2px solid silver', background: 'white', objectFit: 'cover' }} src={receiver?.photoUrl}/>
              <div style={{
                display: 'flex', flexDirection: 'column',
                marginLeft: 20, padding: 10,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                filter: 'grayscale(10%) contrast(80%)',
                background: 'linear-gradient(135deg, #ca47a1, #d17ee1)' }}
              >
                <div style={{ maxWidth: 245, fontSize: 14 }}>{message.message}</div>
                <Moment fromNow  style={{ alignSelf: 'end', marginTop: 5, fontSize: 12, color: 'rgba(255, 255, 255, 0.7)' }}>{message?.timestamp?.toDate()}</Moment>
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
          <div style={{ marginTop: 60 }} />
        </div>

        <div style={{
          position: 'absolute', top: 20,
          width: 350, height: 692,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', alignItems: 'center',
          display: Object.keys(chatDetails).length === 0 ? 'flex' : 'none' }}
        >
          <img style={{ width: 150, filter: 'grayscale(50%)' }} src='/images/Assets/Chat Banner.png' />
          <div style={{ width: 200, textAlign: 'center', color: '#999bac' }}>Select a chat from the left to get started.</div>
          <div style={{ margin: 35 }}/>
        </div>

        <div style={{
          position: 'absolute',
          width: 320, height: 40,
          left: 328, bottom: 20,
          borderRadius: 30,
          border: '1px solid grey',
          display: Object.keys(chatDetails).length > 0 ? 'flex' : 'none',
          justifyContent: 'space-between', alignItems: 'center',
          backdropFilter: 'blue(100%)',
          background: '#4d4959' }}
        >
          <img style={{ width: 25, height: 25, margin: 7.5, background: 'white', borderRadius: 30, border: '1px solid grey' }} />
          <input
            type='text'
            style={{ width: 210, height: 25, color: 'silver', background: 'transparent', border: '0px' }}
            placeholder='Send message'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div id='click' style={{
            margin: 7.5,
            fontSize: 14,
            borderRadius: 30,
            color: 'white',
            paddingTop: 5, paddingBottom: 5,
            paddingLeft: 10, paddingRight: 10,
            filter: isActive === 5 ? 'brightness(120%)' : null,
            background: 'linear-gradient(135deg, #ca47af, #c77ee1)'}}
            onMouseOver={() => setIsActive(5)}
            onMouseOut={() => setIsActive(0)}
            onClick={sendMessage}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
