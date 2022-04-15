import Head from "next/head";
import React from "react";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { Layout, siteTitle } from "@/components/Layout";
import { Projects } from "@/components/Projects";
import { getProjects } from "@/firebase/DbQueries";

const ProjectsPage = ({ projects }) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <Projects projects={projects} />
  </Layout>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const data = await getProjects(AuthUser.id);
  return {
    props: {
      projects: data,
    },
  };
});

export default withAuthUser()(ProjectsPage);
