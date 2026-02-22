import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "../css/index.module.css";

function useTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function ThemedImage({ lightSrc, darkSrc, alt }) {
  const isDark = useTheme();
  return <img src={isDark ? darkSrc : lightSrc} alt={alt} />;
}

export default function Home() {
  return (
    <Layout
      description={translate({
        id: "homepage.description",
        message: "Subway Builder Mods, Maps, and Installation Guides",
      })}
      image="/logo.png"
    >
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <Translate id="homepage.heading">
              Subway Builder Modding Wiki
            </Translate>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="homepage.subtitle">
              The complete hub for community-made Subway Builder maps, installation guides, and modding resources.
            </Translate>
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {/* Custom Maps */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.badge} ${styles.badgeMaps}`}>M</div>
            <h2 className={styles.sectionTitle}>
              <Translate id="homepage.maps.title">Custom maps</Translate>
            </h2>
          </div>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <ThemedImage
                  lightSrc="/images/home-light-regions-table.png"
                  darkSrc="/images/home-dark-regions-table.png"
                  alt="Map directory"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.maps.directory.title">
                    Map directory
                  </Translate>
                </h3>
                <p className={styles.cardText}>
                  <Translate id="homepage.maps.directory.description">
                    Browse the complete directory of community-made cities from around the world, including custom maps for the US, Canada, Europe, Asia, and more.
                  </Translate>
                </p>
                <Link
                  className={`${styles.cardLink} ${styles.linkMaps}`}
                  to="/wiki/maps/map-directory"
                >
                  <Translate id="homepage.maps.directory.link">
                    Browse all maps
                  </Translate>
                  <span className={styles.arrow}>{"\u2192"}</span>
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImage}>
                <ThemedImage
                  lightSrc="/images/home-light-stations.png"
                  darkSrc="/images/home-dark-stations.png"
                  alt="Subway Builder gameplay"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.maps.install.title">
                    Installing maps
                  </Translate>
                </h3>
                <p className={styles.cardText}>
                  <Translate id="homepage.maps.install.description">
                    Add custom cities to your game using Kronifer's Map Manager. Follow our step-by-step guide to download, install, and play community maps.
                  </Translate>
                </p>
                <Link
                  className={`${styles.cardLink} ${styles.linkMaps}`}
                  to="/wiki/maps/map-installation-guide"
                >
                  <Translate id="homepage.maps.install.link">
                    View installation guide
                  </Translate>
                  <span className={styles.arrow}>{"\u2192"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Guides & Resources */}
        <section className={styles.sectionLast}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.badge} ${styles.badgeGuides}`}>G</div>
            <h2 className={styles.sectionTitle}>
              <Translate id="homepage.guides.title">
                Guides & resources
              </Translate>
            </h2>
          </div>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <ThemedImage
                  lightSrc="/images/home-light-trains.png"
                  darkSrc="/images/home-dark-trains.png"
                  alt="Legacy map installation"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.guides.legacy.title">
                    Legacy installation
                  </Translate>
                </h3>
                <p className={styles.cardText}>
                  <Translate id="homepage.guides.legacy.description">
                    Some older maps use the serve method instead of the Map Manager. Learn how to extract and port these maps so they work with the modern installer.
                  </Translate>
                </p>
                <Link
                  className={`${styles.cardLink} ${styles.linkGuides}`}
                  to="/wiki/maps/legacy-map-installation-guide"
                >
                  <Translate id="homepage.guides.legacy.link">
                    Legacy guide
                  </Translate>
                  <span className={styles.arrow}>{"\u2192"}</span>
                </Link>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImage}>
                <ThemedImage
                  lightSrc="/images/home-light-transit.png"
                  darkSrc="/images/home-dark-transit.png"
                  alt="Updates and changelogs"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.guides.updates.title">
                    Updates & changelogs
                  </Translate>
                </h3>
                <p className={styles.cardText}>
                  <Translate id="homepage.guides.updates.description">
                    Stay up to date with the latest Map Manager releases, new map additions, and wiki changes.
                  </Translate>
                </p>
                <Link
                  className={`${styles.cardLink} ${styles.linkGuides}`}
                  to="/updates"
                >
                  <Translate id="homepage.guides.updates.link">
                    View updates
                  </Translate>
                  <span className={styles.arrow}>{"\u2192"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
