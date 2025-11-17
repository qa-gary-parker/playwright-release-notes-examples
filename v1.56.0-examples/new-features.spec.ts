import { test, expect } from '@playwright/test';

test.describe('Playwright v1.56.0 New Features', () => {

  // Feature: page.consoleMessages() API
  // Retrieves all console messages logged on the page since it was created.
  // Useful for debugging and validating console output in tests.
  // https://playwright.dev/docs/release-notes#version-156
  test('page.consoleMessages() retrieves all console logs', async ({ page }) => {
    // Navigate to a page and trigger some console logs
    await page.goto('https://example.com');

    // Execute JavaScript that logs to console
    await page.evaluate(() => {
      console.log('Test message 1');
      console.warn('Test warning');
      console.error('Test error');
      console.log('Test message 2');
    });

    // New API: Retrieve all console messages
    const consoleMessages = await page.consoleMessages();

    // Filter to find our messages
    const logs = consoleMessages.filter(msg => msg.text().startsWith('Test'));

    expect(logs.length).toBeGreaterThanOrEqual(4);

    // Verify message types
    const logTypes = logs.map(msg => msg.type());
    expect(logTypes).toContain('log');
    expect(logTypes).toContain('warning');
    expect(logTypes).toContain('error');

    // Check specific messages
    const logTexts = logs.map(msg => msg.text());
    expect(logTexts).toContain('Test message 1');
    expect(logTexts).toContain('Test warning');
    expect(logTexts).toContain('Test error');
    expect(logTexts).toContain('Test message 2');
  });

  // Feature: page.pageErrors() API
  // Retrieves all uncaught errors that occurred on the page.
  // Useful for detecting JavaScript errors in your application.
  test('page.pageErrors() retrieves uncaught page errors', async ({ page }) => {
    await page.goto('https://example.com');

    // Trigger an uncaught error
    await page.evaluate(() => {
      // Simulate an error
      setTimeout(() => {
        throw new Error('Intentional test error');
      }, 100);
    });

    // Wait a bit for the error to be thrown
    await page.waitForTimeout(200);

    // New API: Retrieve all page errors
    const pageErrors = await page.pageErrors();

    // Find our intentional error
    const testError = pageErrors.find(err => err.message.includes('Intentional test error'));

    expect(testError).toBeDefined();
    expect(testError?.message).toContain('Intentional test error');

    // This is useful for:
    // - Validating that no unexpected errors occur
    // - Catching JavaScript errors in your application
    // - Testing error handling and reporting
  });

  // Feature: page.requests() API
  // Retrieves all network requests made by the page.
  // Useful for analyzing network activity and debugging.
  test('page.requests() retrieves all network requests', async ({ page }) => {
    await page.goto('https://example.com');

    // Make some additional requests
    await page.evaluate(() => {
      fetch('https://example.com/api/data').catch(() => {});
    });

    // New API: Retrieve all requests
    const requests = await page.requests();

    expect(requests.length).toBeGreaterThan(0);

    // Find the main document request
    const mainRequest = requests.find(req => req.url().includes('example.com'));
    expect(mainRequest).toBeDefined();

    // Check request properties
    if (mainRequest) {
      expect(mainRequest.method()).toBe('GET');
      expect(mainRequest.url()).toContain('example.com');

      // You can access all request details:
      // - URL, method, headers
      // - Post data
      // - Response (if completed)
      // - Timing information
    }

    // This is valuable for:
    // - Validating API calls are made correctly
    // - Debugging network issues
    // - Performance testing
    // - Checking request/response patterns
  });

  // Feature: Comprehensive page data collection
  // Combining all three new APIs for complete page monitoring
  test('using all new page APIs together for comprehensive monitoring', async ({ page }) => {
    await page.goto('https://example.com');

    // Perform some actions that generate logs, errors, and requests
    await page.evaluate(() => {
      console.log('Starting data collection test');

      // Make a fetch request
      fetch('https://example.com/api/test').catch(() => {});

      // Log various messages
      console.warn('This is a warning for testing');
      console.error('This is an error log (not thrown)');
      console.log('Data collection complete');
    });

    // Collect all data at once
    const allConsoleMessages = await page.consoleMessages();
    const allPageErrors = await page.pageErrors();
    const allRequests = await page.requests();

    // Create a comprehensive test report
    const report = {
      totalConsoleMessages: allConsoleMessages.length,
      consoleMessageTypes: [...new Set(allConsoleMessages.map(m => m.type()))],
      totalErrors: allPageErrors.length,
      totalRequests: allRequests.length,
      requestMethods: [...new Set(allRequests.map(r => r.method()))]
    };

    console.log('Page monitoring report:', JSON.stringify(report, null, 2));

    // Validate the collected data
    expect(report.totalConsoleMessages).toBeGreaterThan(0);
    expect(report.consoleMessageTypes).toContain('log');
    expect(report.totalRequests).toBeGreaterThan(0);
    expect(report.requestMethods).toContain('GET');

    // These APIs are particularly useful for:
    // - End-to-end test validation
    // - Debugging failed tests
    // - Performance monitoring
    // - Error tracking and reporting
    // - Network behavior analysis
  });

  // Feature: Filtering and analyzing console messages
  test('filtering and analyzing console messages by type', async ({ page }) => {
    await page.goto('https://example.com');

    // Generate various console outputs
    await page.evaluate(() => {
      console.log('Info message 1');
      console.log('Info message 2');
      console.warn('Warning message 1');
      console.error('Error message 1');
      console.debug('Debug message 1');
    });

    const allMessages = await page.consoleMessages();

    // Filter by message type
    const logs = allMessages.filter(m => m.type() === 'log');
    const warnings = allMessages.filter(m => m.type() === 'warning');
    const errors = allMessages.filter(m => m.type() === 'error');

    // Validate counts
    expect(logs.length).toBeGreaterThanOrEqual(2);
    expect(warnings.length).toBeGreaterThanOrEqual(1);
    expect(errors.length).toBeGreaterThanOrEqual(1);

    // Search for specific messages
    const hasInfoMessage = allMessages.some(m =>
      m.text().includes('Info message') && m.type() === 'log'
    );
    expect(hasInfoMessage).toBe(true);
  });

  // Feature: Network request analysis with requests() API
  test('analyzing network requests and responses', async ({ page }) => {
    await page.goto('https://example.com');

    // Wait for requests to complete
    await page.waitForLoadState('networkidle');

    const requests = await page.requests();

    // Analyze request patterns
    const getRequests = requests.filter(r => r.method() === 'GET');
    const documentRequests = requests.filter(r =>
      r.resourceType() === 'document'
    );

    expect(getRequests.length).toBeGreaterThan(0);
    expect(documentRequests.length).toBeGreaterThan(0);

    // Check for specific URLs
    const mainPageRequest = requests.find(r =>
      r.url().includes('example.com') && r.resourceType() === 'document'
    );

    expect(mainPageRequest).toBeDefined();

    // You can also check response details if available
    if (mainPageRequest) {
      const response = await mainPageRequest.response();
      if (response) {
        expect(response.status()).toBe(200);
        expect(response.ok()).toBe(true);
      }
    }
  });
});
