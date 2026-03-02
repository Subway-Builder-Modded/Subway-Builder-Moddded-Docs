import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import styles from "../../css/railyardMaps.module.css";

const SOURCE = {
  type: "maps",
  indexUrl:
    "https://raw.githubusercontent.com/Subway-Builder-Modded/The-Railyard/main/maps/index.json",
};

const PAGE_SIZES = [9, 27, 54];

const fieldPathLookup = {
  title: ["name", "title", "displayName"],
  description: ["description", "summary"],
  author: ["author", "creator", "publisher"],
  tags: ["tags", "categories", "labels"],
  population: ["population", "cityPopulation", "populationEstimate"],
  images: ["images", "gallery", "screenshots", "thumbnails"],
};

function getFirstValue(record, key) {
  for (const path of fieldPathLookup[key] || []) {
    if (Object.prototype.hasOwnProperty.call(record, path) && record[path] != null) {
      return record[path];
    }
  }
  return null;
}

function flattenRecord(record, prefix = "") {
  if (record == null || typeof record !== "object") {
    return [{ key: prefix || "value", value: String(record) }];
  }

  const rows = [];
  Object.entries(record).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      rows.push({ key: path, value: JSON.stringify(value) });
    } else if (value && typeof value === "object") {
      rows.push(...flattenRecord(value, path));
    } else {
      rows.push({ key: path, value: String(value) });
    }
  });
  return rows;
}

function toTitleCaseTag(tag) {
  return tag
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function buildGithubImageCandidates(url) {
  if (!url) return [];

  const normalized = url.replace("/refs/heads/", "/").replace("?raw=true", "");
  const candidates = [encodeURI(normalized)];

  const githubMatch = normalized.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/,
  );
  if (githubMatch) {
    const [, owner, repo, branch, rawPath] = githubMatch;
    candidates.push(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodeURI(rawPath)}`,
    );
    candidates.push(`https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${encodeURI(rawPath)}`);
  }

  const rawMatch = normalized.match(
    /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/,
  );
  if (rawMatch) {
    const [, owner, repo, branch, rawPath] = rawMatch;
    candidates.push(`https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${encodeURI(rawPath)}`);
  }

  return [...new Set(candidates)];
}

function normalizeImageList(manifest, id) {
  const imageCandidates = getFirstValue(manifest, "images");
  if (!imageCandidates) return [];

  const toUrl = (value) => {
    if (!value) return [];

    if (typeof value === "string") {
      if (value.startsWith("http")) return buildGithubImageCandidates(value);
      const cleaned = value
        .replace(/^\.\//, "")
        .replace(new RegExp(`^maps/${id}/gallery/`), "")
        .replace(new RegExp(`^${id}/gallery/`), "")
        .replace(/^gallery\//, "")
        .replace(/^maps\//, "")
        .replace(/^\//, "");
      const relative = `maps/${id}/gallery/${cleaned}`;
      return [
        `https://raw.githubusercontent.com/Subway-Builder-Modded/The-Railyard/main/${encodeURI(relative)}`,
        `https://cdn.jsdelivr.net/gh/Subway-Builder-Modded/The-Railyard@main/${encodeURI(relative)}`,
      ];
    }

    if (typeof value === "object") {
      const nested = value.file || value.src || value.path || value.url;
      return toUrl(nested);
    }

    return [];
  };

  if (Array.isArray(imageCandidates)) {
    return imageCandidates.map(toUrl).filter((candidateList) => candidateList.length > 0);
  }

  const singleUrl = toUrl(imageCandidates);
  return singleUrl.length > 0 ? [singleUrl] : [];
}

function getTitle(manifest, id) {
  return getFirstValue(manifest, "title") || id;
}

function getPopulation(manifest) {
  const value = getFirstValue(manifest, "population");
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function compareValues(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function MapPinPlaceholder() {
  return (
    <div className={styles.noImage}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
  );
}

function GalleryImage({ candidates, alt, className }) {
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [candidates]);

  if (candidateIndex >= candidates.length) {
    return <MapPinPlaceholder />;
  }

  return (
    <img
      src={candidates[candidateIndex]}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setCandidateIndex((current) => current + 1)}
    />
  );
}

