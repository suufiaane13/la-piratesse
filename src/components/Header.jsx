import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#livre", label: "Le livre" },
  { href: "#auteur", label: "Auteur" },
  { href: "#personnages", label: "Personnages" },
  { href: "#resume", label: "Résumé" },
  { href: "#themes", label: "Thèmes" },
];

const SCROLL_OFFSET = 120;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const updateActive = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.4;
      const nearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20;
      const lastNavId = NAV_LINKS[NAV_LINKS.length - 1].href.slice(1);

      let current = "";
      for (const { href } of NAV_LINKS) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= viewportMid) current = id;
      }
      setActiveId(nearBottom ? lastNavId : current);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b-2 border-gold/90 shadow-md"
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16">
          <a
            href="#"
            className="font-cinzel text-pirate text-lg md:text-xl font-bold tracking-wide hover:text-wood transition-colors"
            aria-label="Retour en haut — La Piratesse"
          >
            La Piratesse
          </a>

          <nav className="hidden md:flex items-center gap-5" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeId === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={`font-mono text-sm font-medium transition-colors rounded-lg px-2 py-1 hover:bg-gold/20 ${isActive ? "text-pirate bg-gold/20" : "text-ink hover:text-pirate"}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-ink hover:text-pirate rounded-lg hover:bg-gold/20 transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Menu mobile : tiroir depuis la droite (z au-dessus du header) */}
      <div
        id="mobile-menu"
        className="md:hidden fixed inset-0 z-[60] pointer-events-none"
        aria-hidden={!menuOpen}
      >
        {/* Fond assombri — clic = fermer */}
        <button
          type="button"
          className="absolute inset-0 bg-ink/50 transition-opacity duration-300 ease-out"
          style={{
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          onClick={closeMenu}
          aria-label="Fermer le menu"
        />

        {/* Panneau coulissant depuis la droite */}
        <aside
          className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-cream border-l-2 border-gold shadow-[0_0_40px_rgba(26,26,26,0.15)] flex flex-col transition-transform duration-300 ease-out"
          style={{
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          aria-label="Menu de navigation"
        >
          <div className="flex items-center justify-between p-4 border-b-2 border-gold/50">
            <span className="font-cinzel text-pirate font-bold text-lg">Menu</span>
            <button
              type="button"
              className="p-2 text-ink hover:text-pirate rounded-lg hover:bg-gold/20 transition-colors"
              onClick={closeMenu}
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-1 overflow-auto" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeId === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={`font-mono font-medium py-3 px-3 rounded-lg transition-colors ${isActive ? "text-pirate bg-gold/20" : "text-ink hover:text-pirate hover:bg-gold/20"}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}
