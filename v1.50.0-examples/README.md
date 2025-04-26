# Playwright v1.50.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.50.0.

## New Features Demonstrated

1. **Test Step Timeout Option**
   - New `timeout` option for `test.step()` to limit execution time for individual steps
   - Steps can timeout independently from the test
   - Failed steps don't necessarily fail the whole test
   - Example in `new-features.spec.ts`

2. **Skipping Test Steps Conditionally**
   - New `test.step.skip()` method to conditionally skip steps
   - Useful for feature-flag driven tests
   - Allows for cleaner test organization
   - Example in `new-features.spec.ts`

3. **Enhanced Aria Snapshots**
   - Support for storing aria snapshots in YAML files
   - Better organization for accessibility tests
   - Example in `new-features.spec.ts`

4. **New Accessibility Assertion**
   - New `toHaveAccessibleErrorMessage()` assertion
   - Easily test form validation error messages
   - Support for exact matches and regex patterns
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

1. **Snapshot Update Configuration**
   - New `changed` option for `testConfig.updateSnapshots` to only update changed snapshots
   - Configure in playwright.config.ts:
   ```js
   export default defineConfig({
     updateSnapshots: 'changed' // Only update changed snapshots
   });
   ```

2. **Project-specific snapshot settings**
   - Configure snapshot behavior per project

## Notes

- The examples provide practical demonstrations of key v1.50.0 features
- Focus is on features that improve test reliability and maintainability
- All examples include detailed comments explaining the features 