declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'app' {
  export interface Photo {
    dominantColor: string;
    id: string;
    height: number;
    thumbnails: Thumbnail[];
    url: string;
    width: number;
  }

  export interface Thumbnail {
    id: string;
    type: 'BLUR' | 'NORMAL';
    url: string;
  }
}
