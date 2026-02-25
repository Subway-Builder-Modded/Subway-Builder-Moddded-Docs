import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../../../css/templatemodupdate.module.css";
import Link from "@docusaurus/Link";

// Global, constant section definitions used for all changelogs
const SECTION_DEFINITIONS = [
  { letter: "F", titleId: "updates.features", default: "Features", color: "#ED6D32" },
  { letter: "B", titleId: "updates.bugfixes", default: "Bugfixes", color: "#ED6D32" },
  { letter: "U", titleId: "updates.upgrades", default: "Upgrades/Changes", color: "#000000" },
  { letter: "O", titleId: "updates.otherNotes", default: "Other Notes", color: "#000000" },
];

/**
 * UpdateTemplate - reusable template for any Map Manager changelog.
 *
 * Props:
 *   titleId, titleMessage           -> The main title of this changelog
 *   releaseDateId, releaseDateMessage -> The release date
 *   itemsBySection                 -> Object mapping section keys ("features", "bugfixes", etc.) to arrays of {id, message}
 */
export default function UpdateTemplate({ 
  titleId, 
  titleMessage, 
  releaseDateId, 
  releaseDateMessage, 
  itemsBySection
}) {
  return (
    <Layout
      title={translate({ id: titleId, message: titleMessage })}
      description={translate({ id: `${titleId}-desc`, message: `Release notes for ${titleMessage}` })}
    >
      <div className={styles.page}>
        <div className={styles.container}>

          {/* Back link */}
          <Link to="/updates/template-mod" className={styles.backLink}>
            &larr; Back
          </Link>

          {/* Centered title bullet */}
          <div className={styles.headerCenter}>
            <div className={styles.titleBullet}>
              <span className={styles.titleBulletText}>
                {translate({ id: titleId, message: titleMessage })}
              </span>
            </div>

            <p className={styles.subtitle}>
              {translate({ id: releaseDateId, message: releaseDateMessage })}
            </p>

            <hr className={styles.dateSeparator} />
          </div>

          {/* Sections */}
          {SECTION_DEFINITIONS.map((section) => {
            const sectionKey = section.titleId.split(".")[1]; // e.g., "features"
            const items = itemsBySection[sectionKey];
            if (!items || items.length === 0) return null;

            return (
              <div key={section.titleId} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.grayBullet} style={{ backgroundColor: section.color }}>
                    {section.letter}
                  </span>
                  <h2 className={styles.sectionLabel}>
                    {translate({ id: section.titleId, message: section.default })}
                  </h2>
                  <span className={styles.headerLine} />
                </div>

                <ul className={styles.sectionList}>
                  {items.map((item, i) => (
                    <li key={i}>
                      {translate({ id: item.id, message: item.message })}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer bars */}
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
