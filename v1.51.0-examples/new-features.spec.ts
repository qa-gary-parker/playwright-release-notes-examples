import { test, expect } from '@playwright/test';
import path from 'path';

// Define the auth file path as shown in the docs
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.describe('Playwright v1.51.0 New Features', () => {
  test('IndexedDB in storageState - auth example', async ({ page, context }) => {
    // This test demonstrates the auth pattern with indexedDB storage option
    await page.setContent(`
      <div id="status">Ready</div>
      <button id="login">Login</button>
      <div id="user-panel" style="display: none;">
        <h3>User Dashboard</h3>
        <div id="user-info">No user data</div>
      </div>
      <script>
        // Simulate a login process with auth data that would be stored in IndexedDB 
        document.getElementById('login').addEventListener('click', () => {
          // Simulate login steps
          setTimeout(() => {
            document.getElementById('status').textContent = 'Authenticating...';
          }, 100);
          
          setTimeout(() => {
            document.getElementById('status').textContent = 'Authentication successful';
            document.getElementById('user-panel').style.display = 'block';
            document.getElementById('user-info').textContent = JSON.stringify({
              id: 1,
              token: "sample-auth-token-123", 
              user: "test@example.com"
            });
            
            // Simulate data that would be stored in IndexedDB
            console.log('User authenticated and token stored in simulated IndexedDB');
          }, 500);
        });
      </script>
    `);
    
    // Perform login (simulated authentication steps)
    await page.click('#login');
    
    // Wait for authentication to complete
    await expect(page.locator('#status')).toHaveText('Authentication successful', { timeout: 1000 });
    await expect(page.locator('#user-info')).toContainText('sample-auth-token-123');
    
    // This is the key part of the v1.51.0 feature - save storage state with indexedDB
    // In a real test, this would save IndexedDB contents to the auth file
    await context.storageState({ 
      path: authFile, 
      indexedDB: true  // This is the new option in v1.51.0
    });
    
    // Note: Since this is just a simulation, we're not actually saving anything meaningful
    console.log(`Storage state with indexedDB saved to ${authFile}`);
  });

  test('Filter visible elements with locator.filter()', async ({ page }) => {
    // Setup a page with both visible and hidden elements
    await page.setContent(`
      <div>
        <div class="todo-item" data-testid="todo-item">Item 1 (visible)</div>
        <div class="todo-item" data-testid="todo-item">Item 2 (visible)</div>
        <div class="todo-item" data-testid="todo-item" style="display: none">Item 3 (hidden)</div>
        <div class="todo-item" data-testid="todo-item">Item 4 (visible)</div>
        <div class="todo-item" data-testid="todo-item" style="visibility: hidden">Item 5 (hidden)</div>
      </div>
    `);

    // Get all todo items
    const allTodoItems = page.getByTestId('todo-item');
    await expect(allTodoItems).toHaveCount(5);
    
    // Using the new visible option in filter() to only get visible items
    const visibleTodoItems = allTodoItems.filter({ visible: true });
    await expect(visibleTodoItems).toHaveCount(3);
    
    // We can also check the text of all visible items
    const visibleTexts = await visibleTodoItems.allTextContents();
    expect(visibleTexts).toEqual([
      'Item 1 (visible)',
      'Item 2 (visible)',
      'Item 4 (visible)'
    ]);
  });

  test('Using test.step with attachments and skip', async ({ page }) => {
    // First step - always executed
    await test.step('First step - preparation', async step => {
      await page.setContent(`
        <h1>Test Page</h1>
        <div id="container">Empty container</div>
      `);
      
      // Add an attachment to the step for documentation
      await step.attach('page-state', { 
        body: 'Initial page state', 
        contentType: 'text/plain' 
      });
      
      await expect(page.locator('#container')).toHaveText('Empty container');
    });
    
    // This is an example of a skipped step based on a condition
    const isMobile = false; // This would normally be based on your test configuration
    await test.step('Mobile-only step', async step => {
      // Skip step if not running in mobile mode
      step.skip(!isMobile, 'This step only runs on mobile layouts');
      
      // This code will not execute if the step is skipped
      await page.setContent(`
        <div>Mobile View</div>
      `);
    });
    
    // Third step - always executed
    await test.step('Final step', async step => {
      await page.locator('#container').evaluate(el => {
        el.textContent = 'Updated content';
      });
      
      await expect(page.locator('#container')).toHaveText('Updated content');
      
      // Add a screenshot attachment
      const screenshot = await page.screenshot();
      await step.attach('final-state', { 
        body: screenshot, 
        contentType: 'image/png' 
      });
    });
  });

  test('emulateMedia with contrast preference', async ({ page }) => {
    await page.setContent(`
      <style>
        /* Styles that respond to prefers-contrast media query */
        @media (prefers-contrast: more) {
          body { background-color: black; color: white; }
          a { color: yellow; }
        }
        
        @media (prefers-contrast: less) {
          body { background-color: #f0f0f0; color: #333; }
          a { color: blue; }
        }
        
        @media (prefers-contrast: no-preference) {
          body { background-color: white; color: black; }
          a { color: blue; }
        }
      </style>
      <h1>Contrast Test</h1>
      <a href="#">This is a link</a>
      <div id="contrast-state">Current contrast: no-preference</div>
      <script>
        // Display the current contrast preference
        function updateContrastState() {
          const moreContrast = window.matchMedia('(prefers-contrast: more)').matches;
          const lessContrast = window.matchMedia('(prefers-contrast: less)').matches;
          
          let contrastValue = 'no-preference';
          if (moreContrast) contrastValue = 'more';
          if (lessContrast) contrastValue = 'less';
          
          document.getElementById('contrast-state').textContent = 'Current contrast: ' + contrastValue;
        }
        
        // Initial update
        updateContrastState();
        
        // Listen for changes
        window.matchMedia('(prefers-contrast: more)').addEventListener('change', updateContrastState);
        window.matchMedia('(prefers-contrast: less)').addEventListener('change', updateContrastState);
      </script>
    `);
    
    // Default contrast
    await expect(page.locator('#contrast-state')).toHaveText('Current contrast: no-preference');
    
    // Emulate high contrast mode
    await page.emulateMedia({ contrast: 'more' });
    await expect(page.locator('#contrast-state')).toHaveText('Current contrast: more');
    
    // Check that CSS is applied correctly in high contrast mode
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bgColor).toBe('rgb(0, 0, 0)'); // black
    
    // Emulate less contrast mode
    await page.emulateMedia({ contrast: 'no-preference' });
    await expect(page.locator('#contrast-state')).toHaveText('Current contrast: no-preference');
  });

  test('expect(page).toHaveURL() with predicate', async ({ page }) => {
    // Navigate to a URL
    await page.goto('https://playwright.dev/docs/release-notes');
    
    // Check URL with a string
    await expect(page).toHaveURL('https://playwright.dev/docs/release-notes');
    
    // Check URL with a regular expression
    await expect(page).toHaveURL(/playwright\.dev/);
    
    // New in v1.51: Check URL with a predicate function
    await expect(page).toHaveURL(url => {
      return url.hostname === 'playwright.dev' && 
             url.pathname.includes('/docs/') &&
             url.pathname.endsWith('release-notes');
    });
    
    // Another example with a more complex predicate
    await expect(page).toHaveURL(url => {
      // We can implement any complex logic here
      const validHostnames = ['playwright.dev', 'www.playwright.dev'];
      const requiredPathSegments = ['docs', 'release-notes'];
      
      return validHostnames.includes(url.hostname) && 
             requiredPathSegments.every(segment => url.pathname.includes(segment));
    });
  });
  
  test('failOnStatusCode option in APIRequestContext', async ({ request }) => {
    // By default, request doesn't throw on non-2xx status codes
    const okResponse = await request.get('https://playwright.dev');
    await expect(okResponse).toBeOK();
    
    // Using httpbin.org to test various status codes
    const notFoundResponse = await request.get('https://httpbin.org/status/404');
    expect(notFoundResponse.status()).toBe(404);
    
    // With failOnStatusCode: true, non-2xx status codes will throw
    try {
      await request.get('https://httpbin.org/status/500', { 
        failOnStatusCode: true 
      });
      // Should not reach here
      throw new Error('Request should have failed');
    } catch (error) {
      // Verify the error contains the status code
      expect(error.message).toContain('500');
    }
    
    // 3xx responses should not throw even with failOnStatusCode: true
    const redirectResponse = await request.get('https://httpbin.org/status/301', {
      failOnStatusCode: true,
      maxRedirects: 0 // Don't follow redirects to test the status code handling
    });
    expect(redirectResponse.status()).toBe(301);
  });
}); 