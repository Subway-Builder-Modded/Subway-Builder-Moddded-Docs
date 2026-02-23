import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function NotFound() {
  return (
    <Layout title="404 - Page Not Found">
      <main className={styles.wrapper}>

        {/* Background Train */}
        <div className={styles.trainWrapper}>
          <svg viewBox="0 0 500 500" className={styles.train}>
            <g stroke="currentColor" fill="none" strokeWidth="2">
              {/* wheels */}
              <circle cx="226" cy="19" r="19" />
              <circle cx="275" cy="19" r="19" />
              {/* body */}
              <rect x="100" y="44" rx="65" ry="65" width="300" height="370" />
              {/* windows */}
              <rect x="207" y="58" rx="11" ry="11" width="87" height="41" fill="currentColor" />
              <rect x="136" y="112" rx="34" ry="34" width="229" height="111" fill="currentColor" />
              <circle cx="166" cy="349" r="30" fill="currentColor" />
              <circle cx="334" cy="349" r="30" fill="currentColor" />
            </g>
            <polyline points="96,530 162,432 338,432 404,530" stroke="currentColor" strokeWidth="36" fill="none" />
          </svg>
        </div>

        <div className={styles.content}>

          <div className={styles.bullets}>
            {/* 4 */}
            <svg viewBox="0 0 125 125" className={`${styles.bullet} ${styles.first4}`}>
              <circle cx="62.5" cy="62.5" r="50" fill="#00933C" />
              <path d="M78.8,75.9v-8.3h-6.2V36.9H63L41,68.6v7.3h22.1v11.4h9.5V75.9H78.8zM63.4,47.9c-0.2-0.133-0.3,6.433-0.3,19.7h-12L63.4,47.9z" fill="#FFF" />
            </svg>

            {/* 0 */}
            <svg viewBox="0 0 125 125" className={`${styles.bullet} ${styles.zero}`}>
              <circle cx="62.5" cy="62.5" r="50" fill="#808183" />
              <path d="M70,86.6c-2.4,1.1-5,1.6-7.7,1.6c-8.7,0-13-5.2-14.7-7.9c-3.2-5-3.7-12-3.7-17.9c0-5.2,0.4-13.6,4.5-19.3c2.8-3.8,7.8-7.1,14.3-7.1c4.5,0,10.1,1.5,14,7.4C80.7,49.2,81,57,81,61.9C81,71,79.7,82.2,70,86.6zM62.8,44.3c-8.1,0-9,9.6-9,18.3c0,8.3,0.8,17.3,8.9,17.3c7.1,0,8.7-7,8.7-17.7C71.3,50.6,69.1,44.3,62.8,44.3z" fill="#FFF"/>
            </svg>

            {/* 4 */}
            <svg viewBox="0 0 125 125" className={`${styles.bullet} ${styles.second4}`}>
              <circle cx="62.5" cy="62.5" r="50" fill="#C04191" />
              <path d="M78.8,75.9v-8.3h-6.2V36.9H63L41,68.6v7.3h22.1v11.4h9.5V75.9H78.8zM63.4,47.9c-0.2-0.133-0.3,6.433-0.3,19.7h-12L63.4,47.9z" fill="#FFF" />
            </svg>
          </div>

          <h2>This page seems to have missed its stop.</h2>

          <p>
            The page you’re looking for doesn’t exist, was moved, or never arrived at this station.
          </p>

          <Link to="/" className={styles.button}>
            Return Home
          </Link>

        </div>
      </main>
    </Layout>
  );
}
