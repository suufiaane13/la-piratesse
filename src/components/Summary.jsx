import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { summaryIntro, summaryActs } from "../data/content";
import HighlightedText from "./HighlightedText";

export default function Summary() {
  const [expandedId, setExpandedId] = useState(summaryActs[0]?.id ?? null);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="resume"
      ref={ref}
      className={`w-full py-10 md:py-14 bg-gold/10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      aria-labelledby="summary-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="summary-title"
          className="font-cinzel text-2xl md:text-3xl text-pirate text-center mb-6 font-bold"
        >
          Résumé
        </h2>
        <p className="font-lora text-ink text-center max-w-2xl mx-auto mb-10 text-base">
          <HighlightedText text={summaryIntro} />
        </p>

        <div
        className={`grid gap-4 items-start transition-all duration-300 grid-cols-1 md:grid-cols-2 ${expandedId ? "md:grid-cols-2 lg:grid-cols-2" : "lg:grid-cols-3"}`}
      >
        {summaryActs.map((act, index) => {
          const isOpen = expandedId === act.id;
          const openIndex = expandedId ? summaryActs.findIndex((a) => a.id === expandedId) : -1;
          const n = summaryActs.length;
          const isFourth = index === 3;
          const spanTwo = !expandedId && (isOpen || isFourth);
          const gridPlacement =
            openIndex >= 0
              ? index === openIndex
                ? "md:col-start-1 md:row-start-1 md:row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2"
                : index === (openIndex + 1) % n
                  ? "md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1"
                  : index === (openIndex + 2) % n
                    ? "md:col-start-2 md:row-start-2 lg:col-start-2 lg:row-start-2"
                    : index === (openIndex + 3) % n
                      ? "md:col-start-1 md:row-start-3 lg:col-start-1 lg:row-start-3"
                      : index === (openIndex + 4) % n
                        ? "md:col-start-2 md:row-start-3 lg:col-start-2 lg:row-start-3"
                        : ""
              : spanTwo
                ? "lg:col-span-2"
                : "";
          return (
            <article
              key={act.id}
              className={`rounded-2xl border-2 border-gold overflow-hidden bg-cream shadow-md hover:shadow-lg transition-all duration-300 ${gridPlacement}`}
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 p-4 text-left font-playfair italic text-ink hover:bg-gold/20 transition-colors rounded-t-2xl"
                onClick={() => setExpandedId(isOpen ? null : act.id)}
                aria-expanded={isOpen}
                aria-controls={`summary-${act.id}`}
              >
                <span className="flex-shrink-0 font-mono text-sm font-bold text-pirate w-6" aria-hidden>{index + 1}.</span>
                <span className="text-2xl" aria-hidden>{act.icon}</span>
                <span className="font-semibold">{act.title}</span>
                <span className="ml-auto text-pirate font-bold text-lg">{isOpen ? "−" : "+"}</span>
              </button>
              <div
                id={`summary-${act.id}`}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 font-lora text-sm text-ink">
                  <HighlightedText text={act.content} />
                </div>
              </div>
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
}
