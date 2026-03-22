export const defaultConfig = {
  appName: 'ShelfOS',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
};

export type AppConfig = typeof defaultConfig;
