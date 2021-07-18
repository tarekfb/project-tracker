import { useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export function TestField({ content, setContent }) {
    const [editVisibility, setEditVisibility] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState(content);

    // handle if the field is currently being edited or not
    const handleEditVisibility = (bool) => {
        // this means the property is currently being edited
        // do nothing
        if (isEditing) {
            return null;
        }

        let newState = {
            ...editVisibility
        };

        newState = bool;
        setEditVisibility(newState);
    }

    // update input
    const handleChange = (value) => {
        setInput(value);
    };

    // confirm edit and update state
    const confirmEdit = (value) => {
        // if they differ, update state
        if (value !== content) {
            setContent(value);
        }
    };

    // toggle the state of editing: true or false
    const toggleEditState = () => {
        // shallow copy to properly update state
        let newState = {
            ...isEditing
        };

        // if !null toc confirm prop exists
        if (isEditing != null) {
            isEditing ? newState = false : newState = true;
            setIsEditing(newState);
        }
    };

    return (
        <div
            onMouseEnter={e => {
                handleEditVisibility(true);
            }}
            onMouseLeave={e => {
                handleEditVisibility(false);
            }}
        >
            <textarea className="mr-1 p-2 outline-none"
                onBlur={(e) => {
                    toggleEditState();
                    confirmEdit(e.target.value);
                }} onFocus={(e) => {
                    toggleEditState();
                }} onChange={e => {
                    setInput(e.target.value);
                }}
                value={input}></textarea>
            {editVisibility ?
                <button className="hover:text-blue-400"
                    onClick={() => {
                        toggleEditState()
                    }}>
                    {isEditing == true ? <CheckIcon /> : <EditIcon />}
                </button> : null}
        </div>
    )
}

{/* <input type="text" placeholder={content} value={input} onBlur={() => {
    toggleEditState();
    confirmEdit();
}} onChange={(e) => {
    handleChange(e.target.value);
}} onFocus={(e) => {
    toggleEditState();
}}
/> */}