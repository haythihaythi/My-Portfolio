interface TechTextProps {
  text?: string;
  fontWeight?: number;
  fontSize?: number;
  reveal?: "letter" | "word" | "line" | "none";
  dashLength?: number;
  dashGap?: number;
  specks?: number;
  intro?: string;
  introDuration?: number;
  clickKick?: boolean;
  guides?: boolean;
  fontFamily?: string;
  letterSpacing?: number;
  accentColor?: string;
  reach?: number;
  softness?: number;
  lineStyle?: string;
  strokeWidth?: number;
  speed?: number;
  bounce?: number;
  selection?: boolean;
  labels?: boolean;
  color?: string;
  align?: "left" | "center" | "right";
  draggable?: boolean;
  sweep?: boolean;
}

declare const TechText: (props: TechTextProps) => JSX.Element;
export default TechText;
