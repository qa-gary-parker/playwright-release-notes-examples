# Playwright v1.55.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.55.0.

## New Features Demonstrated

1.  **`testStepInfo.titlePath` Property**
    - Returns the full title path from the test file to the current step as an array.
    - Includes describe blocks, test names, and all parent step names.
    - Extremely useful for generating custom reports with full context.
    - Helps with debugging deeply nested test steps.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-teststepinfo#test-step-info-title-path)

2.  **Codegen Automatic `toBeVisible()` Assertions**
    - Playwright's code generator now automatically adds `toBeVisible()` assertions.
    - Makes generated tests more robust by ensuring elements exist before interaction.
    - Reduces flaky tests from generated code.
    - To try it: `npx playwright codegen https://example.com`
    - Example patterns in `new-features.spec.ts`

## Additional Features (Not Implemented in Examples)

1.  **Dropped Support for Chromium Extension Manifest v2**
    - Playwright now only supports Manifest v3 for Chromium extensions.
    - If you're using browser extensions in tests, ensure they use Manifest v3.

2.  **Debian 13 "Trixie" Support**
    - Official support added for the latest Debian version.
    - Improves compatibility for Linux-based CI/CD environments.

## How to Run the Examples

1.  Install dependencies (from repository root):
    ```bash
    npm install
    ```

2.  Run the tests:
    ```bash
    npm run test:v1.55
    ```

    Or with the full command:
    ```bash
    npx playwright test v1.55.0-examples/
    ```

3.  Try the codegen feature with automatic assertions:
    ```bash
    npx playwright codegen https://example.com
    ```
    Notice how clicking elements generates `toBeVisible()` assertions automatically.

4.  View the HTML report:
    ```bash
    npx playwright show-report
    ```

## Use Cases for `titlePath`

The `testStepInfo.titlePath` property is particularly valuable for:

### Custom Reporting
```typescript
await test.step('Action', async (stepInfo) => {
  const fullContext = stepInfo.titlePath.join(' → ');
  customLogger.log(fullContext);
});
```

### Debugging Complex Flows
When tests fail deep in nested steps, `titlePath` shows exactly where:
```
Describe Block → Test Name → Setup → Action → Validation → Failed Step
```

### Integration with Logging Systems
Pass the full context to your logging/monitoring systems:
```typescript
await test.step('Database query', async (stepInfo) => {
  logger.info({
    context: stepInfo.titlePath,
    timestamp: Date.now()
  });
});
```

### Page Object Pattern
Track which page object method called which step:
```typescript
class LoginPage {
  async login(stepInfo: TestStepInfo) {
    console.log('Login called from:', stepInfo.titlePath);
  }
}
```

## Notes

- The `titlePath` property returns a new array each time it's accessed.
- The array includes all ancestors from the test file level down to the current step.
- When using with fixtures or page objects, you can pass `stepInfo` as a parameter to maintain context.
- The codegen improvements are most noticeable when recording interactions with dynamic content.

## References

- [Playwright v1.55.0 Release Notes](https://playwright.dev/docs/release-notes#version-155)
- [TestStepInfo API Documentation](https://playwright.dev/docs/api/class-teststepinfo)
- [Codegen Documentation](https://playwright.dev/docs/codegen)
