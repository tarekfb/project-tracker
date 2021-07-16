import { useState } from 'react';
import { EditableListItem } from './editableListItem'
import CheckIcon from '@material-ui/icons/Check';


export function EditableList({ content, setContent }) {
    const [input, setInput] = useState('');
    const [isAdding, setIsAdding] = useState(false);

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
        if (value !== "")
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
        <div>
            <ul>
                {
                    content.map((task, i) => (
                        <EditableListItem key={i} content={task} setList={setContent} i={i} updateList={updateList} />
                    ))
                }
            </ul>
            <div>
                {
                    isAdding ? <input value={input} onInput={e => setInput(e.target.value)} className="border-solid border-4 border-black-500" />
                        : null
                }
                <button className="hover:text-blue-400" onClick={() => {
                    isAdding ? setIsAdding(false) : setIsAdding(true);
                    isAdding ? addListItem(input) : null;
                }}>
                    {isAdding ? <CheckIcon /> : <span>+</span>}
                </button>
            </div>
        </div>
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