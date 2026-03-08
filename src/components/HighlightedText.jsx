import { useMemo, useState, useEffect, useLayoutEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { keyPhrases, glossaryEntries } from "../data/content";

const TYPE_CLASSES = {
  quote: "text-pirate font-semibold italic",
  moral: "text-pirate font-bold",
  concept: "text-ink font-medium bg-gold/30 rounded",
  name: "text-pirate font-semibold",
  place: "text-wood font-semibold",
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isLetter(c) {
  return /[\p{L}\p{M}]/u.test(c);
}

function extendToWordBounds(fullText, start, end) {
  while (start > 0 && isLetter(fullText[start - 1])) start--;
  while (end < fullText.length && isLetter(fullText[end])) end++;
  return { start, end, text: fullText.slice(start, end) };
}

function trimSegment(fullText, start, end) {
  let text = fullText.slice(start, end);
  const trimmedStart = text.replace(/^\s+/u, "");
  const lead = text.length - trimmedStart.length;
  const trimmedEnd = trimmedStart.replace(/\s+$/u, "");
  const trail = trimmedStart.length - trimmedEnd.length;
  if (lead > 0 || trail > 0) {
    start += lead;
    end -= trail;
    text = fullText.slice(start, end);
  }
  return { start, end, text };
}

/** Collecte tous les matchs (keyPhrases + glossaire), puis fusionne en segments non chevauchants. */
function getSegmentsWithGlossary(text, keyPhrasesList, glossaryList) {
  const fullText = typeof text === "string" ? text : "";
  const matches = [];

  const addMatches = (list, getPayload) => {
    const sorted = [...list].sort((a, b) => (b.phrase?.length ?? 0) - (a.phrase?.length ?? 0));
    for (const item of sorted) {
      const phrase = item.phrase;
      if (!phrase) continue;
      const escaped = escapeRegex(phrase);
      const re = new RegExp(escaped, "gi");
      let m;
      while ((m = re.exec(fullText)) !== null) {
        let run = extendToWordBounds(fullText, m.index, m.index + m[0].length);
        run = trimSegment(fullText, run.start, run.end);
        if (run.text.length === 0) continue;
        matches.push({
          start: run.start,
          end: run.end,
          text: run.text,
          ...getPayload(item),
        });
      }
    }
  };

  addMatches(keyPhrasesList || [], (item) => ({ type: item.type }));
  addMatches(glossaryList || [], (item) => ({ definition: item.definition }));

  matches.sort((a, b) => a.start - b.start);

  const merged = [];
  for (const m of matches) {
    const overlapping = merged.find((ex) => m.start < ex.end && m.end > ex.start);
    if (overlapping) {
      overlapping.type = overlapping.type ?? m.type;
      overlapping.definition = overlapping.definition ?? m.definition;
    } else {
      merged.push({ start: m.start, end: m.end, type: m.type, definition: m.definition, text: m.text });
    }
  }
  merged.sort((a, b) => a.start - b.start);

  const segments = [];
  let lastEnd = 0;
  for (const seg of merged) {
    if (seg.start > lastEnd) {
      segments.push({ type: null, definition: null, text: fullText.slice(lastEnd, seg.start) });
    }
    segments.push({ type: seg.type ?? null, definition: seg.definition ?? null, text: seg.text });
    lastEnd = seg.end;
  }
  if (lastEnd < fullText.length) {
    segments.push({ type: null, definition: null, text: fullText.slice(lastEnd) });
  }
  return segments.length ? segments : [{ type: null, definition: null, text: fullText }];
}

function GlossaryTooltip({ definition, children, className = "" }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, bottom: 0 });
  const triggerRef = useRef(null);
  const tooltipId = `glossary-${useId().replace(/:/g, "")}`;
  const touchedRef = useRef(false);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const margin = 6;
    setPosition({
      left: Math.max(8, Math.min(rect.left, window.innerWidth - 320)),
      bottom: window.innerHeight - rect.top + margin,
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnMove = () => setOpen(false);
    window.addEventListener("scroll", closeOnMove, { passive: true });
    window.addEventListener("resize", closeOnMove);
    return () => {
      window.removeEventListener("scroll", closeOnMove);
      window.removeEventListener("resize", closeOnMove);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let removeListener;
    const id = setTimeout(() => {
      const isOutside = (e) => {
        const target = e.target;
        if (triggerRef.current?.contains(target)) return false;
        const tooltip = document.getElementById(tooltipId);
        if (tooltip?.contains(target)) return false;
        return true;
      };
      const closeIfOutside = (e) => {
        if (isOutside(e)) setOpen(false);
      };
      document.addEventListener("click", closeIfOutside);
      document.addEventListener("touchend", closeIfOutside, { passive: true });
      document.addEventListener("touchstart", closeIfOutside, { passive: true, capture: true });
      removeListener = () => {
        document.removeEventListener("click", closeIfOutside);
        document.removeEventListener("touchend", closeIfOutside);
        document.removeEventListener("touchstart", closeIfOutside, { capture: true });
      };
    }, 0);
    return () => {
      clearTimeout(id);
      removeListener?.();
    };
  }, [open, tooltipId]);

  const tooltipEl =
    open && typeof document !== "undefined" ? (
      <span
        id={tooltipId}
        role="tooltip"
        className="fixed z-[9999] w-72 max-w-[90vw] rounded-lg border-2 border-gold bg-cream px-3 py-2 text-left text-sm font-normal text-ink shadow-lg"
        style={{
          left: position.left,
          bottom: position.bottom,
        }}
      >
        {definition}
      </span>
    ) : null;

  return (
    <span
      className={`relative inline ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          touchedRef.current = true;
          setOpen((o) => !o);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (touchedRef.current) {
            touchedRef.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="cursor-help border-b border-dotted border-pirate/70 hover:border-pirate touch-manipulation"
        style={{ WebkitTapHighlightColor: "transparent" }}
        aria-describedby={open ? tooltipId : undefined}
      >
        {children}
      </span>
      {tooltipEl && createPortal(tooltipEl, document.body)}
    </span>
  );
}

/**
 * Affiche un texte avec surlignage (couleurs par type) et tooltip au survol pour le glossaire.
 */
export default function HighlightedText({ text, className = "" }) {
  const segments = useMemo(
    () => getSegmentsWithGlossary(text, keyPhrases, glossaryEntries),
    [text]
  );

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        const content = seg.type ? (
          <span className={TYPE_CLASSES[seg.type] ?? "text-gold"}>{seg.text}</span>
        ) : (
          seg.text
        );
        if (seg.definition) {
          return (
            <GlossaryTooltip key={i} definition={seg.definition} className={seg.type ? "" : ""}>
              {content}
            </GlossaryTooltip>
          );
        }
        return <span key={i}>{content}</span>;
      })}
    </span>
  );
}
