import React, { useState, useEffect } from "react";
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
    imageLight: "/images/updates-map-manager-light.png",
    imageDark: "/images/updates-map-manager-dark.png",
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
    imageLight: "/images/updates-template-mod-light.png",
    imageDark: "/images/updates-template-mod-dark.png",
    bullet: "T",
    link: "/updates/template-mod",
  },
];

function LineBullet({ letter }) {
  return (
    <span
      className={styles.lineBullet}
      style={{ backgroundColor: SUBWAY_BULLETS[letter] || "#000000" }}
    >
      {letter}
    </span>
  );
}

function UpdateCard({ update }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const imageSrc = isDark ? update.imageDark : update.imageLight;

  return (
    <a href={update.link} className={styles.card}>
      <div className={styles.cardHeader}>
        <LineBullet letter={update.bullet} />
        <h3 className={styles.cardTitle}>
          {translate({ id: update.titleId, message: update.titleDefault })}
        </h3>
        <p className={styles.cardSubtitle}>{update.creator}</p>
      </div>

      <div className={styles.cardImg}>
        <img
          src={imageSrc}
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
      title={translate({
        id: "updates.pageTitle",
        message: "Updates & Changelogs",
      })}
      description={translate({
        id: "updates.pageDescription",
        message:
          "Stay up to date with the latest tools and updates from Subway Builder Modded.",
      })}
    >
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerCenter}>
            <h1 className={styles.pageTitle}>
              {translate({
                id: "updates.pageTitle",
                message: "Updates & Changelogs",
              })}
            </h1>

            <p className={styles.pageSubtitle}>
              {translate({
                id: "updates.pageSubtitle",
                message: "All of the Subway Builder Modded tools in one place.",
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
