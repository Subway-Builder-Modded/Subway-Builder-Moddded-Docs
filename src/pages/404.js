import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <main style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>😕 Page Not Found</h1>
        <p>
          Oops! The page you are looking for does not exist.
        </p>
        <p>
          Go back to <Link to="/">Home</Link> or check out the Documentation.
        </p>
      </main>
    </Layout>
  );
}
