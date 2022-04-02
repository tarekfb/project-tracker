import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useSavingContext } from '@/contexts/SavingContext';
import { useBlurContext } from '@/contexts/BlurContext';
import { ProjectListItem } from '@/components/ProjectListItem';
import { addProject, removeProject } from '@/firebase/DbQueries';
import { findIndex } from '@/util/util';
import { PrimaryButton } from '@/components/PrimaryButton';

export function Projects({ projects }) {
  const [projectsState, setProjectsState] = useState(projects);
  const [input, setInput] = useState('');
  const { toggleIsSaving } = useSavingContext();
  const { toggleBlur } = useBlurContext();
  const router = useRouter();
  const authUser = useAuthUser();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleBlur(false);
    });
  }, []);

  const addProjectWrapper = async (e) => {
    e.preventDefault();
    toggleIsSaving(true);
    toggleBlur(true); // the toggleBlur(false) happens at routeChangeComplete listener

    // create project obj
    let newProject = {};
    newProject.name = input;
    let date = new Date();
    const dateArray = [date.getDay(), date.getMonth(), date.getFullYear()];
    date = dateArray.join('/');
    newProject.startDate = date.toString();

    // send to db
    newProject = await addProject(authUser.id, newProject);

    // add to state
    const projectsList = [...projectsState];
    projectsList.push(newProject);
    setProjectsState(projectsList);

    setInput('');

    // open new proj
    router.push('/' + newProject.id);
    toggleIsSaving(false);
  };

  const removeProjectWrapper = async (project) => {
    const answer = confirm('Are you sure you want to delete project: ' + project.name + '?');
    if (answer) {
      toggleIsSaving(true);

      await removeProject(authUser.id, project.id);

      // remove from state
      const projectsList = [...projectsState];
      const i = findIndex(projectsState, 'name', project.name);
      projectsList.splice(i, 1);
      setProjectsState(projectsList);

      toggleIsSaving(false);
    }
  };

  return (
    <>
      {projectsState.length > 0 ? (
        <ul className="flex flex-row space-x-4 space-y-4 flex-wrap">
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
      <form className="flex space-x-2 mt-4" onSubmit={addProjectWrapper}>
        <input value={input} onInput={(e) => setInput(e.target.value)} className="border-b border-highlight" />
        <PrimaryButton onClick={addProjectWrapper} content="Add" />
      </form>
    </>
  );
}
