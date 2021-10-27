import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

export const AuthForm = ({ register, signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 justify-start">
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
                <AccountCircle />
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
                <Lock />
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
        <button
          className="rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
          onClick={() => {
            signIn(email, password);
            clearFields();
          }}>
          SIGN IN
        </button>
        <button
          className="rounded-md
            bg-gradient-main
            py-2 px-10 
            text-white 
            transition-all 
            duration-500 
            transform 
            hover:scale-110  
            hover:opacity-75"
          onClick={() => {
            register(email, password);
            clearFields();
          }}>
          REGISTER
        </button>
      </div>
    </div>
  );
};
