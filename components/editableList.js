import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';
import { findIndexInStringArray } from '../util/util'
import { EditableListItem } from './editableListItem'

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export function EditableList({ content, setTasks }) {
    const [input, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(() => {
        const initialState = populateInitialArray();
        return initialState;
    });

    function populateInitialArray() {
        let array = [];

        for (let i = 0; i < content.length; i++) {
            array.push(false);
        }

        return array;
    }

    const handleIsVisibleState = () => {
        // initate array to bool false, for length of content array
        if (!isVisible) {
            return populateInitialArray();
        }
        // add bool false to array, to represent another item being added to content list  
        else {
            setIsVisible([...isVisible, false]);
        }
    };

    const addListItem = (listItem) => {
        // TODO: validate task
        setTasks(state => [...state, listItem]);
        handleIsVisibleState();
    }

    const removeTask = (listItem, index) => {
        const taskIndex = findIndexInStringArray(content, listItem);

        let state = [...content];
        let visibilityState = [...isVisible];
        if (taskIndex !== -1) {
            state.splice(taskIndex, 1);
            setTasks(state);
        }

        visibilityState.splice(index, 1);
        setIsVisible(visibilityState);
    }

    // const toggleEditState = () => {
    //     // shallow copy to properly update state
    //     let newState = {
    //         ...isEditing
    //     };

    //     // if !null toc confirm prop exists
    //     if (isEditing != null) {
    //         isEditing ? newState = false : newState = true;
    //         setIsEditing(newState);
    //     }
    // };

    const handleVisibility = (bool, i) => {
        let newState = [...isVisible];
        newState[i] = bool;
        setIsVisible(newState);
    }

    return (
        <ul>
            {
                content.map((task, i) => (
                    <EditableListItem style={{ margin: "10px" }} content={content[i]} i={i} setIsVisible={setIsVisible} isVisible={isVisible} handleVisibility={handleVisibility} />
                    // <li key={i}
                    //     onMouseEnter={e => {
                    //         handleVisibility(true, i);
                    //     }}
                    //     onMouseLeave={e => {
                    //         handleVisibility(false, i);
                    //     }}
                    // >
                    //     <span>{task}</span>


                    //     <button
                    //         className={isVisible[i] ? utilStyles.show : utilStyles.hide}
                    //         onClick={() => {
                    //             removeTask(task, i);
                    //         }}>
                    //         <DeleteIcon />
                    //     </button>
                    // </li>
                ))
            }
            <input value={input} onInput={e => setInput(e.target.value)} />
            <button onClick={() => {
                addListItem(input)
            }}>
                Add
            </button>
        </ul>
    )
}