import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'] // Add list reporter for console output
  ],
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
    // New in v1.49.0: 'on-first-failure' option for screenshot
    screenshot: 'on-first-failure',
  },
  
  // New in v1.49.0: Can use 'chromium' channel to opt into the new headless mode
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-new-headless',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chromium', // Opt into new headless mode
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // New in v1.49: Enhanced snapshot options
  expect: {
    // Configure snapshot options
    toMatchSnapshot: {
      // New maxDiffPixelRatio option
      maxDiffPixelRatio: 0.05
    },
    timeout: 5000
  },
  
  // New in v1.49: Specify a single tsconfig for all tests
  tsconfig: path.join(__dirname, '../tsconfig.json'),
  
  // New in v1.49: Support for multiple global setup and teardown files
  globalSetup: [
    './global-setup-1.ts',
    './global-setup-2.ts',
  ],
  globalTeardown: [
    './global-teardown-1.ts',
    './global-teardown-2.ts',
  ],
  
  // Useful for debugging
  timeout: 30000,
}); 