import { useState, useRef } from 'react';
import CheckIcon from '@material-ui/icons/Check';

export function EditableField({ placeholder, id, content, setContent }) {
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
    toggleEditState();

    // if they differ, update state
    if (input !== content) {
      setContent(id, input);
    }
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
  );
}
