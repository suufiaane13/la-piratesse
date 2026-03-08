import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { themes, moral } from "../data/content";
import HighlightedText from "./HighlightedText";

export default function Themes() {
  const [openId, setOpenId] = useState(themes[0]?.id ?? null);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="themes"
      ref={ref}
      className={`w-full py-10 md:py-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      aria-labelledby="themes-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="themes-title"
          className="font-cinzel text-2xl md:text-3xl text-pirate text-center mb-8 font-bold"
        >
          Thèmes & messages
        </h2>

        <div
          className={`grid gap-4 items-start transition-all duration-300 grid-cols-1 md:grid-cols-2 ${openId ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}
        >
        {themes.map((theme, index) => {
          const isOpen = openId === theme.id;
          const openIndex = openId ? themes.findIndex((t) => t.id === openId) : -1;
          const n = themes.length;
          const isFifth = index === 4;
          const spanTwo = !openId && (isOpen || isFifth);
          const gridPlacement =
            openIndex >= 0
              ? index === openIndex
                ? "lg:col-start-1 lg:row-start-1 lg:row-span-2"
                : index === (openIndex + 1) % n
                  ? "lg:col-start-2 lg:row-start-1"
                  : index === (openIndex + 2) % n
                    ? "lg:col-start-2 lg:row-start-2"
                    : index === (openIndex + 3) % n
                      ? "lg:col-start-1 lg:row-start-3"
                      : index === (openIndex + 4) % n
                        ? "lg:col-start-2 lg:row-start-3"
                        : ""
              : spanTwo
                ? "lg:col-span-2"
                : "";
          return (
            <article
              key={theme.id}
              className={`rounded-2xl border-2 border-gold overflow-hidden bg-cream shadow-md hover:shadow-lg transition-all duration-300 ${gridPlacement}`}
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 p-4 text-left font-playfair italic text-ink hover:bg-gold/20 transition-colors rounded-t-2xl"
                onClick={() => setOpenId(isOpen ? null : theme.id)}
                aria-expanded={isOpen}
                aria-controls={`theme-${theme.id}`}
              >
                <span className="flex-shrink-0 font-mono text-sm font-bold text-pirate w-6" aria-hidden>{index + 1}.</span>
                <span className="text-2xl" aria-hidden>{theme.icon}</span>
                <span className="flex-1 font-semibold">{theme.title}</span>
                <span className="ml-auto text-pirate font-bold text-lg">{isOpen ? "−" : "+"}</span>
              </button>
              <div
                id={`theme-${theme.id}`}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px]" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 font-lora text-sm text-ink">
                  <HighlightedText text={theme.content} />
                </div>
              </div>
            </article>
          );
        })}
        </div>

        <p className="mt-8 text-center">
          <span className="font-playfair italic text-sm sm:text-base text-ink/90">
            « <HighlightedText text={moral} /> »
          </span>
        </p>
      </div>
    </section>
  );
}
