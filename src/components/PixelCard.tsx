import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import "./PixelCard.css";

type PixelCardProps = {
  children: ReactNode;
  colors?: string[];
  glowColor?: string;
  gap?: number;
  pixelSize?: number;
  speed?: number;
  revealDuration?: number;
  spotlight?: number;
  glow?: number;
  opacity?: number;
  fade?: number;
  trigger?: "hover" | "always";
  radius?: number;
  clickPulse?: boolean;
  intro?: boolean;
  theme?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
};

export default function PixelCard({
  children,
  colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"],
  glowColor = "#cbd5e1",
  gap = 5,
  pixelSize = 2,
  revealDuration = 600,
  speed = 35,
  spotlight = 0.5,
  glow = 0.5,
  opacity = 0.35,
  fade = 0.7,
  trigger = "hover",
  radius = 24,
  clickPulse = false,
  intro = false,
  theme = "dark",
  className = "",
  style,
}: PixelCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const revealRef = useRef(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let active = intro || trigger === "always";
    if (active) canvas.dataset.startedAt = String(performance.now());

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      active = intro || trigger === "always" || canvas.dataset.active === "true";
      context.clearRect(0, 0, width, height);
      const cell = pixelSize + gap;
      const startedAt = Number(canvas.dataset.startedAt ?? now);
      const progress = Math.min(1, (now - startedAt) / revealDuration);
      const reveal = active ? progress : 0;
      const pointerX = Number(canvas.dataset.pointerX ?? -1000);
      const pointerY = Number(canvas.dataset.pointerY ?? -1000);

      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const centerDistance = Math.hypot(x - width / 2, y - height / 2);
          const maxDistance = Math.hypot(width / 2, height / 2);
          const threshold = active ? centerDistance / maxDistance : 1.2;
          const phase = (x * 17 + y * 31) % (speed * 5);
          const wave = (Math.sin((now / (1000 / speed)) + phase) + 1) / 2;
          const pointerDistance = Math.hypot(x - pointerX, y - pointerY);
          const pointerGlow = Math.max(0, 1 - pointerDistance / 110) * spotlight;

          if (threshold > reveal + 0.16) continue;
          const index = Math.abs(Math.floor((x + y) / cell) + phase) % colors.length;
          context.globalAlpha = Math.max(0.08, opacity * (wave * fade + pointerGlow));
          context.fillStyle = colors[index];
          context.fillRect(x, y, pixelSize, pixelSize);
        }
      }

      context.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [colors, fade, gap, intro, opacity, pixelSize, revealDuration, speed, spotlight, trigger]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || trigger !== "hover") return;
    const bounds = canvas.getBoundingClientRect();
    if (!revealRef.current) revealRef.current = true;
    revealRef.current = true;
    const start = (canvas as HTMLCanvasElement & { __start?: number }).__start;
    if (start === undefined) {
      (canvas as HTMLCanvasElement & { __start?: number }).__start = performance.now();
    }
    canvas.dataset.pointerX = String(event.clientX - bounds.left);
    canvas.dataset.pointerY = String(event.clientY - bounds.top);
  };

  const handlePointerEnter = () => {
    setIsActive(true);
    revealRef.current = true;
    const canvas = canvasRef.current;
    if (canvas) {
      (canvas as HTMLCanvasElement & { __start?: number }).__start = performance.now();
      canvas.dataset.active = "true";
      canvas.dataset.startedAt = String(performance.now());
    }
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    if (canvasRef.current) {
      canvasRef.current.dataset.active = "false";
      canvasRef.current.dataset.pointerX = "-1000";
      canvasRef.current.dataset.pointerY = "-1000";
    }
  };

  const handleClick = () => {
    if (clickPulse) setPulseKey((key) => key + 1);
  };

  return (
    <div
      className={`pixel-card pixel-card--${theme} ${className}`}
      style={{ ...style, "--pixel-card-radius": `${radius}px`, "--pixel-glow": glowColor, "--pixel-glow-strength": glow } as React.CSSProperties}
      data-theme={theme}
      data-active={isActive ? "" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      key={`${pulseKey}`}
    >
      <canvas ref={canvasRef} className="pixel-card-canvas" aria-hidden="true" />
      <div className="pixel-card__content">{children}</div>
    </div>
  );
}
