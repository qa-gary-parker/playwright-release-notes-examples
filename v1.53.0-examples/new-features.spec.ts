import { test, expect, TestInfo } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Playwright v1.53.0 New Features', () => {

  // Feature: locator.describe()
  // Adds a description to a locator for better error messages and trace viewer output.
  // https://playwright.dev/docs/release-notes#version-153
  test('locator.describe() provides a human-readable description for locators', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Describe the locator with a clear, human-readable name
    const getStartedButton = page.getByRole('link', { name: 'Get started' })
      .describe('Primary call-to-action button');

    // The description will appear in traces and reports, making them easier to debug.
    // For example, if this click fails, the error will be much clearer:
    // "Timeout waiting for 'Primary call-to-action button' to be visible"
    await getStartedButton.click();

    await expect(page).toHaveURL(/docs\/intro/);
  });

  // Feature: testInfo.snapshotPath() with `kind` option
  // This allows specifying which snapshot path template is used, choosing
  // between 'snapshot', 'screenshot', and 'aria'.
  // https://playwright.dev/docs/api/class-testinfo#test-info-snapshot-path
  test('testInfo.snapshotPath() with kind option for snapshot paths', async ({ page }, testInfo: TestInfo) => {
    await page.setContent('<div>Hello, World!</div>');

    // The `kind` option is passed in a second argument to specify the type of snapshot.
    // Valid options are 'snapshot', 'screenshot', or 'aria'.
    // This is useful for building custom assertions or tools that need to
    // generate snapshot paths consistent with Playwright's naming conventions.

    // Example for a 'snapshot' kind (the default)
    const snapshotPath = testInfo.snapshotPath('hello-world.txt');
    console.log(`Default snapshot path: ${snapshotPath}`);
    // By default, the path is inside a directory like `test-file-name.spec.ts-snapshots`
    expect(snapshotPath).toContain('new-features.spec.ts-snapshots');

    // Generate the snapshot path for a 'screenshot'
    const screenshotPath = testInfo.snapshotPath('my-screenshot.png', { kind: 'screenshot' });
    console.log(`Screenshot path: ${screenshotPath}`);
    // The path for 'screenshot' will be inside a directory like `new-features.spec.ts-snapshots`
    expect(screenshotPath).toContain('new-features.spec.ts-snapshots');

    // You can then use these paths for custom file operations.
    const snapshotDir = path.dirname(screenshotPath);
    if (!fs.existsSync(snapshotDir)) {
      fs.mkdirSync(snapshotDir, { recursive: true });
    }
    fs.writeFileSync(screenshotPath, 'This is a dummy screenshot file.');

    // Assert that the snapshot file was created in the correct location.
    expect(fs.existsSync(screenshotPath)).toBe(true);
  });
}); 