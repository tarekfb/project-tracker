import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { MdAccountCircle, MdLock } from 'react-icons/md'
import {PrimaryButton } from '@/components/PrimaryButton'

export const AuthForm = ({ register, signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 justify-start mb-2">
        <TextField
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdAccountCircle />
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: {
              WebkitBoxShadow: '0 0 0 1000px white inset',
            },
          }}
        />
        <TextField
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdLock />
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: {
              WebkitBoxShadow: '0 0 0 1000px white inset',
            },
          }}
        // InputProps (capital i) provides props for material Input componenet
        // inputProps provides props for html input element
        // webkitboxshadow removes blue bg on autofill
        />
      </div>
      <div className="flex flex-row space-x-2">
        <PrimaryButton content="Sign in" onClick={() => {
          signIn(email, password);
          clearFields();
        }} />
        <PrimaryButton content="Register" onClick={() => {
          register(email, password);
          clearFields();
        }} />
      </div>
    </div>
  );
};
