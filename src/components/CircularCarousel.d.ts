import type { CSSProperties, ReactNode } from "react";

export type CircularCarouselSkill = {
  name: string;
  image: string;
  color: string;
};

type CircularCarouselProps = {
  items?: CircularCarouselSkill[];
  preset?: "cylinder" | "orbit" | "wheel" | "panorama";
  autoplay?: "off" | "drift" | "fast";
  speed?: number;
  interval?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  intro?: "assemble" | "rise" | "spin" | "none";
  fadeColor?: string;
  innerShade?: number;
  cornerRadius?: number;
  renderItem?: (item: CircularCarouselSkill, index: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
};

declare const CircularCarousel: (props: CircularCarouselProps) => ReactNode;

export default CircularCarousel;
