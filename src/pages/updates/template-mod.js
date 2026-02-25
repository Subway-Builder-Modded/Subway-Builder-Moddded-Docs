import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../../css/templatemodupdate.module.css";
import Link from "@docusaurus/Link";

const UPDATES = [
  {
    titleId: "updates.template-mod.v1-0-0.title",
    titleDefault: "Template Mod - v1.0.0",
    dateId: "updates.template-mod.v1-0-0.releaseDate",
    dateDefault: "February 23, 2026",
    tag: "release",
    link: "/updates/template-mod/v1.0.0",
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

export default function TemplateModHub() {
  const sortedUpdates = [...UPDATES].reverse();

  return (
    <Layout
      title={translate({ id: "updates.template-mod.pageTitle", message: "Template Mod Changelogs" })}
      description={translate({ id: "updates.template-mod.pageDescription", message: "Changelogs and release notes for the Subway Builder Template Mod." })}
    >
      <div className={styles.page}>

        <Link to="/updates" className={styles.floatingBack}>
          &larr; Back
        </Link>

        <div className={styles.container}>
          <div className={styles.headerCenter}>
            <h1 className={styles.pageTitle}>
              {translate({ id: "updates.template-mod.template-mod.pageTitle", message: "Template Mod Changelogs" })}
            </h1>
            <p className={styles.pageSubtitle}>
              {translate({ id: "updates.template-mod.template-mod.pageSubtitle", message: "Changelogs and release notes for the Subway Builder Template Mod." })}
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
