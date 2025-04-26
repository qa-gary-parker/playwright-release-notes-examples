# Playwright v1.52.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.52.0.

## New Features Demonstrated

1. **Enhanced expect().toContainClass()**
   - New method to check for specific class names on elements
   - More ergonomic way to assert individual class names
   - Example in `new-features.spec.ts`

2. **Enhanced Aria Snapshots**
   - New `/children` property for strict matching
   - New `/url` property for links
   - Example in `new-features.spec.ts`

3. **New Configuration Options**
   - `failOnFlakyTests` option to fail test runs when flaky tests are detected
   - Example configuration in `playwright.config.ts`

4. **New API Request Options**
   - `maxRedirects` option in `apiRequest.newContext()`
   - Example in `new-features.spec.ts`

5. **Enhanced Aria Snapshot References**
   - New `ref` option in `locator.ariaSnapshot()`
   - Example in `new-features.spec.ts`

6. **Test Result Annotations**
   - New `testResult.annotations` property for accessing annotations
   - Useful for custom reporters and test analytics
   - Example in `new-features.spec.ts`

7. **Breaking Changes**
   - Glob URL patterns in routing no longer support `?` and `[]`
   - `route.continue()` no longer allows overriding `Cookie` header
   - Examples of workarounds in `new-features.spec.ts`

## Additional Features (Not Implemented in Examples)

1. **Project-specific Worker Configuration**
   - New `testProject.workers` property to control workers per project
   - This is a configuration feature that can be set in playwright.config.ts

2. **HTML Reporter Negative Filtering**
   - New syntax for excluding tests from HTML report using `!` prefix
   - Filter by tag: `!@tag`, file: `!file.spec.ts`, or project: `!p:project`
   - This is used when running playwright with CLI options

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

## Notes

- The examples use the Playwright website (playwright.dev) as a test target
- Some features are demonstrated through configuration options
- The tests include both simple and complex examples of each new feature 