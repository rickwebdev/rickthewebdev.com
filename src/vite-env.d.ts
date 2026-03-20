/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IPINFO_TOKEN?: string;
  readonly VITE_SANITY_PROJECT_ID: string;
  readonly VITE_SANITY_DATASET: string;
  readonly VITE_SANITY_API_VERSION?: string;
  /** Only if the dataset is private */
  readonly VITE_SANITY_READ_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
