# Playwright v1.54.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.54.0.

## New Features Demonstrated

1.  **Cookie Partitioning with `partitionKey`**
    - Adds support for CHIPS (Cookies Having Independent Partitioned State) cookies.
    - The new `partitionKey` property allows setting and getting partitioned cookies.
    - Useful for cookies that need to be isolated by top-level site for privacy and security.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies)

2.  **HTML Reporter `noSnippets` Option**
    - New configuration option to disable code snippets in HTML reports.
    - Reduces report file size significantly for large test suites.
    - Particularly useful when reports need to be uploaded or shared.
    - Example in `playwright.config.ts`
    - [Documentation](https://playwright.dev/docs/test-reporters#html-reporter)

3.  **Annotation `location` Property**
    - Test annotations now include a `location` property showing where the annotation was added.
    - Includes file path, line number, and column number.
    - Improves debugging and traceability of test metadata.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-teststep#test-step-annotations)

4.  **`--user-data-dir` Command Line Option**
    - New CLI option to specify a directory for persistent browser state.
    - Allows reusing browser data (cookies, local storage, etc.) across test runs.
    - Useful for testing scenarios that require persistent login or cached data.
    - Usage: `npx playwright test --user-data-dir=/path/to/data`
    - Example in `new-features.spec.ts`

## How to Run the Examples

1.  Install dependencies (from repository root):
    ```bash
    npm install
    ```

2.  Run the tests:
    ```bash
    npm run test:v1.54
    ```

    Or with the full command:
    ```bash
    npx playwright test v1.54.0-examples/
    ```

3.  Run with user data directory:
    ```bash
    npx playwright test v1.54.0-examples/ --user-data-dir=./temp-user-data
    ```

4.  View the HTML report:
    ```bash
    npx playwright show-report
    ```

## Notes

- The cookie partitioning feature requires browser support for CHIPS cookies (Chromium-based browsers).
- The `noSnippets` option is most noticeable in large test suites with many failures.
- The annotation location is automatically captured by Playwright when annotations are added.
- Using `--user-data-dir` creates a persistent browser profile, which can be useful for debugging but should be used carefully in CI environments.

## Additional Features (Not Implemented in Examples)

- **Debian 13 "Trixie" support**: Playwright now officially supports Debian 13.
- **Performance improvements**: Various optimizations in test execution and reporting.

## References

- [Playwright v1.54.0 Release Notes](https://playwright.dev/docs/release-notes#version-154)
- [Playwright API Documentation](https://playwright.dev/docs/api/class-playwright)
