import Head from "next/head";
import React from "react";
import Layout, { siteTitle } from "../components/layout";
import { Projects } from "../components/projects";

export default function Home() {
  // const [projects, setProjects] = useState([]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects />
    </Layout>
  );
}
