import { useState, useEffect, useRef } from 'react';
import EditableListItem from './EditableListItem';
import { Check, Add } from '@material-ui/icons';

import firebase from '../firebase/clientApp';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const newListItemFieldStyle =
  'border-solid border-black border-b focus:outline-none focus:border-b focus:border-blue-400';
const newListItemButtonStyle = 'hover:text-blue-400';
const newListItemContainerStyle = 'flex flex-row';

export function EditableList({ content, setContent }) {
  const [input, setInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const ref = firebase.firestore().collection('tasks');
  const query = tasksRef.orderBy('createdAt').limit(25);
  const [tasks] = useCollectionData(query, { idField: 'id' });

  const getTasks = () => {
    // get info
  };

  // const createProject = async () => {
  //   await tasksRef.add({
  //     task: input,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  // };

  useEffect(() => {
    // When pressing adding a new list item, immediately focus the input.
    if (isAdding) {
      inputRef.current.focus();
    }
    getTasks();
  }, [isAdding]);

  // update the list: remove item or update item
  const updateList = (value, index) => {
    // if value "", remove at index
    // if index -1, remove last
    // if index => 0 && value != "", update at index
    if (value === '') {
      removeItem(index);
    } else if (index === -1) {
      removeItem(content.length - 1);
    } else if (index >= 0 && value !== '') {
      updateItem(value, index);
    }
  };

  // add item to end of list
  const addListItem = () => {
    // TODO: validate task
    if (input) {
      setContent((state) => [...state, input]);
    }
    // createProject();
  };

  // remove item at index
  const removeItem = (index) => {
    let newState = [...content];
    newState.splice(index, 1);
    setContent(newState);
  };

  // update item at index
  const updateItem = (value, index) => {
    let newState = [...content];
    newState[index] = value;
    setContent(newState);
  };

  const enterPressed = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      buttonRef.current.click();
    }
  };

  return (
    <div>
      <ul>
        {content.map((task, i) => (
          <EditableListItem key={i} content={task} setList={setContent} i={i} updateList={updateList} />
        ))}
      </ul>
      <div className={newListItemContainerStyle}>
        {isAdding ? (
          <input
            ref={inputRef}
            className={newListItemFieldStyle}
            value={input}
            onBlur={() => setIsAdding(false)}
            onInput={(e) => setInput(e.target.value)}
            onKeyPress={enterPressed.bind(this)}
          />
        ) : null}
        {isAdding ? (
          <button
            ref={buttonRef}
            className={newListItemButtonStyle}
            onClick={() => {
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
      <div>{tasks && tasks.map((t, i) => <div key={i}>{t.task}</div>)}</div>
    </div>
  );
}

//  <button
//     ref={buttonRef}
//     className={newListItemButtonStyle}
//     onClick={() => {
//       isAdding ? setIsAdding(false) : setIsAdding(true);
//       isAdding ? addListItem(input) : null;
//     }}>
//     {isAdding ? <Check /> : <Add />}

// <button className={newListItemButtonStyle} onClick={() => setIsAdding(true)}>
