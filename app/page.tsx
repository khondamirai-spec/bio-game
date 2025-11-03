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
  image: string;
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
    image: "/progress/b1.jpg",
    status: "Current Rank",
    unlocked: true,
  },
  {
    title: "To'qima Mutaxassisi",
    subtitle: "Tissue Specialist",
    badge: "\u{1F9EB}",
    leaf: "\u{1F343}",
    cell: "\u{1F9EC}",
    image: "/progress/b2.jpg",
    status: "Unlock at 450 XP",
  },
  {
    title: "Organ Muhandisi",
    subtitle: "Organ Engineer",
    badge: "\u{1FAC0}",
    leaf: "\u{1F33F}",
    cell: "\u{1F9A0}",
    image: "/progress/b3.jpg",
    status: "Unlock at 900 XP",
  },
  {
    title: "Tizim Eksperti",
    subtitle: "System Expert",
    badge: "\u{1F9E0}",
    leaf: "\u{1F340}",
    cell: "\u{1F9EA}",
    image: "/progress/b4.jpg",
    status: "Unlock at 1.3k XP",
  },
  {
    title: "Organizm Masteri",
    subtitle: "Organism Master",
    badge: "\u{1F98B}",
    leaf: "\u{1F331}",
    cell: "\u{1F9A0}",
    image: "/progress/b5.jpg",
    status: "Unlock at 1.8k XP",
  },
  {
    title: "Ekolog",
    subtitle: "Elite Final Rank",
    badge: "\u{1F30E}",
    leaf: "\u{1F343}",
    cell: "\u{1F9EC}",
    image: "/progress/b6.jpg",
    status: "Unlock the Bio Crown",
  },
];

export default function HomePage() {
  const miniGamesRowRef = useRef<HTMLDivElement>(null);
  const progressRowRef = useRef<HTMLDivElement>(null);
  const [isDraggingMiniGames, setIsDraggingMiniGames] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const miniGamesStartXRef = useRef(0);
  const miniGamesScrollLeftRef = useRef(0);
  const progressStartXRef = useRef(0);
  const progressScrollLeftRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingMiniGames && miniGamesRowRef.current) {
        e.preventDefault();
        const x = e.pageX - miniGamesRowRef.current.offsetLeft;
        const walk = x - miniGamesStartXRef.current;
        miniGamesRowRef.current.scrollLeft = miniGamesScrollLeftRef.current - walk;
      }
      if (isDraggingProgress && progressRowRef.current) {
        e.preventDefault();
        const x = e.pageX - progressRowRef.current.offsetLeft;
        const walk = x - progressStartXRef.current;
        progressRowRef.current.scrollLeft = progressScrollLeftRef.current - walk;
      }
    };

    const handleMouseUp = () => {
      setIsDraggingMiniGames(false);
      setIsDraggingProgress(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingMiniGames && miniGamesRowRef.current) {
        e.preventDefault();
        const x = e.touches[0].pageX - miniGamesRowRef.current.offsetLeft;
        const walk = x - miniGamesStartXRef.current;
        miniGamesRowRef.current.scrollLeft = miniGamesScrollLeftRef.current - walk;
      }
      if (isDraggingProgress && progressRowRef.current) {
        e.preventDefault();
        const x = e.touches[0].pageX - progressRowRef.current.offsetLeft;
        const walk = x - progressStartXRef.current;
        progressRowRef.current.scrollLeft = progressScrollLeftRef.current - walk;
      }
    };

    const handleTouchEnd = () => {
      setIsDraggingMiniGames(false);
      setIsDraggingProgress(false);
    };

    if (isDraggingMiniGames || isDraggingProgress) {
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
  }, [isDraggingMiniGames, isDraggingProgress]);

  const handleMiniGamesMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!miniGamesRowRef.current) return;
    e.preventDefault();
    setIsDraggingMiniGames(true);
    miniGamesStartXRef.current = e.pageX - miniGamesRowRef.current.offsetLeft;
    miniGamesScrollLeftRef.current = miniGamesRowRef.current.scrollLeft;
  };

  const handleMiniGamesTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!miniGamesRowRef.current) return;
    e.preventDefault();
    setIsDraggingMiniGames(true);
    miniGamesStartXRef.current = e.touches[0].pageX - miniGamesRowRef.current.offsetLeft;
    miniGamesScrollLeftRef.current = miniGamesRowRef.current.scrollLeft;
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRowRef.current) return;
    e.preventDefault();
    setIsDraggingProgress(true);
    progressStartXRef.current = e.pageX - progressRowRef.current.offsetLeft;
    progressScrollLeftRef.current = progressRowRef.current.scrollLeft;
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!progressRowRef.current) return;
    e.preventDefault();
    setIsDraggingProgress(true);
    progressStartXRef.current = e.touches[0].pageX - progressRowRef.current.offsetLeft;
    progressScrollLeftRef.current = progressRowRef.current.scrollLeft;
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
            <span className={styles.withdraw} aria-label="Withdraw diamonds to money">
              {"\u{1FA99}"}
            </span>
          </div>
        </header>

        <div className={styles.contentWrapper}>
        <section className={styles.section} aria-labelledby="mini-games-title">
          <div className={styles.sectionHeader}>
            <h2 id="mini-games-title" className={styles.sectionTitle}>
              Mini Games
            </h2>
          </div>

          <div
            ref={miniGamesRowRef}
            className={`${styles.miniGamesRow} ${isDraggingMiniGames ? styles.dragging : ""}`}
            onMouseDown={handleMiniGamesMouseDown}
            onTouchStart={handleMiniGamesTouchStart}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={styles.miniGameItem}>
                <div className={styles.miniGameIcon}>
                  <Image
                    src={`/mini_games/mini_${num}.jpg`}
                    alt={`Mini Game ${num}`}
                    width={110}
                    height={110}
                    className={styles.miniGameImage}
                    draggable={false}
                  />
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

          <div
            ref={progressRowRef}
            className={`${styles.progressRow} ${isDraggingProgress ? styles.dragging : ""}`}
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
            {ranks.map((rank, index) => (
              <article
                key={rank.title}
                className={[
                  styles.progressCard,
                  rank.unlocked && index > 0 ? styles.progressCardUnlocked : "",
                  !rank.unlocked ? styles.progressCardLocked : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  backgroundImage: `url(${rank.image})`,
                }}
                aria-label={`${rank.title} - ${rank.subtitle}`}
              >
                {rank.unlocked && index > 0 && <span className={styles.progressHighlight} aria-hidden />}
                <div className={styles.progressText}>
                  <h3 className={styles.progressTitle}>{rank.title}</h3>
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
                  <span className={styles.lockBadge} aria-label="Locked - Level not unlocked yet">
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
      </div>
    </main>
  );
}
