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
    titleId: "homepage.maps.directory.title",
    descId: "homepage.maps.directory.description",
    linkId: "homepage.maps.directory.link",
    titleDefault: "Map Directory",
    descDefault:
      "Browse community-made cities from around the world, including custom maps for the US, Canada, Europe, Asia, and more.",
    linkDefault: "Browse All Maps",
    lightImg: "/images/home-light-regions-table.png",
    darkImg: "/images/home-dark-regions-table.png",
    href: "/wiki/maps/map-directory",
    color: "#0039A6",
  },
  {
    titleId: "homepage.maps.install.title",
    descId: "homepage.maps.install.description",
    linkId: "homepage.maps.install.link",
    titleDefault: "Installing Maps",
    descDefault:
      "Add custom cities to your game using Kronifer's Map Manager. Follow our step-by-step guide to download and install.",
    linkDefault: "View Installation Guide",
    lightImg: "/images/home-light-stations.png",
    darkImg: "/images/home-dark-stations.png",
    href: "/wiki/maps/map-installation-guide",
    color: "#FF6319",
  },
  {
    titleId: "homepage.maps.legacy.title",
    descId: "homepage.maps.legacy.description",
    linkId: "homepage.maps.legacy.link",
    titleDefault: "Legacy Installation",
    descDefault:
      "Some older maps use the serve method. Learn how to extract and port these maps for the modern installer.",
    linkDefault: "Legacy Guide",
    lightImg: "/images/home-light-trains.png",
    darkImg: "/images/home-dark-trains.png",
    href: "/wiki/maps/legacy-map-installation-guide",
    color: "#752F82",
  },
  {
    titleId: "homepage.maps.updates.title",
    descId: "homepage.maps.updates.description",
    linkId: "homepage.maps.updates.link",
    titleDefault: "Updates & Changelogs",
    descDefault:
      "Stay up to date with the latest Map Manager releases, new map additions, and wiki changes.",
    linkDefault: "View Updates",
    lightImg: "/images/home-light-transit.png",
    darkImg: "/images/home-dark-transit.png",
    href: "/updates",
    color: "#FCCC0A",
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
        <div className={styles.content}>
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
                    <ThemedImage lightSrc={card.lightImg} darkSrc={card.darkImg} alt={card.titleDefault} />
                  </div>
                  <div className={styles.moddingBody}>
                    <h3 className={styles.moddingTitle}>
                      <Translate id={card.titleId} description={card.titleDefault}>
                        {card.titleDefault}
                      </Translate>
                    </h3>
                    <p className={styles.moddingDesc}>
                      <Translate id={card.descId} description={card.descDefault}>
                        {card.descDefault}
                      </Translate>
                    </p>
                    <span
                      className={styles.cardLinkMods}
                      style={{ color: card.color }}
                    >
                      <Translate id={card.linkId} description={card.linkDefault}>
                        {card.linkDefault}
                      </Translate>{" "}
                      {"\u2192"}
                    </span>
                  </div>
                </HoverCard>
              ))}
            </div>
          </section>
          <section className={styles.moddingSection}>
            <div className={styles.sectionHeader}>
              <Badge letter="G" className={styles.badgeMods} />
              <h2 className={styles.sectionLabel}>
                <Translate id="homepage.modding.title">Game Modding</Translate>
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
                  <Translate id="homepage.modding.card.title">Modding Documentation</Translate>
                </h3>
                <p className={styles.moddingDesc}>
                  <Translate id="homepage.modding.card.description">
                    Build your own mods with the Subway Builder Modding API. Get Started with the TypeScript template, add custom UI panels, react to game events, build tracks programmatically, and more.
                  </Translate>
                </p>
                <span
                  className={styles.cardLinkMods}
                  style={{ color: "#00933C" }}
                >
                  <Translate id="homepage.modding.card.link">Get Started</Translate>
                  {"\u2192"}
                </span>
              </div>
            </HoverCard>
          </section>
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
