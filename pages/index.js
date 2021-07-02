import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { Projects, getProjectIds } from '../components/projects'
import React, { useState, useEffect } from 'react'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const [projects, setProjects] = useState([]);

  //  const getProjectsIds = async () => {
  //   let req = await fetch('http://localhost:3000/projects.json');
  //   let projects = await req.json();
  //   projects.map(project => {
  //     console.log(project);
  //   })
  //   return projects;
  // };

  // let projects = ['test'];

  // useEffect(() => {
  //   projects = getProjectIds();
  //   projects.map((project) => {
  //     console.log(project);
  //   })
  // }), [];

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects projects={projects} setProjects={setProjects} />
      <ul className={utilStyles.list}>
        {
          projects.length > 0 ?
          getArrayOfProjects.map((project, index) => (
              <li className={utilStyles.listItem} key={index}>
                <Link href={`/projects/${project}`}>
                  <a>{project}</a>
                </Link>
              </li>
            )) : null
        }
      </ul>
    </Layout>
  )
}