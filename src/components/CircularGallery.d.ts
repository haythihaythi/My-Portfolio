interface CircularGalleryItem {
  image: string;
  text?: string;
}

interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  itemSize?: number;
  itemAspect?: number;
  gap?: number;
  wave?: number;
  fadeEdges?: number;
  shadow?: number;
  grayscale?: boolean;
  showTitles?: boolean;
  snap?: boolean;
  autoScroll?: number;
  openOnClick?: boolean;
  intro?: boolean;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
}

declare const CircularGallery: (props: CircularGalleryProps) => JSX.Element;
export default CircularGallery;
