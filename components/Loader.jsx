import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => (
  <Layout>
    <Head>
      <title>Project-tracker | Loading...</title>
    </Head>
    <ClipLoader size={100} />
    {/* TODO: style/position loader */}
  </Layout>
);

export default Loader;
