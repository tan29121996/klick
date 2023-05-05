import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString, uploadBytesResumable } from '@firebase/storage';
import { CameraIcon, XIcon } from '@heroicons/react/solid';

export default function Post({ openModal }) {
  const { data: session } = useSession();
  const contentRef = useRef(null);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isActive, setIsActive] = useState(0);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  const removeImage = () => {
    setSelectedFile(null);
  }

  const upload = async () => {
    if (loading) return

    setLoading(true);

    const docRef = await addDoc(collection(db, 'feed'), {
      displayName: session.user.name,
      content: contentRef.current.value,
      timestamp: serverTimestamp()
    });

    const imageRef = ref(storage, `feed/${docRef.id}/image`);

    const uploadTask = uploadBytesResumable(imageRef, selectedFile);

    uploadTask.on("state_changed", (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setPercent(percent);
    },
    (err) => console.log(err),
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateDoc(
            doc(db, 'feed', docRef.id),
            { image: url }
          );
          openModal(false);
          setLoading(false);
          setSelectedFile(null);
          contentRef.current.value='';
        });
      }
    );
  }

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
        <div style={{ color: 'silver', marginTop: 10 }}>Create a post</div>

        <div>
          <textarea
            ref={contentRef}
            style={{
              width: 560, height: 390, border: '0px',
              marginTop: 20, marginLeft: 20, marginRight: 20,
              padding: 10,
              borderRadius: 10,
              color: 'white', background: '#463c5d'}}
          />
        </div>

        {selectedFile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img id='click' style={{
              maxWidth: 140, maxHeight: 140,
              marginTop: 15,
              borderRadius: 7,
              objectFit: 'cover',
              border: '2px solid rgba(200, 200, 200, 0.3)',
              filter: isActive === -1 ? 'brightness(60%)' : null }}
              src={selectedFile}
              onMouseOver={() => setIsActive(-1)}
              onMouseOut={() => setIsActive(0)}
              onClick={() => removeImage()}
            />
            <div id='click' style={{
              color: isActive === -1 ? 'white' : 'grey', marginTop: 15 }}
              onMouseOver={() => setIsActive(-1)}
              onMouseOut={() => setIsActive(0)}
              onClick={() => removeImage()}
            >
              Remove
            </div>
          </div>
        ) : (
        <div id='click' style={{
          width: 50, height: 50,
          border: isActive === 1 ? '2px solid #fc85b4' : '2px solid silver',
          borderRadius: 50,
          marginTop: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
          onMouseOver={() => setIsActive(1)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => filePickerRef.current.click()}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isActive === 1 ? '#fc85b4' : 'silver',
            filter: isActive === 1 ? 'brightness(150%)' : 'contrast(80%) brightness(120%)',
            background: 'linear-gradient(#01dea0, #426a9d, #7e56a8, #896a9b)' }}
          >
            <CameraIcon style={{ width: 20, height: 20 }} />
          </div>
          <input
            ref={filePickerRef}
            type='file'
            hidden
            onChange={addImageToPost}
          />
        </div>
      )}

        <button id='click' style={{
          display: 'flex',
          width: 140, height: 50,
          borderRadius: 10, border: '0px',
          marginTop: 20, marginBottom: 25,
          marginLeft: 25, marginRight: 25,
          color: 'white',
          background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
          boxShadow: isActive === 2 ? '0px 0px 20px #2d6b9b' : null,
          filter: isActive === 2 ? 'brightness(120%)' : null,
          justifyContent: 'center', alignItems: 'center' }}
          onMouseOver={() => setIsActive(2)}
          onMouseOut={() => setIsActive(0)}
          onClick={() => upload()}
        >
          {loading ? 'Posting . . . ' + percent : 'Create post'}
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
            onClick={() => openModal(false)}
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
            onClick={() => openModal(false)}
            onMouseOver={() => setIsActive(3)}
            onMouseOut={() => setIsActive(0)}
          />
        </div>

      </div>
    </div>
  );
}