export default function RailyardMapsPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [pageSize, setPageSize] = useState(27);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageIndexById, setImageIndexById] = useState({});
  const [pendingFocusId, setPendingFocusId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError("");

      try {
        const indexResponse = await fetch(SOURCE.indexUrl);
        if (!indexResponse.ok) {
          throw new Error(
            translate({
              id: "railyard.maps.error.registry",
              message: "Unable to load maps registry.",
            }),
          );
        }
        const indexData = await indexResponse.json();
        const idsRaw = Array.isArray(indexData) ? indexData : indexData[SOURCE.type] || [];

        const ids = idsRaw
          .map((entry) => {
            if (typeof entry === "string") return entry;
            return entry?.id || entry?.slug || entry?.name || null;
          })
          .filter(Boolean);

        const loadedItems = await Promise.all(
          ids.map(async (id) => {
            const manifestUrl = `https://raw.githubusercontent.com/Subway-Builder-Modded/The-Railyard/main/maps/${id}/manifest.json`;
            try {
              const response = await fetch(manifestUrl);
              if (!response.ok) return null;
              const manifest = await response.json();
              return {
                id,
                title: getTitle(manifest, id),
                description:
                  getFirstValue(manifest, "description") ||
                  translate({
                    id: "railyard.maps.noDescription",
                    message: "No description provided.",
                  }),
                tags: getFirstValue(manifest, "tags"),
                population: getPopulation(manifest),
                author:
                  getFirstValue(manifest, "author") ||
                  translate({
                    id: "railyard.maps.unknownAuthor",
                    message: "Unknown",
                  }),
                images: normalizeImageList(manifest, id),
                fields: flattenRecord(manifest),
              };
            } catch {
              return null;
            }
          }),
        );

        if (!cancelled) {
          setItems(loadedItems.filter(Boolean));
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : translate({
                  id: "railyard.maps.error.unknown",
                  message: "Unknown loading error.",
                }),
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    const searched = items.filter((item) => {
      if (!lowered) return true;
      const haystack = [
        item.id,
        item.title,
        item.description,
        item.author,
        item.tags.join(" "),
        item.fields.map((field) => `${field.key} ${field.value}`).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(lowered);
    });

    const tagFiltered = searched.filter((item) =>
      selectedTags.length === 0 ? true : selectedTags.every((tag) => item.tags.includes(tag)),
    );

    return tagFiltered.sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return compareValues(b.title, a.title);
        case "population-desc":
          return compareValues(b.population, a.population);
        case "population-asc":
          return compareValues(a.population, b.population);
        case "id-asc":
          return compareValues(a.id, b.id);
        case "id-desc":
          return compareValues(b.id, a.id);
        case "name-asc":
        default:
          return compareValues(a.title, b.title);
      }
    });
  }, [items, query, selectedTags, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, sortBy, pageSize]);

  useEffect(() => {
    if (!pendingFocusId) return;
    requestAnimationFrame(() => {
      const target = document.querySelector(`[data-card-id="${pendingFocusId}"]`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setPendingFocusId(null);
    });
  }, [pendingFocusId, paginated]);

  function toggleTag(tag) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag],
    );
  }

  function cycleImage(id, direction, max) {
    setImageIndexById((current) => {
      const start = current[id] || 0;
      const next = (start + direction + max) % max;
      return { ...current, [id]: next };
    });
  }

  function renderPagination(isTop = false) {
    if (totalPages <= 1) return null;

    return (
      <nav className={`${styles.pagination} ${isTop ? styles.paginationTop : ""}`}>
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => setPage((value) => Math.max(1, value - 1))}
        >
          {translate({ id: "railyard.maps.previous", message: "Back" })}
        </button>
        <span>
          {translate(
            {
              id: "railyard.maps.pageCounter",
              message: "Page {page} of {totalPages}",
            },
            { page: safePage, totalPages },
          )}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
        >
          {translate({ id: "railyard.maps.next", message: "Next" })}
        </button>
      </nav>
    );
  }

  return (
    <Layout
      title={translate({ id: "railyard.maps.layoutTitle", message: "Railyard Maps" })}
      description={translate({
        id: "railyard.maps.layoutDescription",
        message: "Browse community Subway Builder maps from Railyard.",
      })}
    >
      <main className={styles.page}>
        <Link to="/railyard" className={styles.back}>
          &larr; {translate({ id: "railyard.maps.back", message: "Back" })}
        </Link>

        <section className={styles.hero}>
          <h1>{translate({ id: "railyard.maps.heading", message: "Railyard Maps" })}</h1>
          <p>
            {translate({
              id: "railyard.maps.subtitle",
              message:
                "Search, sort, filter, and browse community maps directly from the registry.",
            })}
          </p>
          <Link to="/railyard/mods" className={styles.switchLink}>
            {translate({ id: "railyard.maps.switchToMods", message: "Browse Mods" })} →
          </Link>
        </section>

        <section className={styles.controls}>
          <input
            type="search"
            className={styles.search}
            placeholder={translate({
              id: "railyard.maps.searchPlaceholder",
              message: "Search by name, author, tags, IDs, or any manifest field...",
            })}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <div className={styles.controlRow}>
            <label>
              {translate({ id: "railyard.maps.sortBy", message: "Sort by" })}
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="name-asc">
                  {translate({ id: "railyard.maps.sort.nameAsc", message: "Name (A → Z)" })}
                </option>
                <option value="name-desc">
                  {translate({ id: "railyard.maps.sort.nameDesc", message: "Name (Z → A)" })}
                </option>
                <option value="population-desc">
                  {translate({
                    id: "railyard.maps.sort.populationDesc",
                    message: "Population (high → low)",
                  })}
                </option>
                <option value="population-asc">
                  {translate({
                    id: "railyard.maps.sort.populationAsc",
                    message: "Population (low → high)",
                  })}
                </option>
                <option value="id-asc">
                  {translate({ id: "railyard.maps.sort.idAsc", message: "ID (A → Z)" })}
                </option>
                <option value="id-desc">
                  {translate({ id: "railyard.maps.sort.idDesc", message: "ID (Z → A)" })}
                </option>
              </select>
            </label>

            <label>
              {translate({ id: "railyard.maps.cardsPerPage", message: "Cards per page" })}
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.tags}>
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  className={`${styles.tagButton} ${active ? styles.tagButtonActive : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {toTitleCaseTag(tag)}
                </button>
              );
            })}
          </div>
        </section>

        {renderPagination(true)}

        {isLoading && (
          <p className={styles.status}>
            {translate({ id: "railyard.maps.loading", message: "Loading map manifests…" })}
          </p>
        )}
        {error && <p className={styles.error}>{error}</p>}

        <section className={styles.grid}>
          {paginated.map((item) => {
            const imageIndex = imageIndexById[item.id] || 0;
            const activeImage = item.images[imageIndex] || [];

            return (
              <article key={item.id} className={styles.card} data-card-id={item.id}>
                <header className={styles.cardHeader}>
                  <h2>{item.title}</h2>
                  <span className={styles.cardId}>{item.id}</span>
                </header>

                <div className={styles.carousel}>
                  {activeImage.length > 0 ? (
                    <GalleryImage
                      candidates={activeImage}
                      alt={`${item.title} preview`}
                      className={styles.previewImage}
                    />
                  ) : (
                    <MapPinPlaceholder />
                  )}
                  {item.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label={translate({
                          id: "railyard.maps.prevImage",
                          message: "Previous image",
                        })}
                        className={`${styles.carouselButton} ${styles.carouselPrev}`}
                        onClick={() => cycleImage(item.id, -1, item.images.length)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label={translate({
                          id: "railyard.maps.nextImage",
                          message: "Next image",
                        })}
                        className={`${styles.carouselButton} ${styles.carouselNext}`}
                        onClick={() => cycleImage(item.id, 1, item.images.length)}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.metaRow}>
                  <p className={styles.metaLine}>
                    <strong>{translate({ id: "railyard.maps.author", message: "Author" })}:</strong>{" "}
                    <span className={styles.metaValue}>{String(item.author)}</span>
                  </p>
                  <p className={styles.metaLine}>
                    <strong>
                      {translate({ id: "railyard.maps.population", message: "Population" })}:
                    </strong>{" "}
                    <span className={styles.metaValue}>
                      {item.population == null
                        ? translate({ id: "railyard.maps.unknownPopulation", message: "Unknown" })
                        : item.population.toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className={styles.tagRow}>
                  {item.tags.map((tag) => (
                    <button
                      type="button"
                      key={`${item.id}-${tag}`}
                      className={styles.cardTag}
                      onClick={() => {
                        setPendingFocusId(item.id);
                        toggleTag(tag);
                      }}
                    >
                      {toTitleCaseTag(tag)}
                    </button>
                  ))}
                </div>

                <details className={styles.details}>
                  <summary>
                    {translate({ id: "railyard.maps.allFields", message: "All manifest fields" })}
                  </summary>
                  <dl>
                    {item.fields.map((field) => (
                      <div key={`${item.id}-${field.key}`} className={styles.fieldRow}>
                        <dt>{field.key}</dt>
                        <dd>{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </article>
            );
          })}
        </section>

        {renderPagination()}

        <footer className={styles.footerBars}>
          <span className={styles.bar} style={{ background: "#0039A6" }} />
          <span className={styles.bar} style={{ background: "#FF6319" }} />
          <span className={styles.bar} style={{ background: "#00933C" }} />
          <span className={styles.bar} style={{ background: "#FCCC0A" }} />
          <span className={styles.bar} style={{ background: "#752F82" }} />
        </footer>
      </main>
    </Layout>
  );
}
