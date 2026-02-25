import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../../css/mapmanagerupdate.module.css";
import Link from "@docusaurus/Link";

const UPDATES = [
  {
    titleId: "updates.map-manager.v0-2-0.title",
    titleDefault: "Map Manager - v0.2.0",
    dateId: "updates.map-manager.v0-2-0.releaseDate",
    dateDefault: "February 18, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.0",
  },
  {
    titleId: "updates.map-manager.v0-2-1.title",
    titleDefault: "Map Manager - v0.2.1",
    dateId: "updates.map-manager.v0-2-1.releaseDate",
    dateDefault: "February 18, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.1",
  },
  {
    titleId: "updates.map-manager.v0-2-2.title",
    titleDefault: "Map Manager - v0.2.2",
    dateId: "updates.map-manager.v0-2-2.releaseDate",
    dateDefault: "February 18, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.2",
  },
  {
    titleId: "updates.map-manager.v0-2-3.title",
    titleDefault: "Map Manager - v0.2.3",
    dateId: "updates.map-manager.v0-2-3.releaseDate",
    dateDefault: "February 18, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.3",
  },
  {
    titleId: "updates.map-manager.v0-2-4.title",
    titleDefault: "Map Manager - v0.2.4",
    dateId: "updates.map-manager.v0-2-4.releaseDate",
    dateDefault: "February 19, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.4",
  },
  {
    titleId: "updates.map-manager.v0-2-5.title",
    titleDefault: "Map Manager - v0.2.5",
    dateId: "updates.map-manager.v0-2-5.releaseDate",
    dateDefault: "February 19, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.5",
  },
  {
    titleId: "updates.map-manager.v0-2-6.title",
    titleDefault: "Map Manager - v0.2.6",
    dateId: "updates.map-manager.v0-2-6.releaseDate",
    dateDefault: "February 20, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.6",
  },
  {
    titleId: "updates.map-manager.v0-2-7.title",
    titleDefault: "Map Manager - v0.2.7",
    dateId: "updates.map-manager.v0-2-7.releaseDate",
    dateDefault: "February 20, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.7",
  },
  {
    titleId: "updates.map-manager.v0-2-8.title",
    titleDefault: "Map Manager - v0.2.8",
    dateId: "updates.map-manager.v0-2-8.releaseDate",
    dateDefault: "February 20, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.2.8",
  },
  {
    titleId: "updates.map-manager.v0-3-1.title",
    titleDefault: "Map Manager - v0.3.1",
    dateId: "updates.map-manager.v0-3-1.releaseDate",
    dateDefault: "February 21, 2026",
    tag: "beta",
    link: "/updates/map-manager/v0.3.1",
  },
  {
    titleId: "updates.map-manager.v1-0-0.title",
    titleDefault: "Map Manager - v1.0.0",
    dateId: "updates.map-manager.v1-0-0.releaseDate",
    dateDefault: "February 21, 2026",
    tag: "release",
    link: "/updates/map-manager/v1.0.0",
  },
  {
    titleId: "updates.map-manager.v1-0-1.title",
    titleDefault: "Map Manager - v1.0.1",
    dateId: "updates.map-manager.v1-0-1.releaseDate",
    dateDefault: "February 21, 2026",
    tag: "release",
    link: "/updates/map-manager/v1.0.1",
  },
  {
    titleId: "updates.map-manager.v1-0-2.title",
    titleDefault: "Map Manager - v1.0.2",
    dateId: "updates.map-manager.v1-0-2.releaseDate",
    dateDefault: "February 21, 2026",
    tag: "release",
    link: "/updates/map-manager/v1.0.2",
  },
];

function Tag({ tag, isLatest }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {isLatest && (
        <span
          className={styles.tag}
          style={{
            backgroundColor: "#1335A1",
            color: "#fff !important",
          }}
        >
          LATEST
        </span>
      )}
      <span
        className={`${styles.tag} ${tag === "beta" ? styles.betaTag : styles.releaseTag}`}
      >
        {tag.toUpperCase()}
      </span>
    </div>
  );
}

export default function MapManagerHub() {
  const sortedUpdates = [...UPDATES].reverse();

  return (
    <Layout
      title={translate({ id: "updates.map-manager.pageTitle", message: "Map Manager Changelogs" })}
      description={translate({ id: "updates.map-manager.pageDescription", message: "Changelogs and release notes for the Subway Builder Map Manager." })}
    >
      <div className={styles.page}>

        <Link to="/updates" className={styles.floatingBack}>
          &larr; Back
        </Link>

        <div className={styles.container}>
          <div className={styles.headerCenter}>
            <h1 className={styles.pageTitle}>
              {translate({ id: "updates.map-manager.pageTitle", message: "Map Manager Changelogs" })}
            </h1>
            <p className={styles.pageSubtitle}>
              {translate({ id: "updates.map-manager.pageSubtitle", message: "Changelogs and release notes for the Subway Builder Map Manager." })}
            </p>
          </div>
        </div>

        <div className={styles.fullWidthWrapper}>
          {sortedUpdates.map((update, idx) => (
            <a key={idx} href={update.link} className={styles.updateBox}>
              <div className={styles.updateContent}>
                <div className={styles.updateHeader}>
                  <div className={styles.updateTitle}>
                    {translate({ id: update.titleId, message: update.titleDefault })}
                  </div>
                  <div className={styles.updateDate}>
                    {translate({ id: update.dateId, message: update.dateDefault })}
                  </div>
                </div>
              </div>
              <div className={styles.updateTag}>
                <Tag tag={update.tag} isLatest={idx === 0} />
              </div>
            </a>
          ))}
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
