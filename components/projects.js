import React, { useState, useEffect } from 'react';
import { findIndex } from '../util/util'
import utilStyles from '../styles/utils.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link'

// export function getProjectIds() {
//     return projectsList;
// };

// export async function getProjectData(id) {
//     let req = await fetch('http://localhost:3000/projects.json');
//     let data = await req.json();

//     const paths = data.map(project => {
//         return { params: { id: project } }
//     });

//     return {
//         id,
//         projectData,
//     }
// }

// let projectData = {};
// let projectsList = [];

export function Projects({ projects, setProjects }) {
    // const [projects, setProjects] = useState([]);
    const [input, setInput] = useState('');
    // const [data, setData] = useState({
    //     github: 'gh',
    //     hostedAt: 'ha',
    //     completion: 'c',
    //     notes: 'a',
    //     tasks: {
    //         task1: 'do this',
    //         task2: 'do that',
    //     }
    // });

    // useEffect(() => {
    //     projectsList = projects;
    //     projectData = data;
    // }), projects;

    const addProject = (input) => {
        let newProject = {};
        newProject.name = input;
        newProject.startDate = new Date().toLocaleString('en-GB');
        setProjects(state => [...state, newProject]);
    }

    const removeProject = (name) => {
        let answer = confirm("Are yoú sure you want to delete project: " + name + "?")
        if (answer) {
            const projectIndex = findIndex(projects, 'name', name);
            let newState = [...projects];
            if (projectIndex !== -1) {
                newState.splice(projectIndex, 1);
                setProjects(newState);
            }
        }
    }

    return (
        <div>
            <ul>
                {
                    projects.map((project, index) => (
                        <li key={index} className={utilStyles.listItem}>
                            <Link href={`/${project.name}`}>
                                <a>{project.name}</a>
                            </Link>
                            <button onClick={() => {
                                removeProject(project.name);
                            }}>
                                <DeleteIcon />
                            </button>
                        </li>
                    ))
                }
            </ul>
            <input value={input} onInput={e => setInput(e.target.value)} />
            <button onClick={() => {
                addProject(input)
            }}>
                Add
            </button>
        </div>
    )
}