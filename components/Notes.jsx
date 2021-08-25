import { useState, useEffect } from 'react';
import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useSavingContextValue } from './contexts/SavingContext';
import { TextareaAutosize } from '@material-ui/core';

export function Notes() {
  const [notes, setNotes] = useState('');
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const { setIsSaving } = useSavingContextValue();

  const ref = firebase.firestore().collection('notes');

  // on init, load tasks from db
  useEffect(() => {
    getNotes();
  }, []);

  const updateNotesInDb = async () => {
    // if (notes) {
    setIsSaving(true);

    let docRef = ref.doc('note');
    let doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ text: notes });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    setIsSaving(false);
    // }
  };

  // Get content from db
  const getNotes = async () => {
    setLoadingFromDb(true);

    let doc = await ref.doc('note').get();
    if (doc.exists) {
      setNotes(doc.data().text);
    } else {
      console.log('No such document!');
    }

    setLoadingFromDb(false);
  };

  return (
    <div>
      {loadingFromDb ? (
        <Loader type="TailSpin" color="#000000" height={100} width={100} />
      ) : (
        <div>
          <TextareaAutosize
            className="w-full p-3"
            maxRows={15}
            minRows={3}
            placeholder="Write some notes pls"
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
            onBlur={updateNotesInDb}
          />
        </div>
      )}
    </div>
  );
}
