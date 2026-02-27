import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../css/updates.module.css";

const SUBWAY_BULLETS = {
  M: "#93683A",
  T: "#4EACCD",
};

const UPDATES = [
  {
    titleId: "updates.mapManager.title",
    titleDefault: "Map Manager",
    descId: "updates.mapManager.desc",
    descDefault:
      "Map management tool for Subway Builder that allows you to import custom maps into the game",
    creator: "Kronifer",
    image: "/images/updates-map-manager.png",
    bullet: "M",
    link: "/updates/map-manager",
  },
  {
    titleId: "updates.templateMod.title",
    titleDefault: "Template Mod",
    descId: "updates.templateMod.desc",
    descDefault:
      "Documented TypeScript template to create your own mods for Subway Builder",
    creator: "IMB11 & ahkimn",
    image: "/images/updates-template-mod.png",
    bullet: "T",
    link: "/updates/template-mod",
  },
];

function LineBullet({ letter }) {
  return (
    <span
      className={styles.lineBullet}
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
        <LineBullet letter={update.bullet} />
        <h3 className={styles.cardTitle}>
          {translate({ id: update.titleId, message: update.titleDefault })}
        </h3>
        <p className={styles.cardSubtitle}>
          {update.creator}
        </p>
      </div>
      <div className={styles.cardImg}>
        <img
          src={update.image}
          alt={translate({ id: update.titleId, message: update.titleDefault })}
          loading="lazy"
        />
      </div>
      <p className={styles.cardDesc}>
        {translate({ id: update.descId, message: update.descDefault })}
      </p>
    </a>
  );
}

export default function Updates() {
  return (
    <Layout
      title={translate({ id: "updates.pageTitle", message: "Updates & Changelogs" })}
      description={translate({
        id: "updates.pageDescription",
        message:
          "Stay up to date with the latest tools and updates in Subway Builder Modded.",
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
          <div className={styles.cardGrid}>
            {UPDATES.map((update, index) => (
              <UpdateCard key={index} update={update} />
            ))}
          </div>
        </div>
        <footer className={styles.footerBars}>
          <span className={styles.bar} style={{ background: "#0039A6" }} />
          <span className={styles.bar} style={{ background: "#FF6319" }} />
          <span className={styles.bar} style={{ background: "#00933C" }} />
          <span className={styles.bar} style={{ background: "#FCCC0A" }} />
          <span className={styles.bar} style={{ background: "#752F82" }} />
        </footer>
      </div>
    </Layout>
  );
}
