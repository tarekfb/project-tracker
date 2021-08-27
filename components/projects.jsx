import React, { useState, useEffect } from 'react';
import { findIndex } from '../util/util';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { useProjectContext } from './contexts/ProjectContext';
import { useSavingContext } from './contexts/SavingContext';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';

const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects/');

export async function getAllProjectIds() {
  const collection = await ref.get();
  // get all
  const ids = [];
  collection.docs.map((doc) => {
    let idObj = {
      params: {
        id: doc.id,
      },
    };
    ids.push(idObj);
  });
  console.log(ids);
  return ids;
}

async function getAllProjects() {
  const collection = await ref.get();
  const projects = [];
  collection.docs.map((doc) => projects.push(doc.data()));
  return projects;
}

export function Projects() {
  const [input, setInput] = useState('');
  const { projects, handleProjects } = useProjectContext();
  const { toggleIsSaving } = useSavingContext();

  const log = async () => {
    // const collection = await projectsRef.get();

    // // get all
    // collection.docs.map((doc) => console.log(doc.data()));

    // // get first
    // console.log(collection.docs[0].data());

    // get specific
    const projectsRef = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
    let id = 'qlvfoYjqp0IYI9o30xOn';
    let specificProject = await projectsRef.doc(id).get();
    console.log('GET SPECIFIC');
    console.log(specificProject.data());

    // // get all
    // projectsRef.get().then((project) => {
    //   const projectsList = project.docs.map((doc) => doc.data());
    //   console.log(projectsList);
    // });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const addProjectToDb = async (obj) => {
    toggleIsSaving(true);
    const projectsRef = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
    await ref.add(obj);
    toggleIsSaving(false);
  };

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
            <Link
              href={`/${project.name}`}
              as={{ pathname: `/${project.name}`, query: { id: 'qlvfoYjqp0IYI9o30xOn' } }}>
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
      <button onClick={log}>log me</button>
    </div>
  );
}
