import { useScrollReveal } from "../hooks/useScrollReveal";
import { characters } from "../data/content";
import HighlightedText from "./HighlightedText";

export default function Characters() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="personnages"
      ref={ref}
      className={`section-container bg-cream transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      aria-labelledby="characters-title"
    >
      <h2
        id="characters-title"
        className="font-cinzel text-2xl md:text-3xl text-pirate text-center mb-8 font-bold"
      >
        Personnages principaux
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-x-auto pb-4 md:overflow-visible md:pb-0">
        {characters.map((ch) => (
          <article
            key={ch.id}
            className="flex-shrink-0 w-full min-w-0 p-5 rounded-2xl border-2 border-gold bg-gold/10 text-ink shadow-md hover:shadow-xl hover:border-pirate/50 transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-2 mx-auto" aria-hidden>
              {ch.emoji}
            </div>
            <h3 className="font-playfair italic text-lg text-pirate font-bold">
              {ch.name}
              {ch.alias && (
                <span className="font-mono text-sm text-wood ml-2">
                  (alias {ch.alias})
                </span>
              )}
            </h3>
            <p className="font-mono text-sm text-ink font-medium mt-1">{ch.role}</p>
            <p className="font-lora text-sm text-ink mt-3">
              <HighlightedText text={ch.description} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
