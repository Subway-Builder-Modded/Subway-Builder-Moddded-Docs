import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from '../css/index.module.css';

const lightImages = [
  '/images/home-light-regions-sankey.png',
  '/images/home-light-regions-table.png',
  '/images/home-light-stations.png',
  '/images/home-light-stations-secondary.png',
  '/images/home-light-transit.png',
];

const darkImages = [
  '/images/home-dark-regions-sankey.png',
  '/images/home-dark-regions-table.png',
  '/images/home-dark-stations.png',
  '/images/home-dark-stations-secondary.png',
  '/images/home-dark-transit.png',
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Detect dark/light mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    return () => observer.disconnect();
  }, []);

  const images = isDark ? darkImages : lightImages;

  // Preload all images for instant theme switch
  useEffect(() => {
    [...lightImages, ...darkImages].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (i) => setIndex(i);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <Layout
      description={translate({ id: 'homepage.description', message: 'Subway Builder Mods, Maps, and Installation Guides' })}
      image="/logo.png"
    >
      <main className={styles.hero}>
        {/* Carousel */}
        <div className={styles.carousel}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className={`${styles.slideImage} ${i === index ? styles.active : ''}`}
            />
          ))}

          {/* Controls at bottom */}
          <div className={styles.controls}>
            <button className={styles.arrowButton} onClick={prevSlide}>{'<'}</button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === index ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(i)}
                />
              ))}
            </div>
            <button className={styles.arrowButton} onClick={nextSlide}>{'>'}</button>
          </div>
        </div>

        {/* Content overlay */}
        <div className={styles.container}>
          <h1 className={styles.title}>
            <Translate id="homepage.heading">Subway Builder Modded Wiki</Translate>
          </h1>

          <p className={styles.subtitle}>
            <Translate id="homepage.subtitle">
              The complete hub for Subway Builder maps, mods, and guides.
              Discover custom maps, expand your game with community-made content,
              and learn exactly how to install everything step-by-step.
            </Translate>
          </p>

          <div className={styles.buttons}>
            <Link
              className={`${styles.button} ${styles.primary}`}
              to="/wiki/maps/map-directory"
            >
              <Translate id="homepage.button.maps">Browse Maps</Translate>
            </Link>

            <Link
              className={`${styles.button} ${styles.primary}`}
              to="/wiki/guides/map-installation-guide"
            >
              <Translate id="homepage.button.installation">Installation Guide</Translate>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
