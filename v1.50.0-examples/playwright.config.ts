import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: [
    ['html'],
    ['list'] // Add list reporter for console output
  ],
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // New in v1.50.0: Project-specific snapshot settings
      snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-{arg}{ext}',
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

  // New in v1.50.0: Only update snapshots that have changed
  updateSnapshots: 'changed',

  // Useful for debugging
  timeout: 30000,
  expect: {
    timeout: 5000
  },
}); 