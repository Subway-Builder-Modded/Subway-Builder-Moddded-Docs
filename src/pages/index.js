import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import styles from "../css/index.module.css";

const HOMEPAGE_ITEMS = [
  {
    id: "directory",
    letter: "M",
    bullet: "#0039A6",
    title: translate({
      id: "homepage.directory.title",
      message: "Map Directory",
    }),
    description: translate({
      id: "homepage.directory.description",
      message: "Browse community-made maps from cities around the world.",
    }),
    href: "/wiki/maps/map-directory",
  },
  {
    id: "install",
    letter: "I",
    bullet: "#FF6319",
    title: translate({
      id: "homepage.install.title",
      message: "Installing Maps",
    }),
    description: translate({
      id: "homepage.install.description",
      message: "Step-by-step guide to installing custom maps using Kronifer's Map Patcher.",
    }),
    href: "/wiki/maps/map-installation-guide",
  },
  {
    id: "create",
    letter: "C",
    bullet: "#752F82",
    title: translate({
      id: "homepage.create.title",
      message: "Making Custom Maps",
    }),
    description: translate({
      id: "homepage.create.description",
      message: "The complete guide to creating, packaging, and distributing custom Subway Builder maps.",
    }),
    href: "/wiki/maps/making-custom-maps",
  },
  {
    id: "updates",
    letter: "U",
    bullet: "#FCCC0A",
    title: translate({
      id: "homepage.updates.title",
      message: "Updates & Changelogs",
    }),
    description: translate({
      id: "homepage.updates.description",
      message: "Stay up to date with new releases from the Subway Builder Modded Team.",
    }),
    href: "/updates",
  },
  {
    id: "modding",
    letter: "D",
    bullet: "#00933C",
    title: translate({
      id: "homepage.modding.title",
      message: "Modding Documentation",
    }),
    description: translate({
      id: "homepage.modding.description",
      message: "Build your own mods using our Mod Template.",
    }),
    href: "/modding-docs/getting-started",
  },
];

function useHeroZoom() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const onScroll = () => setScale(Math.min(1 + window.scrollY * 0.0004, 1.25));
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scale;
}

function useThemeImage(light, dark) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  return isDark ? dark : light;
}

export default function Home() {
  const heroScale = useHeroZoom();
  const heroBg = useThemeImage("/images/home-light.png", "/images/home-dark.png");

  return (
    <Layout
      description={translate({
        id: "homepage.meta.description",
        message: "Subway Builder Maps, Mods, and Documentation",
      })}
    >
      <div className={styles.homepage}>

        <section className={styles.hero}>
          <img
            src={heroBg}
            alt="Hero Background"
            className={styles.heroBackground}
            style={{ transform: `scale(${heroScale})` }}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {translate({ id: "homepage.hero.title", message: "Subway Builder Modded" })}
            </h1>
            <p className={styles.heroSubtitle}>
              {translate({
                id: "homepage.hero.subtitle",
                message: "The complete hub for everything modded in Subway Builder.",
              })}
            </p>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {HOMEPAGE_ITEMS.map((item) => (
              <Link key={item.id} to={item.href} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div
                    className={styles.metroBullet}
                    style={{ background: item.bullet }}
                  >
                    {item.letter}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDesc}>{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
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
