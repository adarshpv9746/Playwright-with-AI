import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',

  use: {
    baseURL: 'https://example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
   {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});