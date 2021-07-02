import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { findIndexInStringArray } from '../../util/util'

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

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

  const [edit, setEdit] = useState({
    name: false,
    startDate: false,
    github: false,
    url: false,
    hostedAt: false,
    completion: false,
    tasks: false,
    notes: false
  });

  const [tasksInput, setTasksInput] = useState('');

  const router = useRouter();
  const { id } = router.query;



  const addTask = (task) => {
    // TODO: validate task
    setTasks(state => [...state, task]);
  }

  const removeTask = (task) => {
    const taskIndex = findIndexInStringArray(tasks, task);

    let state = [...tasks];

    if (taskIndex !== -1) {
      state.splice(taskIndex, 1);
      setTasks(state);
    }
  }

  const toggleEditState = (property) => {
    // if null toc confirm prop exists
    if (edit[property] == null) {
      return null;
    } else {
      if (edit[property] === true) {
        console.log(edit[property]);
        edit[property] = false;
      } else {
        console.log(edit[property]);
        edit[property] = true;
      }
    }
  };


  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{name}</h1>
      <div>{startDate}
        <button onClick={() => {
          toggleEditState('startDate')
        }}>{edit.startDate == true ? <EditIcon /> : <CheckIcon />}</button>      </div>
      <div>
        {github}
        <button onClick={() => {
          toggleEditState('github')
        }}><EditIcon /></button>
      </div>
      <div>
        {hostedAt}
        <button onClick={() => {
          toggleEditState('hostedAt')
        }}>toggle</button>      </div>
      <div>
        {completion}
        <button onClick={() => {
          toggleEditState('completion')
        }}>toggle</button>      </div>
      <ul>
        {
          tasks.map((task, i) => (
            <li key={i}>
              <span>{task}</span>
            </li>
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
      <div>{notes}</div>
    </Layout>
  )
}