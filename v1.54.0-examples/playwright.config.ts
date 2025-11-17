import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // New in v1.54: noSnippets option to disable code snippets in HTML reports
  // This reduces report size significantly
  reporter: [
    ['html', {
      title: 'v1.54.0 Features Test Run',
      open: 'never',
      // The noSnippets option removes code snippets from the HTML report
      noSnippets: true
    }],
    ['list']
  ],

  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
