import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from 'components/Layout';
import { ProjectsAlt } from '@/components/ProjectsAlt';
import { withAuthUser, AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth';
import { server } from '@/config/server';

const ProjectsPage = ({ projects }) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <ProjectsAlt projects={projects} />
  </Layout>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // Optionally, get other props.
  const id = AuthUser.id;
  const response = await fetch(`${server}/api/get-projects`, {
    method: 'GET',
    headers: {
      Authorization: id,
      'User-Agent': 'ANYTHING_WILL_WORK_HERE',
    },
  }); // TODO: change to use getidtoken instaed of id
  const data = await response.json();
  console.log(data);
  data.map((project) => {
    console.log(JSON.stringify(project));
  });
  return {
    props: {
      projects: data,
    },
  };
});

export default withAuthUser()(ProjectsPage);
