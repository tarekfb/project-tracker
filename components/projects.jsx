import React, { useState } from 'react';
import { findIndex } from '../util/util';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProjectContext } from './contexts/ProjectContext';
import { useSavingContext } from './contexts/SavingContext';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import { ClipLoader } from 'react-spinners';

const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/');

export function Projects({ setLoadNewProject }) {
  const [input, setInput] = useState('');
  const { projects, setProjectsWrapper } = useProjectContext();
  const { toggleIsSaving } = useSavingContext();

  const router = useRouter();

  const addProject = async () => {
    toggleIsSaving(true);
    setLoadNewProject(true);

    // create project obj at client
    let newProject = {};
    newProject.name = input;
    newProject.startDate = new Date().toLocaleString('en-GB');

    // send to db
    let docRef = await setProjectsWrapper([...projects], 'create', newProject);
    setInput('');
    // open new proj
    router.push('/' + docRef.id);
    toggleIsSaving(false);
    // if the loading of page matches this state then keep
    // if not fix
  };

  const removeProject = async (name) => {
    let answer = confirm('Are you sure you want to delete project: ' + name + '?');
    if (answer) {
      const projectIndex = findIndex(projects, 'name', name);
      let newProjects = [...projects];
      if (projectIndex !== -1) {
        toggleIsSaving(true);
        newProjects.splice(projectIndex, 1);
        await setProjectsWrapper(newProjects, 'delete', newProjects[1]);
        toggleIsSaving(false);
      } else {
        console.log("Couldn't find project: ", name);
      }
    }
  };

  return (
    <>
      <ul>
        {projects ? (
          projects.map((project) => (
            <li key={project.id}>
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
          ))
        ) : (
          <ClipLoader />
        )}
      </ul>
      <input value={input} onInput={(e) => setInput(e.target.value)} />
      <button className="mr-3" onClick={() => addProject()}>
        Add
      </button>
    </>
  );
}
