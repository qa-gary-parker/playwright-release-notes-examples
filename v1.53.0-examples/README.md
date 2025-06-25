# Playwright v1.53.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.53.0.

## New Features Demonstrated

1.  **`locator.describe()` Method**
    - Adds a description to a locator, which is used in traces and reports.
    - Improves test readability and debugging.
    - Example in `new-features.spec.ts`

2.  **`testInfo.snapshotPath()` `kind` Option**
    - A new `kind` option to control which snapshot path template is used.
    - Allows specifying the type of snapshot: `'snapshot'`, `'screenshot'`, or `'aria'`.
    - Example in `new-features.spec.ts`

3.  **HTML Reporter `title` Option**
    - A new `title` option for the HTML reporter to set a custom title for the test run.
    - Useful for distinguishing different test reports.
    - Example in `playwright.config.ts`

## Additional Features (Not Implemented in Examples)

1.  **New Steps in Trace Viewer and HTML reporter**
    - The trace viewer and HTML reporter now have a new "Steps" view, making it easier to follow test execution.
    - This is a UI enhancement for reporters and doesn't have a specific API to demonstrate in a test.

2.  **`npx playwright install --list`**
    - The command now lists all installed browsers, their versions, and their installation locations.
    - This is a CLI enhancement.

## How to Run the Examples

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the tests:
    ```bash
    npx playwright test --config=v1.53.0-examples/playwright.config.ts --reporter=html
    ```

3.  View the test report:
    ```bash
    npx playwright show-report
    ```
    You will see the custom title "Custom test run for v1.53" in the report.

## Notes

- The examples are designed to be simple and focus on the new features.
- Some features are demonstrated through configuration options. 