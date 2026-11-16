/// <reference types="vite/client" />

// Vite's built-in client types only declare lowercase image extensions (*.jpg, *.png, etc.).
// This adds support for uppercase extensions commonly produced by cameras/phones.
declare module '*.JPG' {
  const src: string;
  export default src;
}

declare module '*.JPEG' {
  const src: string;
  export default src;
}

declare module '*.PNG' {
  const src: string;
  export default src;
}
