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
  // This allows specifying a custom "kind" for a snapshot, which affects the
  // sub-directory where the snapshot is stored.
  // https://playwright.dev/docs/release-notes#version-153
  test('testInfo.snapshotPath() with kind option for custom snapshot paths', async ({ page }, testInfo: TestInfo) => {
    await page.setContent('<div>Hello, World!</div>');
    const element = page.locator('div');

    // Define a custom kind for this snapshot.
    // This can be useful for organizing different types of snapshots (e.g., 'visual', 'accessibility').
    const customKind = 'my-custom-kind';

    // Generate the snapshot path using the new `kind` option.
    // The snapshot will be stored in a directory named after the `kind`.
    const snapshotPath = testInfo.snapshotPath({ kind: customKind, name: 'hello-world.txt' });

    // We can check where the snapshot path is pointing.
    // It should include a directory with the name of our custom kind.
    expect(snapshotPath).toContain(customKind);
    console.log(`Snapshot path: ${snapshotPath}`);

    // Let's create a dummy snapshot file to verify it works.
    const snapshotDir = path.dirname(snapshotPath);
    if (!fs.existsSync(snapshotDir)) {
      fs.mkdirSync(snapshotDir, { recursive: true });
    }
    fs.writeFileSync(snapshotPath, 'This is a test snapshot.');

    // Assert that the snapshot file was created in the correct location.
    expect(fs.existsSync(snapshotPath)).toBe(true);

    // Now, let's take a real screenshot and see how it works with toHaveScreenshot.
    // The `kind` option isn't directly exposed in `toHaveScreenshot`, but this demonstrates
    // the underlying API that powers snapshot management.
    // A custom assertion could be built on top of `testInfo.snapshotPath()` to use this feature.
    
    // For example, a custom visual regression assertion could be:
    async function expectToHaveVisualSnapshot(locator, name, kind) {
      const snapshotPath = testInfo.snapshotPath({ name, kind });
      await expect(locator).toHaveScreenshot(path.basename(snapshotPath));
    }

    // This is a conceptual example, as toHaveScreenshot doesn't directly support a `kind` parameter yet.
    // The new API is a building block for more advanced testing scenarios.
  });
}); 