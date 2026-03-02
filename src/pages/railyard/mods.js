import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import styles from "../../css/railyardMods.module.css";

const SOURCE = {
  type: "mods",
  indexUrl:
    "https://raw.githubusercontent.com/Subway-Builder-Modded/The-Railyard/main/mods/index.json",
};

const PAGE_SIZES = [9, 27, 54];
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/Subway-Builder-Modded/The-Railyard@main";
const PLACEHOLDER_IMAGE = "/assets/map-pin-placeholder.svg";

const fieldPathLookup = {
  title: ["name", "title", "displayName"],
  description: ["description", "summary"],
  author: ["author", "creator", "publisher"],
  download: ["download", "downloadUrl", "download_url", "url", "file"],
  tags: ["tags", "categories", "labels"],
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

function normalizeTagList(rawTags) {
  if (!rawTags) return [];
  if (Array.isArray(rawTags)) return rawTags.map((tag) => String(tag));
  if (typeof rawTags === "string") return rawTags.split(",").map((tag) => tag.trim());
  return [];
}

function toTitleCaseTag(tag) {
  return tag
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function normalizeGithubImageUrl(url) {
  if (url.includes("raw.githubusercontent.com")) {
    return url.replace("/refs/heads/", "/");
  }

  if (url.includes("github.com") && url.includes("/blob/")) {
    return url
      .replace("https://github.com/Subway-Builder-Modded/The-Railyard/blob/main", GITHUB_CDN_BASE)
      .replace("?raw=true", "");
  }

  return url;
}

function normalizeImageList(manifest, id) {
  const imageCandidates = getFirstValue(manifest, "images");
  if (!imageCandidates) return [];

  const toUrl = (value) => {
    if (!value) return null;

    if (typeof value === "string") {
      if (value.startsWith("http")) return normalizeGithubImageUrl(value);
      return `${GITHUB_CDN_BASE}/mods/${id}/gallery/${value}`;
    }

    if (typeof value === "object") {
      const nested = value.file || value.src || value.path || value.url;
      return toUrl(nested);
    }

    return null;
  };

  if (Array.isArray(imageCandidates)) {
    return imageCandidates.map(toUrl).filter(Boolean);
  }

  const singleUrl = toUrl(imageCandidates);
  return singleUrl ? [singleUrl] : [];
}

function getTitle(manifest, id) {
  return getFirstValue(manifest, "title") || id;
}

function getDownloadUrl(manifest) {
  const value = getFirstValue(manifest, "download");
  return typeof value === "string" ? value : null;
}

function compareValues(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

export default function RailyardModsPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [pageSize, setPageSize] = useState(27);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageIndexById, setImageIndexById] = useState({});

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
              id: "railyard.mods.error.registry",
              message: "Unable to load mods registry.",
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
            const manifestUrl = `https://raw.githubusercontent.com/Subway-Builder-Modded/The-Railyard/main/mods/${id}/manifest.json`;
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
                    id: "railyard.mods.noDescription",
                    message: "No description provided.",
                  }),
                tags: normalizeTagList(getFirstValue(manifest, "tags")),
                author:
                  getFirstValue(manifest, "author") ||
                  translate({
                    id: "railyard.mods.unknownAuthor",
                    message: "Unknown",
                  }),
                downloadUrl: getDownloadUrl(manifest),
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
                  id: "railyard.mods.error.unknown",
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
  }, [query, sortBy, selectedTags, pageSize]);

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

  return (
    <Layout
      title={translate({ id: "railyard.mods.layoutTitle", message: "Railyard Mods" })}
      description={translate({
        id: "railyard.mods.layoutDescription",
        message: "Browse community Subway Builder mods from Railyard.",
      })}
    >
      <main className={styles.page}>
        <Link to="/railyard" className={styles.back}>
          &larr; {translate({ id: "railyard.mods.back", message: "Back" })}
        </Link>

        <section className={styles.hero}>
          <h1>{translate({ id: "railyard.mods.heading", message: "Railyard Mods" })}</h1>
          <p>
            {translate({
              id: "railyard.mods.subtitle",
              message:
                "Search, sort, filter, and download community mods directly from the registry.",
            })}
          </p>
          <div className={styles.quickStats}>
            <span>
              {translate(
                {
                  id: "railyard.mods.loaded",
                  message: "{count} mods loaded",
                },
                { count: items.length },
              )}
            </span>
            <span>
              {translate(
                {
                  id: "railyard.mods.matching",
                  message: "{count} matching current filters",
                },
                { count: filtered.length },
              )}
            </span>
          </div>
        </section>

        <section className={styles.controls}>
          <input
            type="search"
            className={styles.search}
            placeholder={translate({
              id: "railyard.mods.searchPlaceholder",
              message: "Search by name, author, tags, IDs, or any manifest field...",
            })}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <div className={styles.controlRow}>
            <label>
              {translate({ id: "railyard.mods.sortBy", message: "Sort by" })}
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="name-asc">
                  {translate({ id: "railyard.mods.sort.nameAsc", message: "Name (A → Z)" })}
                </option>
                <option value="name-desc">
                  {translate({ id: "railyard.mods.sort.nameDesc", message: "Name (Z → A)" })}
                </option>
                <option value="id-asc">
                  {translate({ id: "railyard.mods.sort.idAsc", message: "ID (A → Z)" })}
                </option>
                <option value="id-desc">
                  {translate({ id: "railyard.mods.sort.idDesc", message: "ID (Z → A)" })}
                </option>
              </select>
            </label>

            <label>
              {translate({ id: "railyard.mods.cardsPerPage", message: "Cards per page" })}
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

        {isLoading && (
          <p className={styles.status}>
            {translate({ id: "railyard.mods.loading", message: "Loading mod manifests…" })}
          </p>
        )}
        {error && <p className={styles.error}>{error}</p>}

        <section className={styles.grid}>
          {paginated.map((item) => {
            const imageIndex = imageIndexById[item.id] || 0;
            const activeImage = item.images[imageIndex] || PLACEHOLDER_IMAGE;

            return (
              <article
                key={item.id}
                className={styles.card}
                onClick={() =>
                  item.downloadUrl && window.open(item.downloadUrl, "_blank", "noopener,noreferrer")
                }
                role={item.downloadUrl ? "button" : undefined}
                tabIndex={item.downloadUrl ? 0 : -1}
                onKeyDown={(event) => {
                  if (item.downloadUrl && (event.key === "Enter" || event.key === " ")) {
                    window.open(item.downloadUrl, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <header className={styles.cardHeader}>
                  <h2>{item.title}</h2>
                  <span className={styles.cardId}>{item.id}</span>
                </header>

                <div className={styles.carousel}>
                  <img
                    src={activeImage}
                    alt={`${item.title} preview`}
                    className={styles.previewImage}
                  />
                  {item.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label={translate({
                          id: "railyard.mods.prevImage",
                          message: "Previous image",
                        })}
                        className={`${styles.carouselButton} ${styles.carouselPrev}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          cycleImage(item.id, -1, item.images.length);
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label={translate({
                          id: "railyard.mods.nextImage",
                          message: "Next image",
                        })}
                        className={`${styles.carouselButton} ${styles.carouselNext}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          cycleImage(item.id, 1, item.images.length);
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.metaRow}>
                  <span>
                    <strong>{translate({ id: "railyard.mods.author", message: "Author" })}:</strong>{" "}
                    <span className={styles.metaValue}>{String(item.author)}</span>
                  </span>
                </div>

                <div className={styles.tagRow}>
                  {item.tags.map((tag) => (
                    <button
                      type="button"
                      key={`${item.id}-${tag}`}
                      className={styles.cardTag}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleTag(tag);
                      }}
                    >
                      {toTitleCaseTag(tag)}
                    </button>
                  ))}
                </div>

                <details className={styles.details} onClick={(event) => event.stopPropagation()}>
                  <summary>
                    {translate({ id: "railyard.mods.allFields", message: "All manifest fields" })}
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

        <footer className={styles.pagination}>
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            {translate({ id: "railyard.mods.previous", message: "Previous" })}
          </button>
          <span>
            {translate(
              {
                id: "railyard.mods.pageCounter",
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
            {translate({ id: "railyard.mods.next", message: "Next" })}
          </button>
        </footer>

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
