import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { useProjectContextValue } from '../contexts/ProjectContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/FirebaseApp';

export function Navbar() {
  // const [ projects, handleProjects ] = useProjectContextValue();
  // const projectContextValue = useProjectContextValue();
  const { projects } = useProjectContextValue();
  // const [user, loading, error] = useAuthState(firebase.useAuthState());

  // const [projects, setProjects] = useState([]);

  // // This is a temporary solution
  // // This function has been done in other places. Primarily in projects.js.
  // // Currently no db, but local file system.
  // // When db, use db instead.
  // // Or context?

  // useEffect(() => {
  //   async function initProjects() {
  //     let req = await fetch('http://localhost:3000/projects.json');
  //     let data = await req.json();

  //     let projects = [];
  //     data.forEach(element => {
  //       let project = {};
  //       project.name = element;
  //       projects.push(project);
  //     });
  //     setProjects(projects);
  //   }

  //   initProjects();
  // }, []);

  return (
    <div className="flex justify-between space-x-4 items-center bg-prussianBlue text-white p-4 pr-12">
      <h1 className="text-4xl">
        <Link href="/">
          <a>Project tracker</a>
        </Link>
      </h1>
      <DropDownMenu projects={projects} />
      {/* <div>{user ? <span>logged in</span> : <span>logged out</span>}</div> */}
    </div>
  );
}
