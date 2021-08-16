// import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { EditableField } from '../components/editableField'
import { EditableList } from '../components/editableList'

import TextareaAutosize from 'react-textarea-autosize';

import { GitHub, Link as UrlLink, CalendarToday } from '@material-ui/icons'

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
      <div className="container flex flex-col justify-start space-y-5">

        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-1">
            <span className="text-3xl">
              <EditableField id="name" content={name} setContent={setName} />
            </span>
            <div className="flex flex-row space-x-1 items-center">
              <CalendarToday /><span className="text-sm">{" " + startDate}</span>
            </div>
            <div className="flex flex-row space-x-1">
              Completion:<EditableField id="completion" content={completion} setContent={setCompletion} />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="flex space-x-2"><GitHub /><EditableField id="hostedAt" content={hostedAt} setContent={setHostedAt} className="m-8" /></span>
            <span className="flex space-x-2"><UrlLink /><EditableField id="github" content={github} setContent={setGithub} className="text-purple-600"/></span>
          </div>
        </div>

        <div className="flex flex-row justify-start space-x-10 w-full">
          <TextareaAutosize
            className="w-6/12"
            maxRows={15}
            minRows={3}
            placeholder="Write some notes pls"
            value={notes}
            onChange={ev => setNotes(ev.target.value)} />
          <EditableList className="w-6/12" content={tasks} setContent={setTasks} />
        </div>

      </div>
    </Layout>
  )
}