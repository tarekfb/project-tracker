import React, { useState } from 'react';
import { findIndex } from '../util/util';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { useProjectContext } from './contexts/ProjectContext';
import { useSavingContext } from './contexts/SavingContext';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';

const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/');

export function Projects() {
  const [input, setInput] = useState('');
  const { projects, setProjectsWrapper } = useProjectContext();
  const { toggleIsSaving } = useSavingContext();

  const addProject = async (input) => {
    toggleIsSaving(true);

    let newProject = {};
    newProject.name = input;
    newProject.startDate = new Date().toLocaleString('en-GB');
    setProjectsWrapper([...projects, newProject]);
    await ref.add(newProject);

    setInput('');
    toggleIsSaving(false);
  };

  const removeProject = (name) => {
    let answer = confirm('Are you sure you want to delete project: ' + name + '?');
    if (answer) {
      const projectIndex = findIndex(projects, 'name', name);
      let projects = [...projects];
      if (projectIndex !== -1) {
        setProjectsWrapper(projects, 'delete', projects[1]);
        projects.splice(projectIndex, 1);
      } else {
        console.log("Couldn't find project: ", name);
      }
    }
  };

  return (
    <div>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <Link href={`/${project.id}`}>
              {/* as={{ pathname: `/${project.name}`, query: { id: project.id } }}> */}
              <a>{project.name}</a>
            </Link>
            <button
              onClick={() => {
                removeProject(project.name);
              }}>
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
