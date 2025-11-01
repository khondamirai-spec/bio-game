"use client";

import { useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type MiniGame = {
  title: string;
  icons: string[];
  bowlColor: string;
  bowlShadow: string;
  labelColor: string;
  iconBackground?: string;
  iconShadow?: string;
  layout?: "sparkle" | "caring";
};

type Rank = {
  title: string;
  subtitle: string;
  badge: string;
  leaf: string;
  cell: string;
  status: string;
  unlocked?: boolean;
};

const miniGames: MiniGame[] = [];

const miniGameNames = [
  "Rasmdagi nima",
  "Terminlar",
  "Bu kim",
  "Tabiat detektivi",
  "Blitz test",
  "DNK zanjiri",
  "Ekologik muvonazanat",
  "Bio Labirint",
];

const ranks: Rank[] = [
  {
    title: "Hujayra Biologi",
    subtitle: "Cell Biologist",
    badge: "\u{1F9EC}",
    leaf: "\u{1F331}",
    cell: "\u{1F9A0}",
    status: "Current Rank",
    unlocked: true,
  },
  {
    title: "To‘qima Mutaxassisi",
    subtitle: "Tissue Specialist",
    badge: "\u{1F9EB}",
    leaf: "\u{1F343}",
    cell: "\u{1F9EC}",
    status: "Unlock at 450 XP",
  },
  {
    title: "Organ Muhandisi",
    subtitle: "Organ Engineer",
    badge: "\u{1FAC0}",
    leaf: "\u{1F33F}",
    cell: "\u{1F9A0}",
    status: "Unlock at 900 XP",
  },
  {
    title: "Tizim Eksperti",
    subtitle: "System Expert",
    badge: "\u{1F9E0}",
    leaf: "\u{1F340}",
    cell: "\u{1F9EA}",
    status: "Unlock at 1.3k XP",
  },
  {
    title: "Organizm Masteri",
    subtitle: "Organism Master",
    badge: "\u{1F98B}",
    leaf: "\u{1F331}",
    cell: "\u{1F9A0}",
    status: "Unlock at 1.8k XP",
  },
  {
    title: "Ekolog",
    subtitle: "Elite Final Rank",
    badge: "\u{1F30E}",
    leaf: "\u{1F343}",
    cell: "\u{1F9EC}",
    status: "Unlock the Bio Crown",
  },
];

export default function HomePage() {
  const miniGamesRowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !miniGamesRowRef.current) return;
      e.preventDefault();
      const x = e.pageX - miniGamesRowRef.current.offsetLeft;
      const walk = x - startXRef.current;
      miniGamesRowRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !miniGamesRowRef.current) return;
      e.preventDefault();
      const x = e.touches[0].pageX - miniGamesRowRef.current.offsetLeft;
      const walk = x - startXRef.current;
      miniGamesRowRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!miniGamesRowRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.pageX - miniGamesRowRef.current.offsetLeft;
    scrollLeftRef.current = miniGamesRowRef.current.scrollLeft;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!miniGamesRowRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.touches[0].pageX - miniGamesRowRef.current.offsetLeft;
    scrollLeftRef.current = miniGamesRowRef.current.scrollLeft;
  };

  return (
    <main className={styles.screen}>
      <div className={styles.stack}>
        <header className={styles.topBar}>
          <div className={styles.logo}>
            <span aria-hidden className={styles.logoMark}>
              {"\u{1F642}"}
            </span>
            <span>BioGame</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className={styles.diamond}>
              <span aria-hidden>{"\u{1F48E}"}</span>
              <span>120</span>
            </div>
            <button
              type="button"
              className={styles.withdraw}
              aria-label="Withdraw diamonds to money"
            >
              {"\u{1F4B1}"}
            </button>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="mini-games-title">
          <div className={styles.sectionHeader}>
            <h2 id="mini-games-title" className={styles.sectionTitle}>
              Mini Games
            </h2>
          </div>

          <div
            ref={miniGamesRowRef}
            className={`${styles.miniGamesRow} ${isDragging ? styles.dragging : ""}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={styles.miniGameItem}>
                <div className={styles.miniGameIcon}>
                  <Image
                    src={`/mini_games/mini_${num}.jpg`}
                    alt={`Mini Game ${num}`}
                    width={84}
                    height={84}
                    className={styles.miniGameImage}
                    draggable={false}
                  />
                  {num === 1 && (
                    <div className={`${styles.miniGameBadge} ${styles.badgeNew}`}>
                      New
                    </div>
                  )}
                  {num === 3 && (
                    <div className={`${styles.miniGameBadge} ${styles.badgePopular}`}>
                      ⭐ Top
                    </div>
                  )}
                  {num === 6 && (
                    <div className={`${styles.miniGameBadge} ${styles.badgeNew}`}>
                      New
                    </div>
                  )}
                </div>
                <p className={styles.miniGameName}>{miniGameNames[num - 1]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="progress-title">
          <div className={styles.sectionHeader}>
            <h2 id="progress-title" className={styles.sectionTitle}>
              Your Progress
            </h2>
            <p className={styles.sectionSubtitle}>
              Climb the bio ladder.
            </p>
          </div>

          <div className={styles.progressRow}>
            {ranks.map((rank) => (
              <article
                key={rank.title}
                className={[
                  styles.progressCard,
                  rank.unlocked ? styles.progressCardUnlocked : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${rank.title} - ${rank.subtitle}`}
              >
                {rank.unlocked && <span className={styles.progressHighlight} aria-hidden />}
                <div className={styles.progressBadge} aria-hidden>
                  {rank.badge}
                </div>
                <div>
                  <h3 className={styles.progressTitle}>{rank.title}</h3>
                  <p className={styles.progressSubtitle}>{rank.subtitle}</p>
                </div>
                <span
                  className={[
                    styles.statusChip,
                    !rank.unlocked ? styles.lockedChip : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {rank.status}
                </span>
                <span className={styles.microCell} aria-hidden>
                  {rank.cell}
                </span>
                <span className={styles.microLeaf} aria-hidden>
                  {rank.leaf}
                </span>
                {!rank.unlocked && (
                  <span className={styles.lockBadge} aria-hidden>
                    {"\u{1F512}"}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <p className={styles.note}>
          Soft gradients, playful science icons, and gentle shadows bring your BioGame home to life.
        </p>
      </div>
    </main>
  );
}
