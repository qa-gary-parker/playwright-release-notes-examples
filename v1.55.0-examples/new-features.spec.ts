import { test, expect } from '@playwright/test';

test.describe('Playwright v1.55.0 New Features', () => {

  // Feature: testStepInfo.titlePath property
  // Returns the full title path from the test file to the current step.
  // Useful for generating custom reports or debugging nested steps.
  // https://playwright.dev/docs/release-notes#version-155
  test('testStepInfo.titlePath returns full path from test file', async ({ page }) => {
    await page.goto('https://example.com');

    await test.step('Parent step', async () => {
      await test.step('Child step', async () => {
        await test.step('Grandchild step', async (stepInfo) => {
          // The titlePath property returns an array of all step titles
          // from the test file level down to the current step
          const titlePath = stepInfo.titlePath;

          // Expected format: [describe block, test name, step1, step2, step3]
          console.log('Title path:', titlePath);

          // Verify the structure
          expect(titlePath.length).toBeGreaterThan(0);
          expect(titlePath).toContain('Playwright v1.55.0 New Features');
          expect(titlePath).toContain('testStepInfo.titlePath returns full path from test file');
          expect(titlePath).toContain('Parent step');
          expect(titlePath).toContain('Child step');
          expect(titlePath).toContain('Grandchild step');

          // The titlePath is particularly useful for:
          // - Custom logging systems that need the full context
          // - Generating hierarchical reports
          // - Debugging deeply nested test steps
        });
      });
    });
  });

  // Feature: Codegen automatic toBeVisible() assertions
  // When using codegen, Playwright now automatically generates toBeVisible()
  // assertions for elements that are checked for visibility.
  // This is a codegen/UI feature, so we demonstrate what it produces.
  test('example of codegen-generated toBeVisible assertions', async ({ page }) => {
    await page.goto('https://example.com');

    // When you use codegen (npx playwright codegen), it will now
    // automatically generate assertions like this:
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // This makes generated tests more robust by ensuring elements
    // are actually visible before interacting with them
    await expect(page.locator('body')).toBeVisible();
  });

  // Feature: Demonstrating titlePath with complex nesting
  test('complex nested steps showing titlePath utility', async ({ page }, testInfo) => {
    await page.goto('https://example.com');

    await test.step('Login flow', async () => {
      await test.step('Navigate to login', async () => {
        // Simulate navigation
        await page.waitForLoadState('domcontentloaded');
      });

      await test.step('Enter credentials', async () => {
        await test.step('Enter username', async (stepInfo) => {
          // At this point, titlePath would include all parent steps
          const path = stepInfo.titlePath;
          console.log('Username entry path:', path.join(' > '));

          // This helps identify exactly where you are in complex test flows
          expect(path).toContain('Login flow');
          expect(path).toContain('Enter credentials');
        });

        await test.step('Enter password', async (stepInfo) => {
          const path = stepInfo.titlePath;
          console.log('Password entry path:', path.join(' > '));

          // Each step maintains the full hierarchy
          expect(path).toContain('Enter credentials');
          expect(path).toContain('Enter password');
        });
      });

      await test.step('Submit form', async (stepInfo) => {
        const path = stepInfo.titlePath;
        // The path now shows we're in a different branch
        expect(path).toContain('Login flow');
        expect(path).toContain('Submit form');
        // But NOT in 'Enter credentials' anymore
        expect(path.slice(-1)[0]).toBe('Submit form');
      });
    });
  });

  // Feature: Using titlePath for custom reporting
  test('using titlePath for custom logging', async ({ page }) => {
    const stepLog: string[] = [];

    await test.step('Data validation', async () => {
      await test.step('Validate user input', async (stepInfo) => {
        // Build a custom log with full context
        const context = stepInfo.titlePath.join(' → ');
        stepLog.push(`Executing: ${context}`);

        await page.goto('https://example.com');
        await expect(page).toHaveTitle(/Example Domain/);
      });

      await test.step('Validate server response', async (stepInfo) => {
        const context = stepInfo.titlePath.join(' → ');
        stepLog.push(`Executing: ${context}`);

        // Perform some validation
        const title = await page.title();
        expect(title).toBeTruthy();
      });
    });

    // Verify we captured the full paths
    console.log('Step execution log:', stepLog);
    expect(stepLog.length).toBe(2);
    expect(stepLog[0]).toContain('Validate user input');
    expect(stepLog[1]).toContain('Validate server response');
  });

  // Feature: Integration with existing test patterns
  test('titlePath with test fixtures and page objects', async ({ page }) => {
    // In real-world scenarios, titlePath helps track execution through
    // page object methods and custom fixtures

    const performAction = async (actionName: string) => {
      await test.step(actionName, async (stepInfo) => {
        // Within page object methods, you can still access the full path
        const fullPath = stepInfo.titlePath;
        console.log(`Performing ${actionName} in context:`, fullPath.slice(-3));

        // This is valuable for debugging complex page object interactions
        expect(fullPath).toContain(actionName);
      });
    };

    await page.goto('https://example.com');
    await performAction('Click primary button');
    await performAction('Verify navigation');
  });
});
