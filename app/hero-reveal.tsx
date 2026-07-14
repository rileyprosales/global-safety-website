
"use client";

import { useCallback, useState, type CSSProperties, type PointerEvent } from "react";

type RevealStyle = CSSProperties & { "--reveal": string };

export function HeroReveal() {
  const [reveal, setReveal] = useState(52);

  const updateFromPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && event.buttons === 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const next = ((event.clientX - bounds.left) / bounds.width) * 100;
    setReveal(Math.max(8, Math.min(92, next)));
  }, []);

  return (
    <div
      className="readiness-reveal"
      data-reveal
      role="img"
      aria-label="Interactive portrait showing a safety instructor becoming work-ready with a hard hat and safety glasses"
      tabIndex={0}
      style={{ "--reveal": `${reveal}%` } as RevealStyle}
      onPointerMove={updateFromPointer}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setReveal((value) => Math.max(8, value - 8));
        if (event.key === "ArrowRight") setReveal((value) => Math.min(92, value + 8));
        if (event.key === "Enter" || event.key === " ") setReveal((value) => (value > 50 ? 15 : 85));
      }}
    >
      <img className="reveal-base" src="/hero-unprepared.webp" alt="" />
      <div className="reveal-ready" aria-hidden="true"><img src="/hero-prepared.webp" alt="" /></div>
      <div className="reveal-shade" aria-hidden="true" />
      <div className="reveal-handle" aria-hidden="true"><span><i /><i /></span></div>
      <p className="reveal-instruction"><span>Move</span> to reveal readiness</p>
      <span className="reveal-state reveal-state-before">Everyday</span>
      <span className="reveal-state reveal-state-after">Ready</span>
    </div>
  );
}

