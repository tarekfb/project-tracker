import { useState } from 'react'
// import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Head from 'next/head'
import { EditableField } from '../components/editableField'
import { EditableList } from '../components/editableList'

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

export default function Project({ project }) {
  const [name, setName] = useState(project.name);
  const [startDate, setStartDate] = useState(project.startDate);
  const [github, setGithub] = useState(project.github);
  const [hostedAt, setHostedAt] = useState(project.hostedAt);
  const [completion, setCompletion] = useState(project.completion);
  const [notes, setNotes] = useState(project.notes);
  const [tasks, setTasks] = useState(project.tasks);

  // const router = useRouter();
  // const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="container grid place-content-center p-4 space-y-2">
        <span className="text-3xl">
          <EditableField id="name" content={name} setContent={setName} />
        </span>
        <span className="text-lg">{startDate}</span>
        <div>
          <EditableField id="hostedAt" content={hostedAt} setContent={setHostedAt} className="m-8" />
          <EditableField id="github" content={github} setContent={setGithub} className="text-purple-600" />
        </div>
        <EditableField id="completion" content={completion} setContent={setCompletion} />
        <EditableField id="notes" content={notes} setContent={setNotes} />
        <EditableList content={tasks} setContent={setTasks} />
      </div>
    </Layout>
  )
}