import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { useProjectContextValue } from '../contexts/ProjectContext';
import { useSavingContextValue } from '../contexts/SavingContext';

import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/FirebaseApp';

export function Navbar() {
  const { projects } = useProjectContextValue();
  const { isSaving, handleSaving } = useSavingContextValue();

  return (
    <div className="flex justify-between space-x-4 items-center bg-prussianBlue text-white p-4 pr-12">
      <h1 className="text-4xl">
        <Link href="/">
          <a>Project tracker</a>
        </Link>
      </h1>
      <DropDownMenu projects={projects} />
      {/* <div>{user ? <span>logged in</span> : <span>logged out</span>}</div> */}
      <div>Saving value: {isSaving ? <span>true</span> : <span>false</span>}</div>
      <button onClick={() => handleSaving(false)}>false</button>
      <button onClick={() => handleSaving(true)}>true</button>
    </div>
  );
}
