import { useState, useEffect } from 'react';
import firebase from '../firebase/clientApp';
import 'firebase/firestore';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import TextareaAutosize from 'react-textarea-autosize';

export function Notes() {
  const [notes, setNotes] = useState(false);
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const [loadingToDb, setLoadingToDb] = useState(false);

  const ref = firebase.firestore().collection('notes');

  // on init, load tasks from db
  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    updateNotesInDb();
  }, [notes]);

  const updateNotesInDb = async () => {
    // TO DO update and put in editablefield same method okbye
  };

  // Get content from db
  const getNotes = () => {
    setLoadingFromDb(true);
    ref.onSnapshot((querySnapshot) => {
      let data;
      if (!querySnapshot.empty) {
        data = querySnapshot.docs[0].data().text;
      }
      setNotes(data);
      setLoadingFromDb(false);
    });
  };

  return (
    <div className="w-6/12">
      {loadingFromDb ? (
        <Loader type="TailSpin" color="#000000" height={100} width={100} />
      ) : (
        <div>
          <TextareaAutosize
            className="sm:w-7/12 p-3"
            maxRows={15}
            minRows={3}
            placeholder="Write some notes pls"
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
          />
        </div>
      )}
    </div>
  );
}
