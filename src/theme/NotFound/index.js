import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const SVGComponent = (props) => (
  <svg viewBox="0 0 500 500" className={styles.train} {...props}>
    <g stroke="currentColor" fill="none" strokeWidth={2}>
      <circle cx={226} cy={19} r={19} />
      <circle cx={275} cy={19} r={19} />
      <rect x={100} y={44} rx={65} ry={65} width={300} height={370} />
      <rect
        x={207}
        y={58}
        rx={11}
        ry={11}
        width={87}
        height={41}
        fill="currentColor"
      />
      <rect
        x={136}
        y={112}
        rx={34}
        ry={34}
        width={229}
        height={111}
        fill="currentColor"
      />
      <circle cx={166} cy={349} r={30} fill="currentColor" />
      <circle cx={334} cy={349} r={30} fill="currentColor" />
    </g>
    <polyline
      points="96,530 162,432 338,432 404,530"
      stroke="currentColor"
      strokeWidth={36}
      fill="none"
    />
  </svg>
);

function NumberBullet({ value, color, hoverColor }) {
  return (
    <span
      className={styles.lineBullet}
      style={{
        "--bullet-color": color,
        "--bullet-hover": hoverColor,
      }}
    >
      {value}
    </span>
  );
}

export default function NotFound() {
  return (
    <Layout title="404 - Page Not Found">
      <main className={styles.wrapper}>
        <div className={styles.trainWrapper}>
          <SVGComponent />
        </div>

        <div className={styles.content}>
          <div className={styles.lineBullets}>
            <NumberBullet value="4" color="#00933C" hoverColor="#1E4B95" />
            <NumberBullet value="0" color="#808183" hoverColor="#FFD500" />
            <NumberBullet value="4" color="#C04191" hoverColor="#FF8000" />
          </div>

          <h2>This page seems to have missed its stop.</h2>

          <p>
            The page you’re looking for doesn’t exist, was moved, or never
            arrived at this station.
          </p>

          <Link to="/" className={styles.back}>
            Return Home
          </Link>
        </div>
      </main>
    </Layout>
  );
}
