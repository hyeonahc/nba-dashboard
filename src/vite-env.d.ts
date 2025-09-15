/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASKETBALL_API_URL: string
  readonly VITE_BASKETBALL_API_KEY: string
  readonly VITE_BALLDONTLIE_API_URL: string
  readonly VITE_BALLDONTLIE_API_KEY: string
  readonly VITE_NEWS_API_URL: string
  readonly VITE_NEWS_API_KEY: string
  readonly VITE_NEWS_API_HOST: string
  readonly VITE_VIDEO_API_URL: string
  readonly VITE_YOUTUBE_API_KEY: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
