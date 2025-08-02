export {};

declare global {
  interface Window {
      scapp: {
        backendUrl: string;
      }
  }
}
