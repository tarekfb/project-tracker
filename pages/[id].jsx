import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { EditableField } from '@/components/EditableField';
import { EditableList } from '@/components/EditableList';
import { useSavingContext } from '@/components/contexts/SavingContext';
import { getAllProjectIds, getProject } from '@/components/contexts/ProjectContext';
import { useBlurContext } from '@/components/contexts/BlurContext';
import { Notes } from '@/components/Notes';
import { GitHub, Link as UrlLink, CalendarToday } from '@mui/icons-material';
import { Divider } from '@mui/material';

/**
 * Gets all paths, based on project ids.
 * @returns Possible paths, and fallback value.
 */
// export async function getStaticPaths() {
//   const paths = await getAllProjectIds();
//   console.log('PATHS ARE');
//   console.log(paths);
//   return {
//     paths,
//     fallback: true,
//   };
// }

// /**
//  * fetches the project data, using a project id
//  * @param {*} params Route parameters.
//  * @returns Project data as JSON.
//  */
// export async function getStaticProps({ params }) {
//   let project = await getProject(params.id);
//   let data = project.data();
//   console.log(data);
//   if (data) {
//     return {
//       props: { project: data },
//     };
//   }
//   return null; // should never happen, because in this case the projectcontext found this id in db
//   // meaning this query will also find proejct in db
// }

export async function getServerSideProps(context) {
  let project = await getProject(context.params.id);
  let data = project?.data();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project: data },
  };
}

export default function Project({ project }) {
  const { toggleIsSaving } = useSavingContext();
  const router = useRouter();
  const { toggleBlur } = useBlurContext();

  // updates content in db
  const updateContent = async (contentID, content) => {
    toggleIsSaving(true);

    // const { id } = router.query;

    // let projectsRef = ref.doc(id);
    // let collection = await projectsRef.get();

    // if (collection.exists) {
    //   if (content) await projectsRef.update({ [contentID]: content });
    //   else console.log('content null');
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!');
    // }

    // TODO: Rewrite updateContent to use ProjectContext

    toggleIsSaving(false);
  };

  if (router.isFallback) {
    // toggleBlur(true);
    /*
    react-dom.development.js:67 Warning: Cannot update a component (`BlurContextProvider`) while rendering a different component (`Project`).
    To locate the bad setState() call inside `Project`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    */

    return (
      <Layout>
        <Head>
          <title>Project tracker | Loading...</title>
        </Head>
        <div>Loading...</div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Head>
          <title>Project tracker | {project.name}</title>
        </Head>
        <div className="flex flex-col justify-start space-y-5">
          {/* Meta information */}
          <span className="text-3xl">
            <EditableField placeholder="Example Project Name" id="name" content={project.name} setContent={updateContent} />
          </span>
          <div className="flex flex-row justify-start space-x-5">
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row space-x-1 items-center">
                <CalendarToday />
                <span className="text-sm">{' ' + project.startDate}</span>
              </div>
              <div className="flex flex-row space-x-1">
                <span>Completion:</span>
                <EditableField placeholder="completed?" id="completion" content={project.completion} setContent={updateContent} />
              </div>
            </div>
            <div className="flex flex-col space-y-1 text-m">
              <span className="flex space-x-2">
                <GitHub />
                <EditableField placeholder="github" id="github" content={project.github} setContent={updateContent} className="m-8" />
              </span>
              <span className="flex space-x-2">
                <UrlLink />
                <EditableField placeholder="www.example.com" id="hostedAt" content={project.hostedAt} setContent={updateContent} />
              </span>
            </div>
          </div>

          <Divider />

          {/* Project content */}
          <div className="flex flex-col justify-start space-y-10 space-x-0 w-full sm:flex-row sm:space-y-0 sm:space-x-10">
            <div className="w-full">
              <Notes content={project.notes} setContent={updateContent} />
            </div>
            <div className="w-full">
              <EditableList content={project.tasks} setContent={updateContent} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
