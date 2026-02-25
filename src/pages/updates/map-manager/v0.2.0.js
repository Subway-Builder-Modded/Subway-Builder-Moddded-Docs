import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import styles from "../../../css/updatepage.module.css";

const SECTIONS = [
  { letter: "F", titleId: "updates.features", default: "Features", color: "#ED6D32" },
  { letter: "B", titleId: "updates.bugfixes", default: "Bugfixes", color: "#ED6D32" },
  { letter: "U", titleId: "updates.upgrades", default: "Upgrades", color: "#000000" },
  { letter: "O", titleId: "updates.otherNotes", default: "Other Notes", color: "#000000" },
];

export default function UpdateTemplate() {
  return (
    <Layout
      title={translate({ id: "updates.v2026-02-24.title", message: "Map Manager - v2.3.1" })}
      description={translate({
        id: "updates.v2026-02-24.description",
        message: "Release notes for Map Manager v2.3.1",
      })}
    >
      <div className={styles.page}>
        <div className={styles.container}>

          <div id="update-title-bullet" className={styles.titleBullet}>
            <span className={styles.titleBulletText}>
              {translate({ id: "updates.v2026-02-24.title", message: "Map Manager - v2.3.1" })}
            </span>
          </div>

          <p id="update-date" className={styles.subtitle}>
            {translate({ id: "updates.v2026-02-24.releaseDate", message: "Released February 24, 2026" })}
          </p>

          <hr id="update-date-separator" className={styles.dateSeparator} />

          {SECTIONS.map((section, idx) => (
            <div key={idx} className={styles.section}>
              <div className={styles.sectionHeader}>
                <span
                  className={styles.grayBullet}
                  style={{ backgroundColor: section.color }}
                >
                  {section.letter}
                </span>
                <h2 className={styles.sectionLabel}>
                  {translate({ id: section.titleId, message: section.default })}
                </h2>
                <span className={styles.headerLine} />
              </div>

              <ul className={styles.sectionList}>
                <li>{translate({ id: `updates.v2026-02-24.${section.titleId}.item1`, message: "Example item 1" })}</li>
                <li>{translate({ id: `updates.v2026-02-24.${section.titleId}.item2`, message: "Example item 2" })}</li>
              </ul>
            </div>
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
