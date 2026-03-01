import React, { useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "../css/railyard.module.css";

const FEATURES = [
  {
    id: "browse",
    letter: "C",
    color: "#1335A1",
    textColor: "#FFFFFF",
    title: translate({ id: "railyard.feature.browse.title", message: "Custom Cities" }),
    desc: translate({
      id: "railyard.feature.browse.desc",
      message: "Browse hundreds of community-made maps of cities from around the world.",
    }),
  },
  {
    id: "install",
    letter: "M",
    color: "#93683A",
    textColor: "#FFFFFF",
    title: translate({ id: "railyard.feature.install.title", message: "Mod Browser" }),
    desc: translate({
      id: "railyard.feature.install.desc",
      message:
        "From adding 500+ new trains to seeing detailed demand data by region, there's a mod for anything you desire.",
    }),
  },
  {
    id: "manage",
    letter: "S",
    color: "#F5CF46",
    textColor: "#000000",
    title: translate({ id: "railyard.feature.manage.title", message: "Simple Installation" }),
    desc: translate({
      id: "railyard.feature.manage.desc",
      message:
        "No more messing around with your system's file manager. Click the download button for the map or mod you want to play and let Railyard do the rest.",
    }),
  },
  {
    id: "updates",
    letter: "F",
    color: "#ED6D32",
    textColor: "#FFFFFF",
    title: translate({ id: "railyard.feature.updates.title", message: "Fast and Easy Management" }),
    desc: translate({
      id: "railyard.feature.updates.desc",
      message:
        "Want to test a mod or disable something for a specific playthrough? You can simply disable the mod and just enable it later with one simple click.",
    }),
  },
];

const ALL_DOWNLOADS = [
  {
    os: "Windows",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Windows x64",
  },
  {
    os: "Windows",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Windows ARM64",
  },
  {
    os: "macOS",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "macOS Apple Silicon",
  },
  {
    os: "macOS",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "macOS Intel",
  },
  {
    os: "Linux",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Linux x64",
  },
  {
    os: "Linux",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Linux ARM64",
  },
];

export default function Railyard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [nativeOS, setNativeOS] = useState(ALL_DOWNLOADS[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    root.style.setProperty("--railyard-zoom", "0");
    root.style.setProperty("--railyard-exposure", "0");

    const updateScroll = () => {
      const scrollPos = window.scrollY;
      const threshold = 200;
      const zoomVal = Math.max(0, scrollPos - threshold);
      const exposureVal = Math.min(1, scrollPos / 500);

      root.style.setProperty("--railyard-zoom", zoomVal.toString());
      root.style.setProperty("--railyard-exposure", exposureVal.toString());
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    const detect = async () => {
      const ua = navigator.userAgent.toLowerCase();
      let os = "Windows",
        arch = "x64";
      if (ua.includes("mac")) os = "macOS";
      else if (ua.includes("linux")) os = "Linux";
      if (navigator.userAgentData?.getHighEntropyValues) {
        const hints = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
        if (hints.architecture === "arm") arch = "arm64";
      } else if (ua.includes("arm64") || ua.includes("aarch64")) arch = "arm64";

      const match = ALL_DOWNLOADS.find((d) => d.os === os && d.arch === arch);
      setNativeOS(match || ALL_DOWNLOADS[0]);
    };
    detect();

    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const heroBg = isDark ? "/images/railyard-home-dark.png" : "/images/railyard-home-light.png";

  return (
    <Layout
      title={translate({ message: "Railyard" })}
      description={translate({
        message:
          "The all-in-one tool for downloading and managing your Subway Builder mods and cities.",
      })}
    >
      <div className={styles.fixedBgContainer}>
        <img src={heroBg} className={styles.fixedBgImage} alt="" />

        <div className={styles.heroOverlay} />

        <div className={styles.fixedBgOverlay} />
        <div className={styles.colorEffect} />
      </div>

      <main className={styles.pageWrapper}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <Translate id="railyard.hero.title">Railyard</Translate>
            </h1>
            <p className={styles.heroSubtitle}>
              <Translate id="railyard.hero.subtitle">
                The all-in-one tool for downloading and managing your Subway Builder mods and
                cities.
              </Translate>
            </p>

            <div className={styles.heroButtonGroup} ref={dropdownRef}>
              <Link to={nativeOS.link} className={styles.mainDownloadButton}>
                <Translate id="railyard.hero.downloadButton" values={{ platform: nativeOS.label }}>
                  {"Download for {platform}"}
                </Translate>
              </Link>

              <button
                className={styles.dropdownToggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={translate({ message: "More Platforms" })}
              >
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 14 8"
                  fill="none"
                  className={menuOpen ? styles.rotated : ""}
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {menuOpen && (
                <div className={styles.heroDropdownMenu}>
                  {ALL_DOWNLOADS.map((dl, i) => (
                    <Link key={i} to={dl.link} className={styles.dropdownItem}>
                      {dl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className={styles.sectionSeparator} />

        <section className={styles.solidSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Translate id="railyard.features.header">Features</Translate>
              </h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.featureTrack}>
              {FEATURES.map((f) => (
                <div key={f.id} className={styles.featureRow}>
                  <div
                    className={styles.lineBullet}
                    style={{ background: f.color, color: f.textColor }}
                  >
                    {f.letter}
                  </div>
                  <div className={styles.featureCard}>
                    <h3 className={styles.cardTitle}>{f.title}</h3>
                    <p className={styles.cardDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.sectionSeparator} />
        <section className={styles.spacerSection} />
        <div className={styles.sectionSeparator} />

        <section className={styles.solidSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Translate id="railyard.downloads.header">All Downloads</Translate>
              </h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.verticalDownloadList}>
              {ALL_DOWNLOADS.map((dl, i) => {
                const isNative = dl.label === nativeOS.label;
                return (
                  <Link
                    key={i}
                    to={dl.link}
                    className={`${styles.longDownloadButton} ${isNative ? styles.activeDownload : ""}`}
                  >
                    <span>
                      {dl.label}
                      {isNative && (
                        <span className={styles.currentBadge}>
                          <Translate id="railyard.downloads.detected">Detected</Translate>
                        </span>
                      )}
                    </span>
                    <span className={styles.ButtonArrow}>→</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <footer className={styles.footerBars}>
            <span className={styles.bar} style={{ background: "#0039A6" }} />
            <span className={styles.bar} style={{ background: "#FF6319" }} />
            <span className={styles.bar} style={{ background: "#00933C" }} />
            <span className={styles.bar} style={{ background: "#FCCC0A" }} />
            <span className={styles.bar} style={{ background: "#752F82" }} />
          </footer>
        </section>
      </main>
    </Layout>
  );
}
