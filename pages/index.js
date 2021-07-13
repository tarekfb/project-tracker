import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { Projects } from '../components/projects'
import React, { useState, useEffect } from 'react'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  const [projects, setProjects] = useState([]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Projects projects={projects} setProjects={setProjects} />
    </Layout>
  )
}