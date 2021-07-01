import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { Projects } from '../components/projects';
import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css'





export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Projects />
      </div>
    </Layout>
  )
}