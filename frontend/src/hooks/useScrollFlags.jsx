// useScrollFlags.js (or inline in the component)
import { useEffect, useState } from "react";

export function useScrollFlags(ref) {
  const [flags, setFlags] = useState({
    inView: false,      // any part visible
    fullyOut: false,    // completely outside viewport
    past: false,        // fully scrolled past (above viewport)
    before: false,      // not reached yet (below viewport)
    ratio: 0,           // 0..1 visible fraction
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const inView = ratio > 0;
        const viewportH = entry.rootBounds?.height ?? window.innerHeight;
        const { top, bottom } = entry.boundingClientRect;

        const past = bottom <= 0;           // element entirely above
        const before = top >= viewportH;    // element entirely below
        const fullyOut = !inView && (past || before);

        setFlags({ inView, fullyOut, past, before, ratio });
      },
      { root: null, threshold: [0, 0.01, 0.5, 0.99, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return flags;
}
