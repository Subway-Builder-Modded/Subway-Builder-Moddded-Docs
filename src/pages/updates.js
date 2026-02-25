import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../css/updates.module.css";

// Subway bullet colors
const SUBWAY_BULLETS = {
  A: "#0039A6",
  B: "#FF6319",
  C: "#6CBE45",
  D: "#FCCC0A",
  E: "#752F82",
  F: "#FF6319",
  G: "#6CBE45",
};

const UPDATES = [
  {
    title: "Map Manager v2.3.1",
    description: "Added new map import/export functionality and fixed minor bugs.",
    image: "/images/updates/map-manager-placeholder.png",
    bullet: "A",
    link: "/wiki/updates/map-manager-v2-3-1",
  },
  {
    title: "Mod Template v1.5",
    description: "Updated TypeScript template with new modding hooks and UI improvements.",
    image: "/images/updates/mod-template-placeholder.png",
    bullet: "B",
    link: "/wiki/updates/mod-template-v1-5",
  },
];

function Badge({ letter }) {
  return (
    <span
      className={styles.badge}
      style={{ backgroundColor: SUBWAY_BULLETS[letter] || "#000" }}
    >
      {letter}
    </span>
  );
}

function UpdateCard({ update }) {
  return (
    <a href={update.link} className={styles.card}>
      <div className={styles.cardHeader}>
        <Badge letter={update.bullet} />
        <h3 className={styles.cardTitle}>{update.title}</h3>
      </div>
      <div className={styles.cardImg}>
        <img src={update.image} alt={update.title} loading="lazy" />
      </div>
      <p className={styles.cardDesc}>{update.description}</p>
    </a>
  );
}

export default function Updates() {
  return (
    <Layout
      title={translate({ id: "updates.pageTitle", message: "Updates & Changelogs" })}
      description={translate({
        id: "updates.pageDescription",
        message: "Stay up to date with the latest tools and updates in Subway Builder Modded.",
      })}
    >
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerCenter}>
            <h1 className={styles.pageTitle}>
              {translate({ id: "updates.pageTitle", message: "Updates & Changelogs" })}
            </h1>
            <p className={styles.pageSubtitle}>
              {translate({
                id: "updates.pageSubtitle",
                message: "All major Subway Builder Modded tools in one place.",
              })}
            </p>
          </div>

          <div className={styles.grid}>
            {UPDATES.map((update, index) => (
              <UpdateCard key={index} update={update} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
