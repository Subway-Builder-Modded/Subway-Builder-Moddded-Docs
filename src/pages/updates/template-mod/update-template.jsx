import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import styles from "../../../css/templatemodupdate.module.css";
import Link from "@docusaurus/Link";

const SECTION_DEFINITIONS = [
  { key: "features", letter: "F", titleId: "updates.features", defaultMessage: "Features", color: "#ED6D32" },
  { key: "bugfixes", letter: "B", titleId: "updates.bugfixes", defaultMessage: "Bugfixes", color: "#ED6D32" },
  { key: "upgrades", letter: "U", titleId: "updates.upgrades", defaultMessage: "Upgrades/Changes", color: "#0C493B" },
  { key: "otherNotes", letter: "O", titleId: "updates.otherNotes", defaultMessage: "Other Notes", color: "#000000" },
];

export default function UpdateTemplateTemplateMod({
  titleId = "updates.fallback.title",
  titleMessage = "Update",
  titleLink = null,
  releaseDateId = "updates.fallback.date",
  releaseDateMessage = "",
  itemsBySection = {},
}) {
  return (
    <Layout
      title={titleMessage}
      description={`Release notes for ${titleMessage}`}
    >
      <div className={styles.page}>

        <Link to="/updates/template-mod" className={styles.back}>
          &larr; Back
        </Link>

        <div className={styles.container}>
          <div className={styles.headerCenter}>

            {titleLink ? (
              <Link to={titleLink} className={styles.titleLineBullet}>
                <span className={styles.titleLineBulletText}>
                  <Translate id={titleId}>{titleMessage}</Translate>
                </span>
              </Link>
            ) : (
              <div className={styles.titleLineBullet}>
                <span className={styles.titleLineBulletText}>
                  <Translate id={titleId}>{titleMessage}</Translate>
                </span>
              </div>
            )}

            {releaseDateMessage && (
              <p className={styles.subtitle}>
                <Translate id={releaseDateId}>{releaseDateMessage}</Translate>
              </p>
            )}

            <hr className={styles.dateSeparator} />
          </div>

          {SECTION_DEFINITIONS.map((section) => {
            const items = itemsBySection[section.key];
            if (!items || items.length === 0) return null;

            return (
              <div key={section.key} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span
                    className={styles.lineBullet}
                    style={{ backgroundColor: section.color }}
                  >
                    {section.letter}
                  </span>

                  <h2 className={styles.sectionLabel}>
                    <Translate id={section.titleId}>
                      {section.defaultMessage}
                    </Translate>
                  </h2>

                  <span className={styles.sectionLabelLine} />
                </div>

                <ul className={styles.sectionList}>
                  {items.map((item, i) => {
                    if (typeof item === "string") {
                      return <li key={i}>{item}</li>;
                    }

                    const itemId = item.id || `updates.${section.key}.item.${i}`;
                    const messageText =
                      item.message || item.defaultMessage || "";

                    return (
                      <li key={i}>
                        <Translate id={itemId}>
                          {messageText}
                        </Translate>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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
