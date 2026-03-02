import React, { useState, useEffect, useRef, useMemo } from "react";
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
    bullets: [
      "Filter by region, style, and difficulty.",
      "Preview maps before installing.",
      "Discover trending creations weekly.",
    ],
    actionLabel: "Explore Cities",
    actionTo: "/wiki/maps/map-directory",
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
    bullets: [
      "Install mods with one click.",
      "See compatibility notes at a glance.",
      "Get updates without manual file hunting.",
    ],
    actionLabel: "Browse Mods",
    actionTo: "/modding-docs/template-mod/getting-started",
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
    bullets: [
      "No manual folder setup.",
      "Automatic handling for standard packages.",
      "Faster onboarding for new players.",
    ],
    actionLabel: "See Install Guide",
    actionTo: "/wiki/maps/map-installation-guide",
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
    bullets: [
      "Toggle content instantly.",
      "Keep clean setups for specific playthroughs.",
      "Spend less time troubleshooting conflicts.",
    ],
    actionLabel: "Read Updates",
    actionTo: "/updates",
  },
];

const ALL_DOWNLOADS = [
  {
    os: "Windows",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Windows x64",
    size: "121 MB",
    type: ".zip",
    checksum: "SHA256",
  },
  {
    os: "Windows",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Windows ARM64",
    size: "119 MB",
    type: ".zip",
    checksum: "SHA256",
  },
  {
    os: "macOS",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "macOS Apple Silicon",
    size: "117 MB",
    type: ".dmg",
    checksum: "SHA256",
  },
  {
    os: "macOS",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "macOS Intel",
    size: "118 MB",
    type: ".dmg",
    checksum: "SHA256",
  },
  {
    os: "Linux",
    arch: "x64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Linux x64",
    size: "116 MB",
    type: ".AppImage",
    checksum: "SHA256",
  },
  {
    os: "Linux",
    arch: "arm64",
    link: "https://geek.co.il/2023/02/09/imported-rant-why-i-hate-macos",
    label: "Linux ARM64",
    size: "114 MB",
    type: ".AppImage",
    checksum: "SHA256",
  },
];

const WORKFLOW_STOPS = [
  {
    id: "find",
    title: "Find",
    desc: "Search community maps and mods quickly with clear categories and tags.",
  },
  {
    id: "install",
    title: "Install",
    desc: "Add what you want in one click, without digging through folders.",
  },
  {
    id: "manage",
    title: "Manage",
    desc: "Enable, disable, and test configurations for specific playthroughs.",
  },
];

const HERO_STATS = [
  { value: "600+", label: "Cities" },
  { value: "500+", label: "Mods" },
  { value: "1-Click", label: "Install" },
  { value: "Win/Mac/Linux", label: "Platforms" },
];

