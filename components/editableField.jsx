import { useState, useRef } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect } from 'react';
import firebase from '../firebase/clientApp';
import 'firebase/firestore';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export function EditableField({ id, placeholder }) {
  const [editVisibility, setEditVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const [loadingToDb, setLoadingToDb] = useState(false);

  const inputRef = useRef(null);

  const ref = firebase.firestore().collection(id);

  // on init, load content from db
  useEffect(() => {
    getContent();
  }, []);

  // Get content from db
  const getContent = () => {
    setLoadingFromDb(true);
    ref.onSnapshot((querySnapshot) => {
      let data;
      if (!querySnapshot.empty) {
        data = querySnapshot.docs[0].data().text;
      }
      setContent(data);
      setInput(data);
      setLoadingFromDb(false);
    });
  };

  const updateContentInDb = async () => {
    setLoadingToDb(true);

    let docRef = ref.doc(id);
    let doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ text: content });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    setLoadingToDb(false);
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
    if (!input) {
      setInput(content);
      return;
    }

    toggleEditState();

    // if they differ, update state
    if (input !== content) {
      let obj = { text: input };
      setContent(obj);
      updateContentInDb();
    }
  };

  // toggle the state of editing: true or false
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

  // confirm edit on pressing enter
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
        <Loader type="ThreeDots" color="#000000" height={25} width={25} />
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

//     const [editVisibility, setEditVisibility] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [input, setInput] = useState(content);

//     // toggle the state of editing: true or false
//     const toggleEditState = () => {
//         // shallow copy to properly update state
//         let newState = {
//             ...isEditing
//         };

//         // if !null toc confirm prop exists
//         if (isEditing != null) {
//             isEditing ? newState = false : newState = true;
//             setIsEditing(newState);
//         }
//     };

//     // handle if the field is currently being edited or not
//     const handleEditVisibility = (bool) => {
//         // this means the property is currently being edited
//         // do nothing
//         if (isEditing) {
//             return null;
//         }

//         let newState = {
//             ...editVisibility
//         };

//         newState = bool;

//         setEditVisibility(newState);
//     }

//     // update input
//     const handleChange = (value) => {
//         setInput(value);
//     };

//     // confirm edit and call parent function to update state
//     const confirmEdit = () => {
//         // if they differ, update state
//         if (input !== content) {
//             updateList(input, i);
//         }

//     };

//     return (
//         <li key={i}
//             onMouseEnter={e => {
//                 handleEditVisibility(true);
//             }}
//             onMouseLeave={e => {
//                 handleEditVisibility(false);
//             }}
//         >
//             <div>
//                 <div className="hover:text-blue-400 inline">
//                     <span>- </span>
//                     <input type="text" placeholder={content} value={input} onBlur={() => {
//                         toggleEditState();
//                         confirmEdit();
//                     }} onChange={(e) => {
//                         handleChange(e.target.value);
//                     }} onFocus={(e) => {
//                         toggleEditState();
//                     }}
//                     />
//                 </div>
//                 <button
//                     className={`hover:text-blue-400 ${editVisibility ? "" : "hidden"}`}
//                 >
//                     {
//                         isEditing == true ? <CheckIcon onClick={() => {
//                             toggleEditState();
//                         }} /> : <div> <DeleteIcon onClick={() => {
//                             updateList("", i);
//                         }} /> </div>
//                     }
//                 </button>
//             </div>
//         </li>
//     )
// }

//     const [editVisibility, setEditVisibility] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);

//     const toggleEditState = () => {
//         // shallow copy to properly update state
//         let newState = {
//             ...isEditing
//         };

//         // if !null toc confirm prop exists
//         if (isEditing != null) {
//             isEditing ? newState = false : newState = true;
//             setIsEditing(newState);
//         }
//     };

//     const handleEditVisibility = (bool) => {
//         // this means the property is currently being edited
//         // do nothing
//         if (isEditing) {
//             return null;
//         }

//         let newState = {
//             ...editVisibility
//         };
//         newState = bool;
//         setEditVisibility(newState);
//     }

//     return (
//         <div
//             onMouseEnter={e => {
//                 handleEditVisibility(true);
//             }}
//             onMouseLeave={e => {
//                 handleEditVisibility(false);
//             }}
//         >
//             <span className="mr-1">{content}</span>
//             {editVisibility ?
//                 <button className="hover:text-blue-400"
//                     onClick={() => {
//                         toggleEditState()
//                     }}>
//                     {isEditing == true ? <CheckIcon /> : <EditIcon />}
//                 </button> : null}
//         </div>
//     )
// }
