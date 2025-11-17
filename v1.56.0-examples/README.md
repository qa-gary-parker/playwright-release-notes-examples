# Playwright v1.56.0 New Features Examples

This directory contains examples demonstrating the new features introduced in Playwright v1.56.0.

## New Features Demonstrated

1.  **`page.consoleMessages()` API**
    - Retrieves all console messages logged on the page since it was created.
    - Returns an array of `ConsoleMessage` objects.
    - Useful for debugging, validating console output, and monitoring application behavior.
    - Access message text, type (log, warn, error, info, debug), location, and args.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-page#page-console-messages)

2.  **`page.pageErrors()` API**
    - Retrieves all uncaught errors that occurred on the page.
    - Returns an array of `Error` objects.
    - Essential for detecting JavaScript errors in your application during testing.
    - Helps identify issues that might not cause test failures but affect user experience.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-page#page-page-errors)

3.  **`page.requests()` API**
    - Retrieves all network requests made by the page.
    - Returns an array of `Request` objects.
    - Valuable for analyzing network activity, debugging API calls, and performance testing.
    - Access URL, method, headers, post data, response, and timing information.
    - Example in `new-features.spec.ts`
    - [Documentation](https://playwright.dev/docs/api/class-page#page-requests)

4.  **Playwright Test Agents**
    - Three custom agent definitions (planner, generator, healer) to guide LLMs through building tests.
    - Helps AI assistants generate better Playwright tests with proper structure.
    - Improves test generation quality and reliability.
    - Available in the Playwright repository for use with LLM tools.

## UI Mode Enhancements (Not Demonstrated in Code)

1.  **Disable "Copy prompt" button** - UI configuration option
2.  **Merge files in UI mode** - UI feature for organizing test files
3.  **Update snapshots in UI mode** - Easier snapshot management
4.  **Run single worker** - UI option for debugging

## How to Run the Examples

1.  Install dependencies (from repository root):
    ```bash
    npm install
    ```

2.  Run the tests:
    ```bash
    npm run test:v1.56
    ```

    Or with the full command:
    ```bash
    npx playwright test v1.56.0-examples/
    ```

3.  Run in UI mode to explore the new features:
    ```bash
    npx playwright test v1.56.0-examples/ --ui
    ```

4.  View the HTML report:
    ```bash
    npx playwright show-report
    ```

## Use Cases for New Page APIs

### Console Message Monitoring

Track and validate application logging:
```typescript
test('validate no console errors', async ({ page }) => {
  await page.goto('/app');
  const errors = page.consoleMessages().filter(m => m.type() === 'error');
  expect(errors).toHaveLength(0);
});
```

### Error Detection

Catch uncaught JavaScript errors:
```typescript
test('no uncaught errors during checkout', async ({ page }) => {
  await page.goto('/checkout');
  // ... perform checkout actions
  const errors = page.pageErrors();
  expect(errors).toHaveLength(0);
});
```

### Network Analysis

Validate API interactions:
```typescript
test('correct API calls during login', async ({ page }) => {
  await page.goto('/login');
  // ... perform login
  const apiRequests = page.requests().filter(r =>
    r.url().includes('/api/') && r.method() === 'POST'
  );
  expect(apiRequests.length).toBeGreaterThan(0);
});
```

### Performance Monitoring

Track resource loading:
```typescript
test('page loads efficiently', async ({ page }) => {
  await page.goto('/');
  const requests = page.requests();
  const slowRequests = requests.filter(r => {
    const timing = r.timing();
    return timing.responseEnd > 2000; // > 2 seconds
  });
  expect(slowRequests).toHaveLength(0);
});
```

## Benefits of These APIs

### Before v1.56.0
You had to set up event listeners before actions occurred:
```typescript
const messages = [];
page.on('console', msg => messages.push(msg));
// Then perform actions
```

### After v1.56.0
Simply retrieve all data at any time:
```typescript
// Perform all actions first
await page.goto('/');
await page.click('button');
// Then retrieve everything at once
const messages = page.consoleMessages();
const errors = page.pageErrors();
const requests = page.requests();
```

This makes tests simpler, more readable, and easier to debug!

## Breaking Changes

- **`browserContext.on('backgroundpage')` event deprecated**: This event is now deprecated and may be removed in future versions. Use alternative methods for managing background pages.

## Notes

- All three new APIs return arrays that include data from the page's entire lifecycle.
- The data is available even if you didn't set up event listeners beforehand.
- These APIs are particularly useful in test fixtures and teardown hooks.
- Console messages include all severity levels: log, info, warn, error, debug.
- Page errors only include uncaught errors; caught errors won't appear.
- Requests include all resource types: document, stylesheet, image, script, fetch, xhr, etc.

## References

- [Playwright v1.56.0 Release Notes](https://playwright.dev/docs/release-notes#version-156)
- [Page API Documentation](https://playwright.dev/docs/api/class-page)
- [ConsoleMessage API](https://playwright.dev/docs/api/class-consolemessage)
- [Request API](https://playwright.dev/docs/api/class-request)
