# Playwright v1.49.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.49.0.

## New Features Demonstrated

1. **Aria Snapshots**
   - New assertion `expect(locator).toMatchAriaSnapshot()` to verify page structure
   - Compare with expected accessibility tree in YAML format
   - Great for accessibility testing and structural verification
   - Example in `new-features.spec.ts`

2. **New Test Runner Options**
   - New method `test.fail.only()` to focus on a failing test
   - Support for multiple global setups and teardowns
   - New `'on-first-failure'` value for screenshot options
   - Example in `new-features.spec.ts`

3. **Canvas Preview in Snapshots**
   - `<canvas>` elements now draw a preview in snapshots
   - Better visual representation in reports and traces
   - Example in `new-features.spec.ts`

4. **Tracing Improvements**
   - New `tracing.group()` method to visually group actions
   - Better organization of trace entries
   - Example in `new-features.spec.ts`

5. **Error Causes**
   - New properties `testInfoError.cause` and `testError.cause`
   - Access full error chain in tests and reporters
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

## Additional Features (Not Implemented in Examples)

1. **Enhanced Snapshot Options**
   - New `maxDiffPixelRatio` option in the `toMatchSnapshot` configuration
   - Example configuration in `playwright.config.ts`:
   ```js
   // playwright.config.ts
   import { defineConfig } from '@playwright/test';
   
   export default defineConfig({
     expect: {
       toMatchSnapshot: {
         maxDiffPixelRatio: 0.05
       }
     }
   });
   ```

2. **Single tsconfig for All Tests**
   - New option `testConfig.tsconfig` to specify a single configuration
   - Useful for standardizing TypeScript settings across tests
   ```js
   // playwright.config.ts
   import { defineConfig } from '@playwright/test';
   
   export default defineConfig({
     tsconfig: './tsconfig.json'
   });
   ```

3. **HTML Report Navigation**
   - Added "previous" and "next" buttons to the HTML report
   - Quickly switch between test cases

## Breaking Changes in v1.49.0

1. **Headless Mode Changes**
   - Channels like `chrome`, `msedge` etc. now use the new headless mode
   - May require updating snapshots or adapting test code
   
2. **Platform Support**
   - No more updates for WebKit on Ubuntu 20.04 and Debian 11
   - Recommendation to update OS to later versions
   
3. **Component Testing Packages**
   - `@playwright/experimental-ct-vue2` will no longer be updated
   - `@playwright/experimental-ct-solid` will no longer be updated

## Notes

- The examples demonstrate practical uses of v1.49.0 features
- All examples include detailed comments explaining the features
- The tests use the Playwright website (playwright.dev) as a test target where appropriate 