import { useState } from 'react';
import { TextareaAutosize } from '@mui/material';

export function Notes({ content, setContent }) {
  const [input, setInput] = useState(content ? content : '');

  // confirm edit and update state
  const confirmEdit = () => {
    // if they differ, update state
    if (input !== content) {
      setContent('notes', input);
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
