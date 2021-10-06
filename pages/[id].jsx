import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { EditableField } from '../components/EditableField';
import { EditableList } from '../components/EditableList';
import { useSavingContext } from '../components/contexts/SavingContext';
import { getAllProjectIds } from '../components/contexts/ProjectContext';
import { Notes } from '../components/Notes';

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
}

export async function getStaticProps({ params }) {
  let project = await ref.doc(params.id).get();
  let data = project.data();
  return {
    props: { project: data },
  };
}

export default function Project({ project }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [github, setGithub] = useState(project.github);
  const [hostedAt, setHostedAt] = useState(project.hostedAt);
  const [completion, setCompletion] = useState(project.completion);
  const [notes, setNotes] = useState(project.notes);
  const [tasks, setTasks] = useState(project.tasks);

  const [loadingFromDb, setLoadingFromDb] = useState(false);
  const { toggleIsSaving } = useSavingContext();

  const router = useRouter();

  const updateContent = async (contentID, content) => {
    toggleIsSaving(true);

    const { id } = router.query;

    let projectsRef = ref.doc(id);
    let collection = await projectsRef.get();
    let field = collection.get(contentID);

    if (collection.exists && field != null) {
      await projectsRef.update({ [contentID]: content });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    toggleIsSaving(false);
  };

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex flex-col justify-start space-y-5">
        {/* Meta information */}
        <span className="text-3xl">
          <EditableField placeholder="Example Project Name" id="name" content={name} setContent={updateContent} />
        </span>
        <div className="flex flex-row justify-start space-x-5">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row space-x-1 items-center">
              <CalendarToday />
              <span className="text-sm">{' ' + startDate}</span>
            </div>
            <div className="flex flex-row space-x-1">
              <span>Completion:</span>
              <EditableField placeholder="completed?" id="completion" content={completion} setContent={updateContent} />
            </div>
          </div>
          <div className="flex flex-col space-y-1 text-m">
            <span className="flex space-x-2">
              <GitHub />
              <EditableField
                placeholder="github"
                id="github"
                content={github}
                setContent={updateContent}
                className="m-8"
              />
            </span>
            <span className="flex space-x-2">
              <UrlLink />
              <EditableField
                placeholder="www.example.com"
                id="hostedAt"
                content={hostedAt}
                setContent={updateContent}
              />
            </span>
          </div>
        </div>
        <Divider />

        {/* Project content */}
        <div className="flex flex-col justify-start space-y-10 space-x-0 w-full sm:flex-row sm:space-y-0 sm:space-x-10">
          <div className="w-full">
            <Notes content={notes} setContent={updateContent} />
          </div>
          <div className="w-full">
            <EditableList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
