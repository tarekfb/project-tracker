import { useState } from 'react'
// import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { EditableField } from '../components/editableField'
import { EditableList } from '../components/editableList'

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [notes, setNotes] = useState(project.notes);
  const [tasks, setTasks] = useState(project.tasks);

  const [isEditing, setIsEditing] = useState({
    name: false,
    startDate: false,
    github: false,
    hostedAt: false,
    completion: false,
    tasks: false,
    notes: false
  });

  const [editVisibility, setEditVisibility] = useState({
    name: false,
    github: false,
    hostedAt: false,
    completion: false,
    notes: false,
  });

  // const router = useRouter();
  // const { id } = router.query;
  
  const toggleEditState = (property) => {
    // shallow copy to properly update state
    let newState = {
      ...isEditing
    };
    
    // if !null toc confirm prop exists
    if (isEditing[property] != null) {
      isEditing[property] ? newState[property] = false : newState[property] = true;
      setIsEditing(newState);
    }
  };

  const handleEditVisibility = (property, bool) => {
    // this means the property is currently being edited
    if (isEditing[property]) {
      return null;
    }

    let newState = {
      ...editVisibility
    };

    newState[property] = bool;

    setEditVisibility(newState);
  }

  // TODO: Make component for each field
  // Also pass edit, so the component can render edit/check
  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      
      <EditableField id="name" content={name}/>
      <EditableField id="hostedAt" content={hostedAt}/>
      <EditableField id="github" content={github}/>
      <EditableField id="completion" content={completion}/>
      <EditableField id="notes" content={notes}/>
      <EditableList content={tasks} setTasks={setTasks}/>
    </Layout>
  )
}