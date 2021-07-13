import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export function EditableListItem({ content, i, isVisible, handleVisibility }) {
    return (
        <li key={i}
            onMouseEnter={e => {
                handleVisibility(true, i);
            }}
            onMouseLeave={e => {
                handleVisibility(false, i);
            }}
        >
            <span>{content}</span>

            {/* <EditableListItem content={content[i]} i={i} setIsVisible={setIsVisible} isVisible={isVisible} /> */}

            <button
                className={isVisible[i] ? utilStyles.show : utilStyles.hide}
                onClick={() => {
                    removeTask(task, i);
                }}>
                <DeleteIcon />
            </button>
        </li>
    )
}