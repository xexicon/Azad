// VerticalBeforeAfter_DIAG.jsx
import React, { useRef, useState, useEffect } from "react";
import RocketFull from "../assets/RocketFull.svg";
import RocketSkel from "../assets/RocketSkel.svg";

export default function VerticalBeforeAfter() {
  const boxRef = useRef(null);
  const dragging = useRef(false);
  const [y, setY] = useState(60); // handle position (0..100) from TOP
  const EDGE = 8;

  /** ---------- ALIGNMENT CONTROLS ---------- */
  const SCALE = 2.5;   // 1 = 100% width; 2.5 = 250%
  const DX_TOP = 0;    // + = nudge skeleton to the RIGHT
  const DX_BOTTOM = 0; // + = nudge full to the RIGHT
  const DY_TOP = 0;    // + = nudge skeleton DOWN
  const DY_BOTTOM = 0; // + = nudge full DOWN
  /** --------------------------------------- */

  /** ---------- SLIDER HIT AREA (mouse hover zone) ---------- */
  const HIT_PX = 44; // total height of the interactive stripe (line + triangles)
  /** ------------------------------------------------------- */

  const toUrl = (v) => (typeof v === "string" ? v : v?.src || "");
  const topUrl = toUrl(RocketSkel);
  const botUrl = toUrl(RocketFull);

  // map clientY to 0..100 within the box (with padding)
  const clientYToPct = (clientY) => {
    const el = boxRef.current;
    if (!el) return y;
    const r = el.getBoundingClientRect();
    const clamped = Math.min(r.bottom - EDGE, Math.max(r.top + EDGE, clientY));
    const pct = ((clamped - r.top) / r.height) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  // Container only updates while dragging (for touch/pen or mouse drag)
  const onContainerMove = (e) => {
    if (dragging.current) setY(clientYToPct(e.clientY));
  };
  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  // Hover scrubbing ONLY when the mouse is over the slider stripe
  const onStripeMove = (e) => {
    if (e.pointerType === "mouse") setY(clientYToPct(e.clientY));
  };

  useEffect(() => {
    const stop = () => (dragging.current = false);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  // Keyboard a11y on the handle
  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      setY((p) => Math.max(0, p - (e.key === "PageUp" ? 10 : 2)));
    } else if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      setY((p) => Math.min(100, p + (e.key === "PageDown" ? 10 : 2)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setY(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setY(100);
    }
  };

  // Split reveal
  const botClip = `inset(${y}% 0 0 0)`;        // bottom only BELOW line
  const topClip = `inset(0 0 ${100 - y}% 0)`;  // top only ABOVE line

  // Common background layer style (identical scale & anchor)
  const layerBase = {
    position: "absolute",
    inset: 0,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${SCALE * 100}% 100%`,
    backgroundPosition: "50% 0",
    pointerEvents: "none",
    userSelect: "none",
    willChange: "clip-path",
  };

  // Stripe top = center the hit area around the handle
  const stripeTop = `calc(${y}% - ${HIT_PX / 2}px)`;

  return (
    <div
      ref={boxRef}
      onPointerMove={onContainerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative isolate z-[60]"
      style={{ width: 263, height: 1532, background: "#000" }}
    >
      {/* Bottom layer (below line) with per-layer offsets */}
      <div
        style={{
          ...layerBase,
          clipPath: botClip,
          backgroundImage: `url(${botUrl})`,
          backgroundPosition: `calc(50% + ${DX_BOTTOM}px) ${DY_BOTTOM}px`,
        }}
      />
      {/* Top layer (above line) with per-layer offsets */}
      <div
        style={{
          ...layerBase,
          clipPath: topClip,
          backgroundImage: `url(${topUrl})`,
          backgroundPosition: `calc(50% + ${DX_TOP}px) ${DY_TOP}px`,
        }}
      />

      {/* ======= INTERACTIVE STRIPE (mouse hover zone) ======= */}
      <div
        // full-width, fixed-height stripe centered on the handle
        className="absolute left-0 right-0 cursor-pointer"
        style={{ top: stripeTop, height: HIT_PX }}
        onPointerMove={onStripeMove}  // <-- hover scrubbing only inside stripe
        onPointerDown={onPointerDown} // start drag (mouse/touch/pen)
      >
        {/* line centered inside the stripe */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white" />
        {/* triangles centered inside the stripe */}
        <div
          role="slider"
          aria-label="Reveal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(y)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "calc(50% - 1px)" }}
        >
          {/* Up triangle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white" />
          {/* Down triangle */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />
        </div>
      </div>
      {/* ===================================================== */}
    </div>
  );
}
