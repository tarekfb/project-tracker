import React, { useState, useEffect } from 'react';
import { findIndex } from '../util/util'
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link'

export function Projects() {
    const [input, setInput] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function initProjects() {
            let req = await fetch('http://localhost:3000/projects.json');
            let data = await req.json();

            let projects = [];
            data.forEach(element => {
                let project = {};
                project.name = element;
                project.startDate = new Date().toLocaleString('en-GB');
                projects.push(project);
            });
            setProjects(projects);
        }

        initProjects();
    }, []);

    const addProject = (input) => {
        let newProject = {};
        newProject.name = input;
        newProject.startDate = new Date().toLocaleString('en-GB');
        setProjects(state => [...state, newProject]);
    }

    const removeProject = (name) => {
        let answer = confirm("Are you sure you want to delete project: " + name + "?")
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
                        <li key={index}>
                            <Link href={`/${project.name}`}>
                                <a>{project.name}</a>
                            </Link>
                            <button onClick={() => {
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