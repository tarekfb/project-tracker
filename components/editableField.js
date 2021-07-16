import { useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export function EditableField({ content }) {
    const [editVisibility, setEditVisibility] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    return (
        <div
            onMouseEnter={e => {
                handleEditVisibility(true);
            }}
            onMouseLeave={e => {
                handleEditVisibility(false);
            }}
        >
            {content}
            {editVisibility ?  <button
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