import React from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "../css/credits.module.css";

const CONTRIBUTORS = {
  maintainers: [
    {
      name: translate({ id: "credits.maintainers.kaicardenas0618.name", message: "kaicardenas0618" }),
      role: translate({ id: "credits.maintainers.kaicardenas0618.role", message: "Project Lead" }),
      description: translate({
        id: "credits.maintainers.kai.description",
        message:
          "Lead maintainer of Subway Builder Modded. Oversees structure, updates, and content accuracy. Maintains the Spanish translation.",
      }),
      link: "https://github.com/kaicardenas0618",
    },
    {
      name: translate({ id: "credits.maintainers.imb11.name", message: "IMB11" }),
      role: translate({ id: "credits.maintainers.imb11.role", message: "Maintainer" }),
      description: translate({
        id: "credits.maintainers.imb11.description",
        message:
          "Writes and maintains the mod developing documentation as well as various styling elements.",
      }),
      link: "https://github.com/IMB11",
    },
    {
      name: translate({ id: "credits.maintainers.ahkimn.name", message: "ahkimn" }),
      role: translate({ id: "credits.maintainers.ahkimn.role", message: "Maintainer/Developer" }),
      description: translate({
        id: "credits.maintainers.ahkimn.description",
        message:
          "Maintains the wiki and documentation as well as the Map Manager.",
      }),
      link: "https://github.com/ahkimn",
    },
    {
      name: translate({ id: "credits.maintainers.kronifer.name", message: "Kronifer" }),
      role: translate({ id: "credits.maintainers.kronifer.role", message: "Maintainer/Developer" }),
      description: translate({
        id: "credits.maintainers.kronifer.description",
        message:
          "Lead developer and maintainer of the Map Manager and maintainer of the wiki.",
      }),
      link: "https://github.com/kronifer",
    },
  ],
  translators: [
    {
      name: translate({ id: "credits.translators.ppiittii.name", message: "ppiittii" }),
      role: translate({ id: "credits.translators.ppiittii.role", message: "Translator" }),
      description: translate({
        id: "credits.translators.ppiittii.description",
        message:
          "Maintains the German website translations.",
      }),
      link: "https://github.com/ppiittii",
    },
  ],
  gameDevs: [
    {
      name: translate({ id: "credits.gamedevs.colinmiller.name", message: "Colin Miller" }),
      role: translate({ id: "credits.gamedevs.colinmiller.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.maintainers.colinmiller.description",
        message:
          "Lead developer of Subway Builder.",
      }),
      link: "https://www.colindm.com/",
    },
    {
      name: translate({ id: "credits.gamedevs.ejfox.name", message: "EJ Fox" }),
      role: translate({ id: "credits.gamedevs.ejfox.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.ejfox.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://ejfox.com/",
    },
    {
      name: translate({ id: "credits.gamedevs.natemaue.name", message: "Nate Maue" }),
      role: translate({ id: "credits.gamedevs.natemaue.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.natemaue.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://www.linkedin.com/in/nmaue/",
    },
    {
      name: translate({ id: "credits.gamedevs.parkerkaufmann.name", message: "Parker Kaufmann" }),
      role: translate({ id: "credits.gamedevs.parkerkaufmann.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.parkerkaufmann.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://www.parkerkaufmann.com/",
    },
    {
      name: translate({ id: "credits.gamedevs.alexwohlbruck.name", message: "Alex Wohlbruck" }),
      role: translate({ id: "credits.gamedevs.alexwohlbruck.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.alexwohlbruck.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://alex.wohlbruck.com/",
    },
    {
      name: translate({ id: "credits.gamedevs.currankelleher.name", message: "Curran Kelleher" }),
      role: translate({ id: "credits.gamedevs.currankelleher.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.currankelleher.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://currankelleher.com/",
    },
    {
      name: translate({ id: "credits.gamedevs.brooksflannery.name", message: "Brooks Flannery" }),
      role: translate({ id: "credits.gamedevs.brooksflannery.role", message: "Subway Builder Dev" }),
      description: translate({
        id: "credits.gamedevs.brooksflannery.description",
        message:
          "Developer of Subway Builder.",
      }),
      link: "https://www.linkedin.com/in/brooks-flannery-4a767a281/",
    },
  ],
};

const SECTION_INFO = [
  {
    key: "maintainers",
    title: translate({ id: "credits.section.maintainers", message: "Subway Builder Modded Maintainers" }),
    letter: "M",
    color: "#93683A",
  },
  {
    key: "translators",
    title: translate({ id: "credits.section.translators", message: "Subway Builder Modded Wiki Translators" }),
    letter: "T",
    color: "#4EACCD",
  },
  {
    key: "gameDevs",
    title: translate({ id: "credits.section.gamedevs", message: "Subway Builder Game Devs" }),
    letter: "G",
    color: "#80BD55",
  },
];

function Badge({ letter, color }) {
  return <span className={styles.badge} style={{ backgroundColor: color }}>{letter}</span>;
}

function ContributorCard({ contributor, color }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.contributorName}>
        {contributor.link ? (
          <a href={contributor.link} target="_blank" rel="noopener noreferrer">
            {contributor.name}
          </a>
        ) : (
          contributor.name
        )}
      </h3>

      <span className={styles.contributorRole} style={{ color }}>
        {contributor.role}
      </span>

      {contributor.description && (
        <p className={styles.contributorDesc}>
          {contributor.description}
        </p>
      )}
    </div>
  );
}

export default function Credits() {
  return (
    <Layout
      title={translate({ id: "credits.pageTitle", message: "Credits" })}
      description={translate({
        id: "credits.pageDescription",
        message:
          "Subway Builder Modded is a community-driven project made possible by these dedicated contributors.",
      })}
    >
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerCenter}>
            <h1 className={styles.pageTitle}>
              <Translate id="credits.pageTitle">Credits</Translate>
            </h1>
            <p className={styles.pageSubtitle}>
              <Translate id="credits.pageSubtitle">
                Subway Builder Modded is a community-driven project made possible by dedicated contributors.
              </Translate>
            </p>
          </div>

          {SECTION_INFO.map((section) => (
            <section key={section.key} className={styles.section}>
              <div className={styles.sectionHeader}>
                <Badge letter={section.letter} color={section.color} />
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <span className={styles.headerLine}></span>
              </div>

              <div className={styles.grid}>
                {CONTRIBUTORS[section.key].map((contributor, index) => (
                  <ContributorCard key={index} contributor={contributor} color={section.color} />
                ))}
              </div>
            </section>
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
