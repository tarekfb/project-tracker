import Layout from '../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import utilStyles from '../../styles/utils.module.css'
import { findIndexInStringArray } from '../../util/util'
import { useState } from 'react'

export async function getStaticPaths() {
  let req = await fetch('http://localhost:3000/projects.json');
  let data = await req.json();

  const paths = data.map(project => {
    return { params: { id: project } }
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { project: data },
  }
}

function EditField(field) {

}


export default function Project({ project }) {
  const [name, setName] = useState(project.name);
  const [startDate, setStartDate] = useState(project.startDate);
  const [github, setGithub] = useState(project.github);
  const [hostedAt, setHostedAt] = useState(project.hostedAt);
  const [completion, setCompletion] = useState(project.completion);
  const [tasks, setTasks] = useState(project.tasks);
  const [notes, setNotes] = useState(project.notes);

  const [tasksInput, setTasksInput] = useState('');

  const router = useRouter();
  const { id } = router.query;

  const addTask = (task) => {
    // TODO: validate task
    setTasks(state => [...state, task]);
  }

  const removeTask = (task) => {
    const taskIndex = findIndexInStringArray(tasks, task);
    console.log(taskIndex);

    let state = [...tasks];

    if (taskIndex !== -1) {
      state.splice(taskIndex, 1);
      setTasks(state);
    }
  }

  return (
    <Layout>
      <Head>
        <title>{project.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{project.name}</h1>
      <div>{project.startDate}</div>
      <div>{project.github}</div>
      <div>{project.hostedAt}</div>
      <div>{project.completion}</div>
      <ul>
        {
          tasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))
        }
        <input value={tasksInput} onInput={e => setTasksInput(e.target.value)} />
        <button onClick={() => {
          addTask(tasksInput)
        }}>
          Add
        </button>
        <button onClick={() => {
          removeTask(tasksInput);
        }}>
          Remove
        </button>
      </ul>
      <div>{project.notes}</div>
    </Layout >
  )
}