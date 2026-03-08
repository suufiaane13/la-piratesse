import { useScrollReveal } from "../hooks/useScrollReveal";
import { author, louiseAntonini } from "../data/content";
import HighlightedText from "./HighlightedText";

export default function AuthorSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="auteur"
      ref={ref}
      className={`w-full py-10 md:py-14 bg-gold/10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      aria-labelledby="author-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="author-title"
          className="font-cinzel text-2xl md:text-3xl text-pirate text-center mb-8 font-bold"
        >
          Auteur & inspiratrice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <article className="p-6 rounded-2xl border-2 border-gold bg-gold/10 text-ink shadow-md text-center">
          <span className="font-mono text-xs text-ink uppercase tracking-wider font-bold">
            {author.badge}
          </span>
          <h3 className="font-playfair italic text-xl text-pirate font-bold mt-2">{author.name}</h3>
          <p className="font-lora text-sm text-ink mt-4">
            <HighlightedText text={author.description} />
          </p>
        </article>

        <article className="p-6 rounded-2xl border-2 border-gold bg-gold/10 text-ink shadow-md text-center">
          <span className="font-mono text-xs text-ink uppercase tracking-wider font-bold">
            {louiseAntonini.badge}
          </span>
          <h3 className="font-playfair italic text-xl text-pirate font-bold mt-2">{louiseAntonini.name}</h3>
          <p className="font-lora text-sm text-ink mt-4">
            <HighlightedText text={louiseAntonini.description} />
          </p>
        </article>
        </div>
      </div>
    </section>
  );
}
