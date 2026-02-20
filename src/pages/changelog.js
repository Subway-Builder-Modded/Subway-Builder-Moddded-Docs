import React from 'react';
import Layout from '@theme/Layout';

export default function Changelog() {
  return (
    <Layout
      title="Changelog"
      description="Project changelog and release history"
    >
      <main style={{ padding: '2rem' }}>
        <h1>Changelog</h1>

        <h2>v1.0.0</h2>
        <ul>
          <li>Initial release</li>
        </ul>
      </main>
    </Layout>
  );
}
