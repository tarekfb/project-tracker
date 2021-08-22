import { useState, useRef } from 'react';
import CheckIcon from '@material-ui/icons/Check';

export function EditableField({ content, setContent, placeholder }) {
  const [editVisibility, setEditVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(content);

  const inputRef = useRef(null);

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
    console.log(input);
    if (!input) {
      setInput(content);
      return;
    }

    toggleEditState();

    // if they differ, update state
    if (input !== content) {
      setContent(input);
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
  const enterPressed = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      inputRef.current.blur(); // this triggers onBlur, which confirms edit
    }
  };

  return (
    <div onMouseEnter={() => handleEditVisibility(true)} onMouseLeave={() => handleEditVisibility(false)}>
      <div className={`${isEditing ? '' : 'hover:text-blue-400'} inline`}>
        <input
          ref={inputRef}
          className="focus:outline-none focus:border-b focus:border-blue-400 "
          type="text"
          value={input}
          placeholder={placeholder ? placeholder : ''}
          onKeyPress={(e) => enterPressed(e)}
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
