import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4, // Global worker limit
  reporter: [
    ['html'],
    ['list'] // Add list reporter for console output
  ],
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
  },
  
  // New in v1.52: Project-specific worker counts
  projects: [
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      // This project gets 2 workers (half of global limit)
      testMatch: /.*\.parallel\.spec\.ts/,
      workers: '50%'
    },
    {
      name: 'chromium-serial',
      use: { ...devices['Desktop Chrome'] },
      // This project gets 1 worker for tests that need to run serially
      testMatch: /.*\.serial\.spec\.ts/,
      workers: 1
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

  // New in v1.52: Fail if any tests are flaky
  failOnFlakyTests: true,

  // Useful for debugging
  timeout: 30000,
  expect: {
    timeout: 5000
  },
}); 