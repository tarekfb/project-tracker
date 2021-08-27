import { useState, useEffect } from 'react';
import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import SyncLoader from 'react-spinners/SyncLoader';
import { useSavingContext } from './contexts/SavingContext';
import { TextareaAutosize } from '@material-ui/core';

export function Notes() {
  const [notes, setNotes] = useState('');
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const { toggleIsSaving } = useSavingContext();

  const ref = firebase.firestore().collection('notes');

  // on init, load tasks from db
  useEffect(() => {
    getNotes();
  }, []);

  const updateNotesInDb = async () => {
    // if (notes) {
    toggleIsSaving(true);

    let docRef = ref.doc('note');
    let doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ text: notes });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    toggleIsSaving(false);
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
        <SyncLoader color="#000000" size={150} />
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
