import { useState, useEffect, useRef } from 'react';
import EditableListItem from './EditableListItem';
import { Check, Add } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

const newListItemFieldStyle =
  'border-solid border-black border-b focus:outline-none focus:border-b focus:border-blue-400';
const newListItemButtonStyle = 'hover:text-blue-400';
const newListItemContainerStyle = 'flex flex-row';

export function EditableList({ content, setContent }) {
  const [input, setInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState(content);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // When pressing adding a new list item, immediately focus the input.
  useEffect(() => {
    if (isAdding) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    setContent('tasks', tasks);
  }, [tasks]);

  // update the list: remove item or update item
  const updateList = (value, index) => {
    const removeItem = (index) => {
      let newState = [...tasks];
      newState.splice(index, 1);
      setTasks(newState);
    };

    const updateItem = (value, index) => {
      let newState = [...tasks];
      newState[index] = value;
      setTasks(newState);
    };

    // if value "", remove at index
    // if index -1, remove last
    // if index => 0 && value != "", update at index
    if (value === '') {
      removeItem(index);
    } else if (index === -1) {
      removeItem(tasks.length - 1);
    } else if (index >= 0 && value !== '') {
      updateItem(value, index);
    }
    // setContent('tasks', tasks);
  };

  const addListItem = async () => {
    // TODO: validate input
    console.log(input);
    if (input) {
      setTasks((state) => [...state, input]), setContent('tasks', tasks);
      // setContent('tasks', tasks);
      setInput('');
    }
  };

  const triggerClickForButtonRef = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      buttonRef.current.click();
    }
  };

  return (
    <div>
      {/* Task list section */}
      <ul>
        {tasks.map((task, i) => (
          <EditableListItem key={i} content={task} setList={setTasks} i={i} updateList={updateList} />
        ))}
      </ul>

      {/* Add task section */}
      <div className={newListItemContainerStyle}>
        {isAdding ? (
          <input
            ref={inputRef}
            className={newListItemFieldStyle}
            value={input}
            onBlur={() => setIsAdding(false)}
            onInput={(e) => setInput(e.target.value)}
            onKeyPress={(e) => triggerClickForButtonRef(e)}
          />
        ) : null}
        {isAdding ? (
          <button
            ref={buttonRef}
            className={newListItemButtonStyle}
            onClick={() => {
              // used by triggerClickForButtonRef: clicking enter
              addListItem();
              setIsAdding(false);
            }}
            onMouseDownw={() => {
              // onMouseDown instead of onclick because onBlur of inputRef triggers before onclick
              // https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
              buttonRef.current.blur();
              addListItem();
              setIsAdding(false);
            }}>
            <Check />
          </button>
        ) : (
          <button className={newListItemButtonStyle} onClick={() => setIsAdding(true)}>
            <Add />
          </button>
        )}
      </div>
    </div>
  );
}
