/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENABLE_SOURCEMAP?: 'true' | 'false';
    readonly BUILD_TARGET?: 'ssr' | 'browser';
    readonly NODE_ENV?: 'development' | 'production';
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  