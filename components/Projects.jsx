import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useSavingContext } from "@/contexts/SavingContext";
import { useBlurContext } from "@/contexts/BlurContext";
import { ProjectCard } from "@/components/ProjectCard";
import { addProject, getProjects, removeProject } from "@/firebase/DbQueries";
import { findIndex } from "@/util/util";
import { PrimaryButton } from "@/components/PrimaryButton";
import { MdRefresh } from "react-icons/md";

const sortProjects = (projects) => {
  const sortedProjects = [...projects];
  sortedProjects.sort((a, b) => {
    if (
      (a.isFavourite && b.isFavourite) ||
      (!a.isFavourite && !b.isFavourite)
    ) {
      return 0;
    } else if (a.isFavourite && !b.isFavourite) {
      return -1;
    } else if (!a.isFavourite && b.isFavourite) {
      return 1;
    }
  });
  return sortedProjects;
};

export const Projects = ({ projects }) => {
  const [projectsState, setProjectsState] = useState(sortProjects(projects));
  const [input, setInput] = useState("");
  const { toggleIsSaving } = useSavingContext();
  const { toggleBlur } = useBlurContext();
  const router = useRouter();
  const AuthUser = useAuthUser();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
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
    date = dateArray.join("/");
    newProject.startDate = date.toString();

    // send to db
    newProject = await addProject(AuthUser.id, newProject);

    // add to state
    const projectsList = projectsState;
    projectsList.push(newProject);
    const sortedProjects = sortProjects(projectsList); // new reference. copies array with spread
    setProjectsState(sortedProjects);

    setInput("");

    router.push("/" + newProject.id);
    toggleIsSaving(false);
  };

  const removeProjectWrapper = async (project) => {
    const answer = confirm(
      "Are you sure you want to delete project: " + project.name + "?"
    );
    if (answer) {
      toggleIsSaving(true);

      await removeProject(AuthUser.id, project.id);

      // remove from state
      const projectsList = [...projectsState];
      const i = findIndex(projectsState, "name", project.name);
      projectsList.splice(i, 1);
      setProjectsState(projectsList);

      toggleIsSaving(false);
    }
  };

  const refresh = async () => {
    toggleIsSaving(true);
    const updatedProjects = await getProjects(AuthUser.id);
    const sortedProjects = sortProjects(updatedProjects);
    setProjectsState(sortedProjects);
    toggleIsSaving(false);
  };

  return (
    <>
      <button onClick={refresh} className="absolute top-5 right-5">
        <MdRefresh size={50} />
      </button>
      {projectsState.length > 0 && (
        <ul className="flex flex-row flex-wrap">
          {projectsState.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              removeProject={() => {
                removeProjectWrapper(project);
              }}
            />
          ))}
        </ul>
      )}
      <form className="flex space-x-2 mt-4" onSubmit={addProjectWrapper}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-b border-highlight px-2"
          placeholder="My new project"
        />
        <PrimaryButton onClick={addProjectWrapper} content="Add" />
      </form>
    </>
  );
};
