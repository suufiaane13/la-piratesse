import { useScrollReveal } from "../hooks/useScrollReveal";
import { moral } from "../data/content";
import HighlightedText from "./HighlightedText";

export default function Moral() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="citation"
      ref={ref}
      className={`w-full pt-16 pb-8 bg-gold/10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      aria-labelledby="moral-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-1 w-24 mx-auto mb-6 bg-gold rounded-full" aria-hidden />
          <blockquote>
            <p
              id="moral-title"
              className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-pirate leading-relaxed font-medium"
            >
              « <HighlightedText text={moral} /> »
            </p>
          </blockquote>
          <div className="h-1 w-24 mx-auto mt-6 bg-gold rounded-full" aria-hidden />
        </div>
      </div>
    </section>
  );
}
