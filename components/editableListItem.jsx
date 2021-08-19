import { useState } from 'react';

import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export default function EditableListItem({ content, i, updateList }) {
  const [editVisibility, setEditVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(content);

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

  // confirm edit and call parent function to update state
  const confirmEdit = () => {
    // if they differ, update state
    if (input !== content) {
      updateList(input, i);
    }
  };

  return (
    <li
      key={i}
      onMouseEnter={(e) => {
        handleEditVisibility(true);
      }}
      onMouseLeave={(e) => {
        handleEditVisibility(false);
      }}>
      <div>
        <div className="hover:text-blue-400 inline">
          <span>- </span>
          <input
            type="text"
            placeholder={content}
            value={input}
            onBlur={() => {
              toggleEditState();
              confirmEdit();
            }}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onFocus={(e) => {
              toggleEditState();
            }}
          />
        </div>
        <button
          className={`hover:text-blue-400 ${editVisibility ? '' : 'hidden'}`}>
          {isEditing ? (
            <CheckIcon
              onClick={() => {
                toggleEditState();
              }}
            />
          ) : null}
          {isEditing ? null : (
            <div>
              <DeleteIcon
                onClick={() => {
                  updateList('', i);
                }}
              />
            </div>
          )}
        </button>
      </div>
    </li>
  );
}