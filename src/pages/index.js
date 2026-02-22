import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from '../css/index.module.css';

export default function Home() {
  return (
    <Layout
      title={translate({ id: 'homepage.title', message: 'Home' })}
      description={translate({ id: 'homepage.description', message: 'Subway Builder Mods, Maps, and Installation Guides' })}
    >
      <main className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <Translate id="homepage.heading">Subway Builder Modded Wiki</Translate>
          </h1>

          <p className={styles.subtitle}>
            <Translate id="homepage.subtitle">
              The complete hub for Subway Builder maps, mods, and guides.
              Discover custom maps, expand your game with community-made content,
              and learn exactly how to install everything step-by-step.
            </Translate>
          </p>

          <div className={styles.buttons}>
            <Link
              className={`${styles.button} ${styles.primary}`}
              to="/wiki/maps/map-directory"
            >
              <Translate id="homepage.button.maps">Browse Maps</Translate>
            </Link>

            <Link
              className={`${styles.button} ${styles.primary}`}
              to="/wiki/guides/map-installation-guide"
            >
              <Translate id="homepage.button.installation">Installation Guide</Translate>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
