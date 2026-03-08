import { useState, useEffect, useRef } from "react";
import { hero } from "../data/content";

export default function HeroSection() {
  const [showSansBg, setShowSansBg] = useState(false);
  const [isTouchOnly, setIsTouchOnly] = useState(
    () => (typeof window !== "undefined" ? window.matchMedia("(hover: none)").matches : false)
  );
  const [parallaxY, setParallaxY] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const fn = () => setIsTouchOnly(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceMotion.current = prefersReduce;
    if (prefersReduce) return;
    const onScroll = () => setParallaxY(window.scrollY * 0.08);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col md:flex-row md:items-center justify-center w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-cream wave-pattern"
      aria-labelledby="hero-title"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-6 md:flex-row md:text-left md:items-center md:justify-center md:gap-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:items-center lg:max-w-6xl">
        {/* Couverture — parallax au scroll + flip 3D ; desktop: hover ; mobile/touch: clic pour sans fond */}
        <div
          className="hero-cover-perspective hero-stagger-1 w-52 sm:w-60 md:w-72 lg:w-80 lg:justify-self-end"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <div
            className={`hero-cover-flip group w-full rounded-2xl overflow-hidden bg-cream ring-4 ring-gold/80 shadow-[0_20px_50px_-15px_rgba(139,94,60,0.25),0_8px_20px_-8px_rgba(26,26,26,0.15)] relative ${isTouchOnly ? "cursor-pointer touch-manipulation" : ""}`}
            {...(isTouchOnly && {
              onClick: () => setShowSansBg((s) => !s),
              onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowSansBg((s) => !s); } },
              role: "button",
              tabIndex: 0,
              "aria-pressed": showSansBg,
              "aria-label": "Afficher la couverture sans fond",
            })}
          >
            <img
              src="/couverture.webp"
              alt="Couverture du roman La Piratesse — Louise Antonini en aventure sur la mer"
              className="w-full aspect-[2/3] object-cover block"
              width={320}
              height={480}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <img
              src="/couverture-sans-bg.png"
              alt=""
              aria-hidden
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${isTouchOnly && showSansBg ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              width={320}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-5 md:gap-6 max-w-lg lg:max-w-xl lg:justify-self-start">
          <h1
            id="hero-title"
            className="hero-stagger-2 font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-pirate tracking-tight leading-tight"
          >
            <span className="inline-block border-b-4 border-gold pb-2">{hero.title}</span>
          </h1>
          <p className="hero-stagger-4 font-playfair italic text-lg sm:text-xl text-ink/90 leading-relaxed lg:text-xl lg:max-w-md">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
