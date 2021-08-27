import { useState, useEffect, useRef } from 'react';

import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export default function EditableListItem({ content, i, updateList }) {
  const [iconVisibility, setIconVisibility] = useState([false, false, false]);
  const [isEditing, setIsEditing] = useState([false, false, false]);
  const [input, setInput] = useState(content);

  const inputRef = useRef(null);

  // handle if the field is currently being edited or not
  const handleIsEditing = (bool, i) => {
    let newState = [...isEditing];
    newState[i] = bool;
    setIsEditing(newState);
  };

  // handle visiblity of icons: trashcan or checkbox
  const handleIconVisibility = (bool, i, forceable) => {
    // this means the property is currently being edited
    // do nothing
    if (isEditing[i] && forceable !== 'force') {
      return null;
    }

    let newState = [...iconVisibility];
    newState[i] = bool;
    setIconVisibility(newState);
  };

  // update input
  const handleChange = (value) => {
    setInput(value);
  };

  // confirm edit and call parent function to update state
  const confirmEdit = (i) => {
    // if they differ, update state
    if (input !== content) {
      updateList(input, i);
    }
    handleIsEditing(false, i);
    handleIconVisibility(false, i, 'force');
    // force to override setIsEditing async issue
    // setState hook is async
    // handleIconVisibility() executes when setState in handleIsEditing() hasnt finished setting state
    // meaning flow gets caught in the if (isEditing[i]) check
    // this check is neccessary because if user is editing item, but clicks elsewhere, should keep editing
  };

  // confirm edit on pressing enter
  const enterPressed = (event, i) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      inputRef.current.blur();
      //13 is the enter keycode
      confirmEdit(i);
    }
  };

  return (
    <li
      className="hover:text-blue-400 inline"
      key={i}
      onMouseEnter={() => {
        handleIconVisibility(true, i);
      }}
      onMouseLeave={() => {
        handleIconVisibility(false, i);
      }}>
      <div className="flex flex-row space-x-1 focus:border-b focus:border-blue-400">
        <span>- </span>
        <input
          ref={inputRef}
          className="focus:outline-none"
          type="text"
          placeholder={content}
          value={input}
          onKeyPress={(e) => enterPressed(e, i)}
          onBlur={() => confirmEdit(i)}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => handleIsEditing(true, i)}
          placeholder="implement this feature"
        />
        <button className={`hover:text-blue-400 ${iconVisibility[i] ? '' : 'hidden'}`}>
          {isEditing[i] ? (
            <CheckIcon onClick={() => handleIsEditing(false, i)} />
          ) : (
            <DeleteIcon
              onClick={() => {
                handleIsEditing(false, i, 'force');
                updateList('', i);
              }}
            />
          )}
        </button>
      </div>
    </li>
  );
}
