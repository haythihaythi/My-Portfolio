import type { CSSProperties, ReactElement } from "react";

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  resolution?: number;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  intensity?: number;
  viscosity?: number;
  persistence?: number;
  clickBurst?: boolean;
  bounceEdges?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  className?: string;
  style?: CSSProperties;
}

declare const LiquidEther: (props: LiquidEtherProps) => ReactElement;
export default LiquidEther;
