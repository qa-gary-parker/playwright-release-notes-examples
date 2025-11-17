import { test, expect } from '@playwright/test';

test.describe('Playwright v1.54.0 New Features', () => {

  // Feature: Cookie Partitioning with partitionKey
  // Adds support for CHIPS (Cookies Having Independent Partitioned State) cookies.
  // The new `partitionKey` property allows setting and getting partitioned cookies.
  // https://playwright.dev/docs/release-notes#version-154
  test('cookie partitioning with partitionKey for CHIPS cookies', async ({ context, page }) => {
    // Navigate to a page
    await page.goto('https://example.com');

    // Add a partitioned cookie using the new partitionKey property
    // This is useful for cookies that should be partitioned by top-level site
    await context.addCookies([{
      name: 'session_id',
      value: 'abc123',
      domain: 'example.com',
      path: '/',
      // The partitionKey enables cookie partitioning (CHIPS)
      partitionKey: {
        topLevelSite: 'https://example.com'
      }
    }]);

    // Retrieve cookies and verify the partitioned cookie
    const cookies = await context.cookies();
    const partitionedCookie = cookies.find(c => c.name === 'session_id');

    expect(partitionedCookie).toBeDefined();
    expect(partitionedCookie?.value).toBe('abc123');
    expect(partitionedCookie?.partitionKey).toBeDefined();
    expect(partitionedCookie?.partitionKey?.topLevelSite).toBe('https://example.com');
  });

  // Feature: HTML Reporter noSnippets option
  // Adds ability to disable code snippets in HTML reports to reduce report size.
  // This is demonstrated in the playwright.config.ts file.
  test('HTML reporter configuration with noSnippets', async ({ page }) => {
    // This test exists to verify the configuration works
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);

    // When this test runs with the noSnippets option enabled,
    // the HTML report will not include code snippets for failed tests
  });

  // Feature: Annotation location property
  // The annotation object now includes a location property that shows
  // the file and line where the annotation was added.
  // https://playwright.dev/docs/api/class-teststep#test-step-annotations
  test('annotation location property shows where annotation was added', async ({ page }, testInfo) => {
    // Add a test annotation
    testInfo.annotations.push({
      type: 'issue',
      description: 'Related to bug #12345'
    });

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);

    // After the test runs, you can inspect testInfo.annotations
    // Each annotation will now have a `location` property that includes:
    // - file: the test file path
    // - line: the line number where the annotation was added
    // - column: the column number

    // This is particularly useful in reporters and for debugging
    const annotation = testInfo.annotations.find(a => a.type === 'issue');
    expect(annotation).toBeDefined();
    expect(annotation?.description).toBe('Related to bug #12345');
    // The location is automatically added by Playwright
  });

  // Feature: --user-data-dir command line option
  // Allows reusing browser state across test runs using the CLI.
  // This is a CLI feature demonstrated in README.md
  test('user data directory for state reuse', async ({ page }) => {
    // This test can be run with: npx playwright test --user-data-dir=/path/to/data
    // The browser will persist state (cookies, localStorage, etc.) to that directory

    await page.goto('https://example.com');

    // Set some local storage
    await page.evaluate(() => {
      localStorage.setItem('test-key', 'test-value');
    });

    const value = await page.evaluate(() => localStorage.getItem('test-key'));
    expect(value).toBe('test-value');

    // When run with --user-data-dir, this state persists across test runs
  });

  // Feature: Test annotations in test results
  // Annotations are now available in TestResult with better tracking
  test('annotations are accessible in test results', async ({ page }, testInfo) => {
    // Annotations can be added at test level or step level
    testInfo.annotations.push({
      type: 'category',
      description: 'smoke-test'
    });

    await test.step('Navigate and verify', async () => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle(/Example Domain/);
    });

    // These annotations will be visible in:
    // - HTML reporter
    // - JSON reporter
    // - Trace viewer
    // And now include location information for better debugging
  });
});
