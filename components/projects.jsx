import React, { useState, useEffect } from 'react';
import { findIndex } from '../util/util';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { useProjectContext } from './contexts/ProjectContext';
import { useSavingContext } from './contexts/SavingContext';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';

export function Projects() {
  const [input, setInput] = useState('');
  const { projects, handleProjects } = useProjectContext();
  const { toggleIsSaving } = useSavingContext();

  const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/qlvfoYjqp0IYI9o30xOn/notes');

  const log = () => {
    console.log(
      firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/qlvfoYjqp0IYI9o30xOn/completion')
    );
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    let snapshot = await ref.get();
  };

  const addProject = (input) => {
    let newProject = {};
    newProject.name = input;
    newProject.startDate = new Date().toLocaleString('en-GB');
    handleProjects([...projects, newProject]);
  };

  const removeProject = (name) => {
    let answer = confirm('Are you sure you want to delete project: ' + name + '?');
    if (answer) {
      const projectIndex = findIndex(projects, 'name', name);
      let newState = [...projects];
      if (projectIndex !== -1) {
        newState.splice(projectIndex, 1);
        handleProjects(newState);
      }
    }
  };

  return (
    <div>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <Link href={`/${project.name}`}>
              <a>{project.name}</a>
            </Link>
            <button
              onClick={() => {
                removeProject(project.name);
              }}>
              {/* <Link href={`/${project}`}>
                                <a>{project}</a>
                            </Link>
                            <button onClick={() => {
                                removeProject(project);
                            }}> */}
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
      <input value={input} onInput={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          addProject(input);
        }}>
        Add
      </button>
    </div>
  );
}
