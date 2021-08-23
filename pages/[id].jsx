import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { EditableField } from '../components/EditableField';
import { EditableList } from '../components/EditableList';
import { Notes } from '../components/Notes';

import { GitHub, Link as UrlLink, CalendarToday } from '@material-ui/icons';
import { Divider } from '@material-ui/core';

export async function getStaticPaths() {
  let req = await fetch('http://localhost:3000/projects.json');
  let data = await req.json();

  const paths = data.map((project) => {
    return { params: { id: project } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { project: data },
  };
}

export default function Project({ project }) {
  const [name, setName] = useState(project.name);
  const [startDate, setStartDate] = useState(project.startDate);
  const [github, setGithub] = useState(project.github);
  const [hostedAt, setHostedAt] = useState(project.hostedAt);
  const [completion, setCompletion] = useState(project.completion);
  const [notes, setNotes] = useState(project.notes);
  const [tasks, setTasks] = useState(project.tasks);

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex flex-col justify-start space-y-5">
        {/* Meta information */}
        <span className="text-3xl">
          <EditableField placeholder="Example Project Name" id="name" />
        </span>
        <div className="flex flex-row justify-start space-x-5">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row space-x-1 items-center">
              <CalendarToday />
              <span className="text-sm">{' ' + startDate}</span>
            </div>
            <div className="flex flex-row space-x-1">
              <span>Completion:</span>
              <EditableField placeholder="completed?" id="completion" />
            </div>
          </div>
          <div className="flex flex-col space-y-1 text-m">
            <span className="flex space-x-2">
              <GitHub />
              <EditableField placeholder="github" id="github" className="m-8" />
            </span>
            <span className="flex space-x-2">
              <UrlLink />
              <EditableField placeholder="www.example.com" id="hostedAt" />
            </span>
          </div>
        </div>
        <Divider />

        {/* Project content */}
        <div className="flex flex-col justify-start space-y-10 space-x-0 w-full sm:flex-row sm:space-y-0 sm:space-x-10">
          <Notes className="w-6/12" />
          <EditableList className="w-6/12" />
          {/*   */}
        </div>
      </div>
    </Layout>
  );
}
