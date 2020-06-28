declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'app' {
  export interface Photo {
    dominantColor: string;
    id: string;
    thumbnails: Thumbnail[];
    url: string;
  }

  export interface Thumbnail {
    id: string;
    height: number;
    url: string;
    width: number;
  }
}
