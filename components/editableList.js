import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';
import { EditableListItem } from './editableListItem'

export function EditableList({ content, setContent }) {
    const [input, setInput] = useState('');

    // update the list: remove item or update item
    const updateList = (value, index) => {
        // if value "", remove at index
        // if index -1, remove last
        // if index => 0 && value != "", update at index 

        if (value === "") {
            removeItem(index);
            console.log("first");
        } else if (index === -1) {
            removeItem(content.length - 1);
        } else if (index >= 0 && value !== "") {
            updateItem(value, index);
        }
    };

    // add item to end of list
    const addListItem = (value) => {
        // TODO: validate task
        setContent(state => [...state, value]);
        // handleIsVisibleState();
    }

    // remove item at index
    const removeItem = (index) => {
        let newState = [...content];
        newState.splice(index, 1);
        setContent(newState);
    }

    // update item at index
    const updateItem = (value, index) => {
        let newState = [...content];
        newState[index] = value;
        setContent(newState);
    };

    return (
        <ul>
            {
                content.map((task, i) => (
                    <EditableListItem key={i} content={task} setList={setContent} i={i} updateList={updateList} />
                ))
            }
            <input value={input} onInput={e => setInput(e.target.value)} className="border-solid border-4 border-black-500" />
            <button onClick={() => {
                addListItem(input)
            }}>
                Add
            </button>
        </ul>
    )
}

    // // const [isVisible, setIsVisible] = useState(() => {
    // //     const initialState = populateInitialArray();
    // //     return initialState;
    // // });

    // function populateInitialArray() {
    //     let array = [];

    //     for (let i = 0; i < content.length; i++) {
    //         array.push(false);
    //     }

    //     return array;
    // }