export default function Railyard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [nativeOS, setNativeOS] = useState(ALL_DOWNLOADS[0]);

  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id);
  const [activeStop, setActiveStop] = useState(WORKFLOW_STOPS[0].id);

  const [selectedOS, setSelectedOS] = useState("Windows");
  const [selectedArch, setSelectedArch] = useState("x64");

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
      let os = "Windows";
      let arch = "x64";

      if (ua.includes("mac")) os = "macOS";
      else if (ua.includes("linux")) os = "Linux";

      if (navigator.userAgentData?.getHighEntropyValues) {
        const hints = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
        if (hints.architecture === "arm") arch = "arm64";
      } else if (ua.includes("arm64") || ua.includes("aarch64")) {
        arch = "arm64";
      }

      const match = ALL_DOWNLOADS.find((d) => d.os === os && d.arch === arch) || ALL_DOWNLOADS[0];
      setNativeOS(match);
      setSelectedOS(match.os);
      setSelectedArch(match.arch);
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

  const filteredDownloads = useMemo(
    () => ALL_DOWNLOADS.filter((d) => d.os === selectedOS && d.arch === selectedArch),
    [selectedOS, selectedArch],
  );

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
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
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
                  <Translate
                    id="railyard.hero.downloadButton"
                    values={{ platform: nativeOS.label }}
                  >
                    {"Download for {platform}"}
                  </Translate>
                </Link>

                <button
                  className={styles.dropdownToggle}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={translate({ message: "More Platforms" })}
                  type="button"
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
                    {ALL_DOWNLOADS.map((dl) => (
                      <Link key={dl.label} to={dl.link} className={styles.dropdownItem}>
                        {dl.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.heroQuickLinks}>
                <Link to="/wiki/maps/map-directory" className={styles.heroGhostButton}>
                  Browse Maps
                </Link>
                <Link
                  to="/modding-docs/template-mod/getting-started"
                  className={styles.heroGhostButton}
                >
                  Browse Mods
                </Link>
                <Link to="/updates" className={styles.heroGhostButton}>
                  View Changelog
                </Link>
              </div>

              <div className={styles.heroStatsStrip}>
                {HERO_STATS.map((s) => (
                  <div key={s.label} className={styles.statPill}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroRight} aria-hidden="true">
              <div className={styles.networkPanel}>
                <div className={styles.networkGrid} />
                <span className={`${styles.networkNode} ${styles.nodeA}`} />
                <span className={`${styles.networkNode} ${styles.nodeB}`} />
                <span className={`${styles.networkNode} ${styles.nodeC}`} />
                <span className={styles.networkLine} />
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionSeparator} />

        <section className={styles.solidSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Features</h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.routeBoard}>
              {FEATURES.map((f) => {
                const isActive = activeFeature === f.id;
                return (
                  <article
                    key={f.id}
                    className={`${styles.routeCard} ${isActive ? styles.routeCardActive : ""}`}
                    onMouseEnter={() => setActiveFeature(f.id)}
                    onFocus={() => setActiveFeature(f.id)}
                    tabIndex={0}
                  >
                    <div
                      className={styles.routeNode}
                      style={{ background: f.color, color: f.textColor }}
                    >
                      {f.letter}
                    </div>
                    <div className={styles.routeContent}>
                      <h3 className={styles.cardTitle}>{f.title}</h3>
                      <p className={styles.cardDesc}>{f.desc}</p>
                      <ul className={styles.featureBullets}>
                        {f.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <Link to={f.actionTo} className={styles.inlineAction}>
                        {f.actionLabel} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <div className={styles.sectionSeparator} />

        <section className={styles.solidSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Workflow in 3 Stops</h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.workflowTrack}>
              {WORKFLOW_STOPS.map((stop) => {
                const isActive = activeStop === stop.id;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    className={`${styles.workflowStop} ${isActive ? styles.workflowStopActive : ""}`}
                    onMouseEnter={() => setActiveStop(stop.id)}
                    onFocus={() => setActiveStop(stop.id)}
                    onClick={() => setActiveStop(stop.id)}
                  >
                    <h3>{stop.title}</h3>
                    <p>{stop.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className={styles.sectionSeparator} />

        <section className={styles.solidSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Translate id="railyard.downloads.header">All Downloads</Translate>
              </h2>
              <span className={styles.headerLine} />
            </div>

            <div className={styles.downloadsPanel}>
              <div className={styles.osTabs}>
                {["Windows", "macOS", "Linux"].map((os) => (
                  <button
                    key={os}
                    type="button"
                    className={`${styles.osTab} ${selectedOS === os ? styles.osTabActive : ""}`}
                    onClick={() => setSelectedOS(os)}
                  >
                    {os}
                  </button>
                ))}
              </div>

              <div className={styles.archChips}>
                {["x64", "arm64"].map((arch) => (
                  <button
                    key={arch}
                    type="button"
                    className={`${styles.archChip} ${selectedArch === arch ? styles.archChipActive : ""}`}
                    onClick={() => setSelectedArch(arch)}
                  >
                    {arch.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className={styles.verticalDownloadList}>
                {filteredDownloads.map((dl) => {
                  const isNative = dl.label === nativeOS.label;
                  return (
                    <Link
                      key={dl.label}
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
                        <span className={styles.downloadMeta}>
                          {` ${dl.type} · ${dl.size} · ${dl.checksum}`}
                        </span>
                      </span>
                      <span className={styles.ButtonArrow}>→</span>
                    </Link>
                  );
                })}
              </div>

              <div className={styles.allPlatformsBlock}>
                <h3 className={styles.allPlatformsTitle}>All platform builds</h3>
                {ALL_DOWNLOADS.map((dl) => (
                  <Link key={`all-${dl.label}`} to={dl.link} className={styles.platformRow}>
                    <span>{dl.label}</span>
                    <span className={styles.downloadMeta}>
                      {dl.type} · {dl.size}
                    </span>
                  </Link>
                ))}
              </div>
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
