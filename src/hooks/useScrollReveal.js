import { useEffect, useRef, useState } from "react";

/**
 * Hook IntersectionObserver pour révéler les sections au scroll (PRD 2.5).
 * @param {Object} options - { rootMargin?: string, threshold?: number }
 * @returns {[React.RefObject, boolean]} - ref à attacher au nœud, isVisible
 */
export function useScrollReveal(options = {}) {
  const { rootMargin = "0px 0px -80px 0px", threshold = 0.1 } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}
