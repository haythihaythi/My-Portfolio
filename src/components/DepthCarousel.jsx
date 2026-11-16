import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const DEFAULT_ITEMS = [
  { image: "https://picsum.photos/seed/depth1/800/1000", alt: "Slide 1" },
  { image: "https://picsum.photos/seed/depth2/800/1000", alt: "Slide 2" },
  { image: "https://picsum.photos/seed/depth3/800/1000", alt: "Slide 3" },
  { image: "https://picsum.photos/seed/depth4/800/1000", alt: "Slide 4" },
  { image: "https://picsum.photos/seed/depth5/800/1000", alt: "Slide 5" },
  { image: "https://picsum.photos/seed/depth6/800/1000", alt: "Slide 6" },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeItem = (item) =>
  typeof item === "string" ? { image: item, alt: "" } : item;

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = "#05060a",
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
}) => {
  const data = useMemo(
    () => (Array.isArray(items) ? items : []).map(normalizeItem),
    [items],
  );
  const count = data.length;

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const dragRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const autoTimerRef = useRef(null);
  const reducedRef = useRef(false);
  const [active, setActive] = useState(0);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  };

  const layout = useCallback((position) => {
    const config = cfgRef.current;
    const total = config.count;
    if (!total) return;
    const direction = config.tiltDirection === "left" ? -1 : 1;
    const scale = scaleRef.current;

    for (let index = 0; index < total; index += 1) {
      const element = cardRefs.current[index];
      if (!element) continue;

      let offset = index - position;
      if (config.loop && total > 1) {
        offset = ((offset % total) + total) % total;
        if (offset > total / 2) offset -= total;
      }

      const behind = Math.max(0, offset);
      const distance = Math.abs(offset);
      const shown = distance <= config.visibleCards + 0.5;
      const translateZ = -config.depth * offset;
      const translateX = direction * config.spread * offset;
      const rotateY = direction * config.tilt * clamp(offset, 0, 1);
      let opacity = offset < 0 ? Math.max(0, 1 + offset) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - behind * config.falloff);
      const blurPx =
        config.blur > 0
          ? Math.min(
              config.blur,
              (behind / Math.max(1, config.visibleCards)) * config.blur,
            )
          : 0;

      element.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      element.style.opacity = opacity.toFixed(3);
      element.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      element.style.zIndex = String(Math.round(2000 - offset * 20));
      element.style.pointerEvents =
        shown && opacity > 0.05 ? "auto" : "none";

      const overlay = overlayRefs.current[index];
      if (overlay) {
        overlay.style.opacity = clamp(
          behind * config.falloff * 1.25,
          0,
          0.86,
        ).toFixed(3);
      }
    }
  }, []);

  const notify = useCallback(
    (index) => {
      setActive(index);
      onChangeRef.current?.(index, data[index]);
    },
    [data],
  );

  const tweenTo = useCallback(
    (target, animate) => {
      tweenRef.current?.kill();
      const config = cfgRef.current;
      const proxy = { position: posRef.current };
      tweenRef.current = gsap.to(proxy, {
        position: target,
        duration: animate && !reducedRef.current ? config.duration / 1000 : 0,
        ease: config.ease,
        onUpdate: () => {
          posRef.current = proxy.position;
          layout(proxy.position);
        },
        onComplete: () => {
          const total = config.count;
          if (total > 0) posRef.current = ((posRef.current % total) + total) % total;
          layout(posRef.current);
        },
      });
    },
    [layout],
  );

  const setFocus = useCallback(
    (rawIndex, animate = true) => {
      const config = cfgRef.current;
      const total = config.count;
      if (!total) return;
      const index = config.loop
        ? ((rawIndex % total) + total) % total
        : clamp(rawIndex, 0, total - 1);
      let delta = index - posRef.current;
      if (config.loop && total > 1) {
        delta = ((delta % total) + total) % total;
        if (delta > total / 2) delta -= total;
      }
      tweenTo(posRef.current + delta, animate);
      if (index !== focusRef.current) {
        focusRef.current = index;
        notify(index);
      }
    },
    [notify, tweenTo],
  );

  const navigateBy = useCallback(
    (step) => setFocus(focusRef.current + step, true),
    [setFocus],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const config = cfgRef.current;
      const needed = config.cardWidth + Math.abs(config.spread) * 2 + 120;
      scaleRef.current = clamp(width / needed, 0.4, 1);
      layout(posRef.current);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return undefined;
    const onWheel = (event) => {
      const config = cfgRef.current;
      if (config.count < 2) return;
      event.preventDefault();
      tweenRef.current?.kill();
      const raw =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const delta = event.deltaMode === 1 ? raw * 24 : raw;
      posRef.current += clamp(delta / (config.cardWidth * 0.9), -0.6, 0.6);
      layout(posRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(
        () => setFocus(Math.round(posRef.current), true),
        130,
      );
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const onPointerDown = useCallback((event) => {
    if (cfgRef.current.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPosition: posRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
      id: event.pointerId,
    };
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      const config = cfgRef.current;
      const stepPx = Math.max(
        config.cardWidth * 0.55 * scaleRef.current,
        40,
      );
      const dx = event.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastTime, 1);
      drag.velocity = (event.clientX - drag.lastX) / dt;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      posRef.current = drag.startPosition - dx / stepPx;
      layout(posRef.current);
    },
    [layout],
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const config = cfgRef.current;
    const stepPx = Math.max(
      config.cardWidth * 0.55 * scaleRef.current,
      40,
    );
    setFocus(Math.round(posRef.current - (drag.velocity * 180) / stepPx), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateBy(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy],
  );

  const onCardClick = useCallback(
    (index) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
    },
    [setFocus],
  );

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!autoplay || reducedRef.current || count < 2) return undefined;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = window.setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(cfgRef.current.autoplayDelay, 600));
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [
    blur,
    cardHeight,
    cardWidth,
    count,
    depth,
    falloff,
    layout,
    radius,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
  ]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-[280px] w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:[outline-offset:4px] ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Depth carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        ref={stageRef}
      >
        {data.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden bg-[#0b0d12] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65),0_8px_20px_-10px_rgba(0,0,0,0.5)] [transform:translate(-50%,-50%)] [transform-origin:center] [will-change:transform,opacity,filter]"
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            style={{
              width: item.width ?? cardWidth,
              height: item.height ?? cardHeight,
              borderRadius: radius,
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={active !== index}
            onClick={() => onCardClick(index)}
          >
            <img
              className="pointer-events-none block h-full w-full select-none object-contain [-webkit-user-drag:none]"
              src={item.image}
              alt={item.alt || ""}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply"
              ref={(element) => {
                overlayRefs.current[index] = element;
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-[3000] grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[rgba(18,20,26,0.55)] text-white backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-white/40 hover:bg-[rgba(28,31,40,0.85)] active:scale-95"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-[3000] grid h-[42px] w-[42px] -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[rgba(18,20,26,0.55)] text-white backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-white/40 hover:bg-[rgba(28,31,40,0.85)] active:scale-95"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div
          className="absolute bottom-4 left-1/2 z-[3000] flex max-w-[85%] -translate-x-1/2 gap-1.5 overflow-x-auto rounded-full bg-[rgba(14,16,22,0.7)] px-3 py-2 backdrop-blur-sm"
          role="tablist"
          aria-label="Slides"
        >
          {data.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[7px] shrink-0 cursor-pointer rounded-full transition-[width,background] duration-[250ms] ${
                active === index ? "w-5 bg-white" : "w-[7px] bg-white/30"
              }`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
