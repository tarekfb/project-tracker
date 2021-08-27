import { useState, useRef, useEffect } from 'react';
import CheckIcon from '@material-ui/icons/Check';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import { useSavingContext } from './contexts/SavingContext';

import SyncLoader from 'react-spinners/SyncLoader';


export function EditableField({ placeholder, id }) {
  const [content, setContent] = useState('');
  const [editVisibility, setEditVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/qlvfoYjqp0IYI9o30xOn/' + id);
  const { toggleIsSaving } = useSavingContext();

  useEffect(async () => {
    await getContent();
    setInput(content);
  }, []);

  const getContent = async () => {
    setLoadingFromDb(true);

    let doc = await ref.doc(id).get();
    if (doc.exists) {
      setContent(doc.data().text);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      setContent('');
    }

    setLoadingFromDb(false);
  };

  const updateContentInDb = async () => {
    toggleIsSaving(true);

    let docRef = ref.doc(id);
    let doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ text: content });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    toggleIsSaving(false);
  };

  // handle if the field is currently being edited or not
  const handleEditVisibility = (bool) => {
    // this means the property is currently being edited
    // do nothing
    if (isEditing) {
      return null;
    }

    let newState = {
      ...editVisibility,
    };

    newState = bool;
    setEditVisibility(newState);
  };

  // update input
  const handleChange = (value) => {
    setInput(value);
  };

  // confirm edit and update state
  const confirmEdit = () => {
    // If empty value, revert back to prev content
    if (!input) {
      setInput(content);
      return;
    }

    toggleEditState();

    // if they differ, update state
    if (input !== content) {
      setContent(input);
      updateContentInDb();
    }

    console.log('confirm edit');
  };

  const toggleEditState = () => {
    // shallow copy to properly update state
    let newState = {
      ...isEditing,
    };

    // if !null toc confirm prop exists
    if (isEditing != null) {
      isEditing ? (newState = false) : (newState = true);
      setIsEditing(newState);
    }
  };

  const triggerClickForButtonRef = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      inputRef.current.blur(); // this triggers onBlur, which confirms edit
    }
  };

  return (
    <div>
      {loadingFromDb ? (
        <SyncLoader color="#000000" size={10} />
      ) : (
        <div onMouseEnter={() => handleEditVisibility(true)} onMouseLeave={() => handleEditVisibility(false)}>
          <div className={`${isEditing ? '' : 'hover:text-blue-400'} inline`}>
            <input
              ref={inputRef}
              className="focus:outline-none focus:border-b focus:border-blue-400 "
              type="text"
              value={input}
              placeholder={placeholder ? placeholder : ''}
              onKeyPress={(e) => triggerClickForButtonRef(e)}
              onBlur={() => {
                confirmEdit();
              }}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              onFocus={() => {
                toggleEditState();
              }}
            />
          </div>
          <button className={`inline-block hover:text-blue-400 ${editVisibility ? '' : 'hidden'}`}>
            {isEditing ? (
              <CheckIcon
                onClick={() => {
                  toggleEditState();
                }}
              />
            ) : null}
          </button>
        </div>
      )}
    </div>
  );
}
