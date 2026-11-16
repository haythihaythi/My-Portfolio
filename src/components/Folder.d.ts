interface FolderItem {
  title: string;
  image?: string;
}

interface FolderProps {
  items: FolderItem[];
  label?: string;
  mode?: "book" | "flap";
  variant?: "solid" | "glass";
  color?: string;
  paperColor?: string;
  tabPosition?: "left" | "center" | "right";
  layout?: "spread";
  size?: number;
  openOn?: "click" | "hover";
  peek?: boolean;
  draggable?: boolean;
  zoomOnClick?: boolean;
  intro?: boolean;
  tilt?: number;
  bounce?: number;
  speed?: number;
  theme?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
  onItemClick?: (item: FolderItem, index: number) => void;
}

declare const Folder: (props: FolderProps) => JSX.Element;
export default Folder;
