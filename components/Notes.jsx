import { useState } from 'react';
import { useSavingContext } from './contexts/SavingContext';
import { TextareaAutosize } from '@material-ui/core';

export function Notes({ content, setContent }) {
  const [input, setInput] = useState(content);
  const { toggleIsSaving } = useSavingContext();

  // confirm edit and update state
  const confirmEdit = () => {
    // If empty value, revert back to prev content
    if (!input) {
      setInput(content);
      return;
    }

    // if they differ, update state
    if (input !== content) {
      setContent('notes', content);
    }
  };

  return (
    <div>
      <TextareaAutosize
        className="w-full p-3"
        maxRows={15}
        minRows={3}
        placeholder="Write some notes pls"
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
        onBlur={confirmEdit}
      />
    </div>
  );
}
