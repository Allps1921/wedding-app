"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** id da section alvo (sem #) para onde a seta deve rolar */
  targetId: string;
  /** tempo de inatividade, em ms, até a seta aparecer */
  idleMs?: number;
};

export default function ScrollNudge({ targetId, idleMs = 10000 }: Props) {
  const [visible, setVisible] = useState(false);
  const [alreadySeen, setAlreadySeen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Uma vez que a section alvo já foi vista, não mostra mais a dica.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAlreadySeen(true);
          setVisible(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  useEffect(() => {
    if (alreadySeen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    function resetTimer() {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
      timerRef.current = setTimeout(() => setVisible(true), idleMs);
    }

    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "mousemove",
      "touchstart",
      "keydown",
      "click",
    ];

    events.forEach((ev) => window.addEventListener(ev, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [alreadySeen, idleMs]);

  if (alreadySeen || !visible) return null;

  return (
    <a
      href={`#${targetId}`}
      className="scroll-nudge"
      aria-label="Descer para ver mais informações"
      onClick={() => setVisible(false)}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 9l8 8 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}