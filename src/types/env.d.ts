/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
