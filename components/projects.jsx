import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useSavingContext } from '@/contexts/SavingContext';
import { useBlurContext } from '@/contexts/BlurContext';
import { ProjectListItem } from '@/components/ProjectListItem';
import { addProject, removeProject } from '@/firebase/DbQueries';
import { findIndex } from '@/util/util';

export function ProjectsAlt({ projects }) {
  const [projectsState, setProjectsState] = useState(projects);
  const [input, setInput] = useState('');
  const { toggleIsSaving } = useSavingContext();
  const { toggleBlur } = useBlurContext();
  const inputRef = useRef(null);
  const router = useRouter();
  const authUser = useAuthUser();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleBlur(false);
    });
  }, []);

  const addProjectWrapper = async () => {
    toggleIsSaving(true);
    toggleBlur(true); // the toggleBlur(false) happens at routeChangeComplete listener

    // create project obj
    let newProject = {};
    newProject.name = input;
    newProject.startDate = new Date().toLocaleString('en-GB');

    // send to db
    newProject = await addProject(authUser.id, newProject);

    // add to state
    let projectsList = [...projectsState];
    projectsList.push(newProject);
    setProjectsState(projectsList);

    setInput('');

    // open new proj
    router.push('/' + newProject.id);
    toggleIsSaving(false);
  };

  const removeProjectWrapper = async (project) => {
    let answer = confirm('Are you sure you want to delete project: ' + project.name + '?');
    if (answer) {
      toggleIsSaving(true);

      await removeProject(authUser.id, project.id);

      // remove from state
      let projectsList = [...projectsState];
      const i = findIndex(projectsState, 'name', project.name);
      projectsList.splice(i, 1);
      setProjectsState(projectsList);

      toggleIsSaving(false);
    }
  };

  // add project on pressing enter
  const enterPressed = (event, i) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      inputRef.current.blur();
      // 13 is the enter keycode
      addProjectWrapper();
    }
  };

  return (
    <>
      {projectsState.length > 0 ? (
        <ul>
          {projectsState.map((project) => (
            <ProjectListItem
              key={project.id}
              project={project}
              removeProject={() => {
                removeProjectWrapper(project);
              }}
            />
          ))}
        </ul>
      ) : null}
      <input value={input} ref={inputRef} onInput={(e) => setInput(e.target.value)} onKeyPress={(e) => enterPressed(e)} />
      <button className="mx-3 hover:text-blue-300" onClick={addProjectWrapper}>
        Add
      </button>
    </>
  );
}
