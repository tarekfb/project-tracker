import { useState, useEffect, useRef } from 'react';
import EditableListItem from './EditableListItem';
import { Check, Add } from '@material-ui/icons';
import firebase from '../firebase/clientApp';
import 'firebase/firestore';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const newListItemFieldStyle =
  'border-solid border-black border-b focus:outline-none focus:border-b focus:border-blue-400';
const newListItemButtonStyle = 'hover:text-blue-400';
const newListItemContainerStyle = 'flex flex-row';

export function EditableList() {
  const [input, setInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const [loadingToDb, setLoadingToDb] = useState(false);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const ref = firebase.firestore().collection('tasks');

  // Get tasks from db
  const getTasks = () => {
    setLoadingFromDb(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTasks(items);
      setLoadingFromDb(false);
    });
  };

  const addTaskToDb = async (obj) => {
    setLoadingToDb(true);
    await ref.add(obj);
    setLoadingToDb(false);
  };

  // When pressing adding a new list item, immediately focus the input.
  useEffect(() => {
    if (isAdding) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  // on init, load tasks from db
  useEffect(() => {
    getTasks();
  }, []);

  // update the list: remove item or update item
  const updateList = (value, index) => {
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
  };

  const addListItem = () => {
    // TODO: validate task
    let obj = { text: input };
    if (input) {
      setTasks((state) => [...state, obj]);
      addTaskToDb(obj);
    }
  };

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

  const triggerClickForButtonRef = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      buttonRef.current.click();
    }
  };

  return (
    <div>
      {loadingFromDb ? (
        <Loader type="TailSpin" color="#000000" height={80} width={80} />
      ) : (
        <div>
          {/* Task list section */}
          <ul>
            {tasks.map((task, i) => (
              <EditableListItem key={i} content={task.text} setList={setTasks} i={i} updateList={updateList} />
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
      )}
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
