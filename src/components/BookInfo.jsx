import {
  BookOpen,
  User,
  Palette,
  Building2,
  Tag,
  Users,
  FileText,
} from "lucide-react";
import { bookInfo } from "../data/content";

const FIELDS = [
  { key: "title", label: "Titre", Icon: BookOpen },
  { key: "author", label: "Auteur", Icon: User },
  { key: "illustrator", label: "Illustrateur", Icon: Palette },
  { key: "publisher", label: "Éditeur", Icon: Building2 },
  { key: "pages", label: "Pages", Icon: FileText },
  { key: "audience", label: "Public", Icon: Users },
  { key: "genre", label: "Genre", Icon: Tag },
];

export default function BookInfo() {
  return (
    <section
      id="livre"
      className="section-container bg-cream"
      aria-labelledby="bookinfo-title"
    >
      <h2
        id="bookinfo-title"
        className="font-cinzel text-2xl md:text-3xl text-pirate text-center mb-8 font-bold"
      >
        Fiche du livre
      </h2>
      <div className="-mx-2 sm:-mx-3 md:-mx-4 lg:mx-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {FIELDS.map((field, index) => {
          const isLast = index === FIELDS.length - 1;
          const IconComponent = field.Icon;
          return (
            <article
              key={field.key}
              className={`min-w-0 p-3 sm:p-5 rounded-2xl border-2 border-gold/70 bg-gold/10 text-ink shadow-md hover:shadow-lg transition-shadow text-center ${isLast ? "col-span-2 md:col-span-3 lg:col-span-2" : ""}`}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-pirate flex-shrink-0" aria-hidden />
                <span className="font-mono text-xs sm:text-sm text-ink font-bold break-words">{field.label}</span>
              </div>
              <p className="font-lora text-xs sm:text-sm md:text-base font-medium break-words">{bookInfo[field.key]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
