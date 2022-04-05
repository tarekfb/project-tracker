import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthUser, AuthAction, withAuthUserTokenSSR, useAuthUser } from 'next-firebase-auth';
import { MdLink, MdCalendarToday } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';
import { Divider } from '@mui/material';
import { getProject, updateContent } from '@/firebase/DbQueries';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { EditableField } from '@/components/EditableField';
import { EditableList } from '@/components/EditableList';
import { useSavingContext } from '@/components/contexts/SavingContext';
import { Notes } from '@/components/Notes';

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, params }) => {
  const data = await getProject(AuthUser.id, params.id);
  return {
    props: {
      project: data,
    },
  };
});

const Project = ({ project }) => {
  const { toggleIsSaving } = useSavingContext();
  const router = useRouter();

  const authUser = useAuthUser();

  const updateContentWrapper = async (contentId, content) => {
    // If both the property (contentId) and the new content (content) are null
    // no need to change anything
    // In this case attempting to set an empty field to empty --> cancle

    // if not both of these are null, update in db
    if (!(!project[contentId] && !content)) {
      toggleIsSaving(true);

      const projectId = router.query.id;
      project[contentId] = content;
      await updateContent(authUser.id, projectId, project);

      toggleIsSaving(false);
    }
  };

  if (router.isFallback) {
    return (
      <Layout>
        <Head>
          <title>Project tracker | Loading...</title>
        </Head>
        <Loader />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Head>
          <title>Project tracker | {project.name}</title>
        </Head>
        <div className="flex flex-col justify-start space-y-5">
          <span className="text-3xl">
            <EditableField placeholder="Example Project Name" id="name" content={project.name} setContent={updateContentWrapper} />
          </span>
          <div className="flex flex-row justify-start space-x-5">
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row space-x-1 items-center">
                <MdCalendarToday size={20} />
                <EditableField placeholder="01/01/1970" id="startDate" content={project.startDate} setContent={updateContentWrapper} />
              </div>
              <div className="flex flex-row space-x-1">
                <span>Completion:</span>
                <EditableField placeholder="completed?" id="completion" content={project.completion} setContent={updateContentWrapper} />
              </div>
            </div>
            <div className="flex flex-col space-y-1 text-m">
              <span className="flex space-x-2 items-center">
                <AiFillGithub size={20} />
                <EditableField placeholder="github" id="github" content={project.github} setContent={updateContentWrapper} className="m-8" />
              </span>
              <span className="flex space-x-2 items-center">
                <MdLink size={20} />
                <EditableField placeholder="www.example.com" id="hostedAt" content={project.hostedAt} setContent={updateContentWrapper} />
              </span>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col justify-start space-y-10 space-x-0 w-full sm:flex-row sm:space-y-0 sm:space-x-10">
            <div className="w-full">
              <Notes content={project.notes} setContent={updateContentWrapper} />
            </div>
            <div className="w-full">
              <EditableList content={project.tasks} setContent={updateContentWrapper} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Project);
