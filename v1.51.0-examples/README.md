# Playwright v1.51.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.51.0.

## New Features Demonstrated

1. **StorageState for indexedDB**
   - New `indexedDB` option in `browserContext.storageState()`
   - Save and restore IndexedDB contents between test runs
   - Particularly useful for applications using IndexedDB for authentication tokens
   - Example in `new-features.spec.ts`

2. **Filter Visible Elements**
   - New `visible` option for `locator.filter()`
   - Easily filter for only visible elements on page
   - Example in `new-features.spec.ts`

3. **Test Step Improvements**
   - New `TestStepInfo` object for test steps with improved control
   - Add attachments to steps for better documentation
   - Skip steps conditionally with `step.skip()`
   - Example in `new-features.spec.ts`

4. **Contrast Preference Emulation**
   - New `contrast` option for `page.emulateMedia()`
   - Emulate user preference for contrast level
   - Test how your application adapts to high contrast mode
   - Example in `new-features.spec.ts`

5. **Predicate Support for URL Assertions**
   - New support for using predicates in `expect(page).toHaveURL()`
   - Complex URL validation with custom functions
   - Example in `new-features.spec.ts`

6. **API Request Options**
   - New `failOnStatusCode` option in API requests
   - Makes requests throw on non-2xx/3xx status codes
   - Example in `new-features.spec.ts`

## How to Run the Examples

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npx playwright test
   ```

3. View the test report:
   ```bash
   npx playwright show-report
   ```

## Additional Features Not Demonstrated in Code

1. **Copy as prompt button** - New feature in HTML report, trace viewer and UI mode for copying errors as LLM prompts.

2. **Git information in HTML report** - Capture git information with the `captureGitInfo` config option:
   ```js
   // playwright.config.ts
   import { defineConfig } from '@playwright/test';

   export default defineConfig({
     captureGitInfo: { commit: true, diff: true }
   });
   ```

## Notes

- The examples provide practical demonstrations of each new feature
- Some features require specific configuration in playwright.config.ts
- All examples are self-contained and can be run independently 