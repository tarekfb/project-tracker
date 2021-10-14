import { useState, useRef, useEffect } from 'react';
import { findIndex } from '../util/util';
import { useRouter } from 'next/router';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useSavingContext } from '@/contexts/SavingContext';
import { useBlurContext } from '@/contexts/BlurContext';
import firebase from '@/firebase/FirebaseApp';
import { ProjectListItem } from '@/components/ProjectListItem';

const ref = firebase.firestore().collection('/users/wPecInICm1CsUbDg8lmQ/projects/');

export function Projects() {
  const [input, setInput] = useState('');
  const { projects, setProjectsWrapper } = useProjectContext();
  const { toggleIsSaving } = useSavingContext();
  const { toggleBlur } = useBlurContext();

  const inputRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleBlur(false);
    });
  }, []);

  const addProject = async () => {
    toggleIsSaving(true);
    toggleBlur(true);

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
  };

  const removeProject = async (name) => {
    let answer = confirm('Are you sure you want to delete project: ' + name + '?');
    if (answer) {
      const i = findIndex(projects, 'name', name);
      let newProjects = [...projects];
      if (i !== -1) {
        const project = newProjects[i];
        newProjects.splice(i, 1);

        toggleIsSaving(true);
        let promise = await setProjectsWrapper(newProjects, 'delete', project);
        toggleIsSaving(false);
      } else {
        console.log("Couldn't find project: ", name);
      }
    }
  };

  // add project on pressing enter
  const enterPressed = (event, i) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      inputRef.current.blur();
      // 13 is the enter keycode
      addProject();
    }
  };

  return (
    <>
      {projects ? (
        <ul>
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} removeProject={removeProject} />
          ))}
        </ul>
      ) : null}
      <input value={input} ref={inputRef} onInput={(e) => setInput(e.target.value)} onKeyPress={(e) => enterPressed(e)} />
      <button className="mx-3 hover:text-blue-300" onClick={() => addProject()}>
        Add
      </button>
    </>
  );
}
