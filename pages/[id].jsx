import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import { EditableField } from '../components/EditableField';
import { EditableList } from '../components/EditableList';
import { useSavingContext } from '../components/contexts/SavingContext';
import { Notes } from '../components/Notes';
import { getAllProjectIds } from '../components/Projects';

import { GitHub, Link as UrlLink, CalendarToday } from '@material-ui/icons';
import { Divider } from '@material-ui/core';

import firebase from '../firebase/FirebaseApp';
import 'firebase/firestore';

const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');

export async function getStaticPaths() {
  const paths = await getAllProjectIds();
  return {
    paths,
    fallback: false,
  };

  // let req = await fetch('http://localhost:3000/projects.json');
  // let data = await req.json();

  // const paths = data.map((project) => {
  //   return { params: { id: project } };
  // });

  // return {
  //   paths,
  //   fallback: false,
  // };
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { project: data },
  };
}

// const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');

export default function Project({ project }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const { toggleIsSaving } = useSavingContext();

  // const { toggleIsSaving } = useSavingContext();

  const router = useRouter();

  const { id } = router.query;

  // const [github, setGithub] = useState(project.github);
  // const [hostedAt, setHostedAt] = useState(project.hostedAt);
  // const [completion, setCompletion] = useState(project.completion);
  // const [notes, setNotes] = useState(project.notes);
  // const [tasks, setTasks] = useState(project.tasks);

  const getProject = async () => {
    // const ref = firebase.firestore().collection('/users/olQnZcn5BJ4Oy7dagx4k/projects');
    // setLoadingFromDb(true);
    // const project = await ref.doc(id).get().data();
    // name = project.name;
    // startDate = project.startDate;
    // setLoadingFromDb(false);

    // let id = 'qlvfoYjqp0IYI9o30xOn';
    console.log(id);
    let project = await ref.doc(id).get();
    console.log('GET SPECIFIC');
    console.log(project.data());

    console.log('router ', router);
    console.log('routerquery ', router.query);
    console.log('queryid ', router.query.id);
  };

  useEffect(() => {
    getProject();
  }),
    [];

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
          <div className="w-full">
            <Notes />
          </div>
          <div className="w-full">
            <EditableList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
