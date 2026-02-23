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
  return <img src={isDark ? darkSrc : lightSrc} alt={alt} loading="lazy" />;
}

function Badge({ letter, className }) {
  return (
    <span aria-hidden="true" className={`${styles.badge} ${className}`}>
      {letter}
    </span>
  );
}

function HoverCard({ to, className, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      className={`${styles.card} ${className || ""} ${hovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

const MAPS = [
  {
    title: translate({
      id: "homepage.maps.directory.title",
      message: "Map Directory",
    }),
    desc: translate({
      id: "homepage.maps.directory.description",
      message:
        "Browse community-made cities from around the world, including custom maps for the US, Canada, Europe, Asia, and more.",
    }),
    link: translate({
      id: "homepage.maps.directory.link",
      message: "Browse All Maps",
    }),
    lightImg: "/images/home-light-regions-table.png",
    darkImg: "/images/home-dark-regions-table.png",
    href: "/wiki/maps/map-directory",
  },
  {
    title: translate({
      id: "homepage.maps.install.title",
      message: "Installing Maps",
    }),
    desc: translate({
      id: "homepage.maps.install.description",
      message:
        "Add custom cities to your game using Kronifer's Map Manager. Follow our step-by-step guide to download and install.",
    }),
    link: translate({
      id: "homepage.maps.install.link",
      message: "View Installation Guide",
    }),
    lightImg: "/images/home-light-stations.png",
    darkImg: "/images/home-dark-stations.png",
    href: "/wiki/maps/map-installation-guide",
  },
  {
    title: translate({
      id: "homepage.maps.legacy.title",
      message: "Legacy Installation",
    }),
    desc: translate({
      id: "homepage.maps.legacy.description",
      message:
        "Some older maps use the serve method. Learn how to extract and port these maps for the modern installer.",
    }),
    link: translate({
      id: "homepage.maps.legacy.link",
      message: "Legacy Guide",
    }),
    lightImg: "/images/home-light-trains.png",
    darkImg: "/images/home-dark-trains.png",
    href: "/wiki/maps/legacy-map-installation-guide",
  },
  {
    title: translate({
      id: "homepage.maps.updates.title",
      message: "Updates & Changelogs",
    }),
    desc: translate({
      id: "homepage.maps.updates.description",
      message:
        "Stay up to date with the latest Map Manager releases, new map additions, and wiki changes.",
    }),
    link: translate({
      id: "homepage.maps.updates.link",
      message: "View Updates",
    }),
    lightImg: "/images/home-light-transit.png",
    darkImg: "/images/home-dark-transit.png",
    href: "/updates",
  },
];

export default function Home() {
  return (
    <Layout
      description={translate({
        id: "homepage.description",
        message: "Subway Builder Mods, Maps, and Installation Guides",
      })}
      image="/logo.png"
    >
      <div className={styles.page}>
        {/* Content grid */}
        <div className={styles.content}>
          {/* Left: Custom Maps */}
          <section className={styles.mapsSection}>
            <div className={styles.sectionHeader}>
              <Badge letter="M" className={styles.badgeMaps} />
              <h2 className={styles.sectionLabel}>
                <Translate id="homepage.maps.title">Custom Maps</Translate>
              </h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.mapsGrid}>
              {MAPS.map((card) => (
                <HoverCard key={card.titleId} to={card.href}>
                  <div className={styles.cardImg}>
                    <ThemedImage
                      lightSrc={card.lightImg}
                      darkSrc={card.darkImg}
                      alt={card.title}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <span>{card.link}</span>
                  </div>
                </HoverCard>
              ))}
            </div>
          </section>

          {/* Right: Game Modding */}
          <section className={styles.moddingSection}>
            <div className={styles.sectionHeader}>
              <Badge letter="G" className={styles.badgeMods} />
              <h2 className={styles.sectionLabel}>
                <Translate id="homepage.modding.title">Game modding</Translate>
              </h2>
              <span className={styles.headerLine} />
            </div>

            <HoverCard to="/modding-docs/getting-started" className={styles.moddingCard}>
              <div className={styles.cardImg}>
                <ThemedImage
                  lightSrc="/images/home-light-regions-sankey.png"
                  darkSrc="/images/home-dark-regions-sankey.png"
                  alt="Subway Builder modding"
                />
              </div>
              <div className={styles.moddingBody}>
                <h3 className={styles.moddingTitle}>
                  <Translate id="homepage.modding.card.title">
                    Modding Documentation
                  </Translate>
                </h3>
                <p className={styles.moddingDesc}>
                  <Translate id="homepage.modding.card.description">
                    Build your own mods with the Subway Builder Modding API. Get started with the TypeScript template, add custom UI panels, react to game events, build tracks programmatically, and more.
                  </Translate>
                </p>
                <span className={styles.cardLinkMods}>
                  <Translate id="homepage.modding.card.link">
                    Get started
                  </Translate>
                  {" \u2192"}
                </span>
              </div>
            </HoverCard>
          </section>
        </div>

        {/* Footer bar */}
        <footer className={styles.footerBars}>
          <span className={styles.bar} style={{ background: "#0039A6" }} />
          <span className={styles.bar} style={{ background: "#FF6319" }} />
          <span className={styles.bar} style={{ background: "#00933C" }} />
          <span className={styles.bar} style={{ background: "#FCCC0A" }} />
        </footer>
      </div>
    </Layout>
  );
}
