import { test, expect } from '@playwright/test';

test.describe('Playwright v1.49.0 New Features', () => {
  
  test('Aria Snapshots with YAML', async ({ page }) => {
    // Create a test page with structured content for aria snapshot testing
    await page.setContent(`
      <nav role="navigation">
        <ul role="list">
          <li role="listitem">Home</li>
          <li role="listitem">
            <a href="https://example.com/products">Products</a>
          </li>
          <li role="listitem">
            <a href="https://example.com/about">About Us</a>
          </li>
        </ul>
      </nav>
      <main role="main">
        <h1>Welcome to Our Site</h1>
        <section>
          <h2>Featured Products</h2>
          <div role="list">
            <div role="listitem">Product A</div>
            <div role="listitem">Product B</div>
          </div>
        </section>
      </main>
      <footer role="contentinfo">
        <p>Copyright 2023</p>
      </footer>
    `);

    // Using the new expect().toMatchAriaSnapshot() assertion
    // This verifies the accessibility tree structure of the page
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - navigation:
        - list:
          - listitem: Home
          - listitem:
            - link "Products":
              - /url: https://example.com/products
          - listitem:
            - link "About Us":
              - /url: https://example.com/about
      - main:
        - heading "Welcome to Our Site" [level=1]
        - heading "Featured Products" [level=2]
        - list:
          - listitem: Product A
          - listitem: Product B
      - contentinfo:
        - paragraph: Copyright 2023
    `);
    
    // Note: In a real scenario, you would first generate this snapshot using:
    // npx playwright test --update-snapshots
  });

  test('Canvas Preview in Snapshots', async ({ page }) => {
    // In v1.49.0, canvas elements now draw a preview in snapshots
    // We'll create a page with a canvas element that draws something
    
    await page.setContent(`
      <h2>Canvas Element with Drawing</h2>
      <canvas id="myCanvas" width="200" height="100"></canvas>
      <script>
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        
        // Draw a blue rectangle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(10, 10, 150, 80);
        
        // Add some text
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Playwright v1.49', 30, 50);
      </script>
    `);
    
    // In v1.49.0, when this page is captured in a snapshot or trace,
    // the canvas will show a preview of the actual rendered content
    // instead of just an empty placeholder
    
    // For demonstration, we'll take a screenshot that would include the canvas
    await page.screenshot({ path: 'canvas-preview.png' });
    
    // Verify the canvas exists
    await expect(page.locator('canvas')).toBeVisible();
  });

  // Uncomment this test when you want to demonstrate test.fail.only()
  // This is commented out because it will always fail when run
  // test.fail('Demonstrating test.fail.only()', async ({ page }) => {
  //   // In v1.49.0, you can use test.fail.only() to focus on a failing test
  //   // Usage would be: test.fail.only('test name', async () => {})
  //   // This is useful for debugging failing tests in isolation
  //   
  //   await page.goto('https://example.com');
  //   // This assertion is meant to fail for demonstration
  //   await expect(page.locator('h1')).toHaveText('This will fail');
  //
  //   // To run only this test and expect it to fail:
  //   // Change the first line to test.fail.only()
  // });

  test('Tracing Group Demonstration', async ({ browser }) => {
    // Create a new context specifically for this test
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    // First group of actions - navigation
    await page.goto('https://example.com/');
    await page.waitForLoadState('domcontentloaded');
    
    // Second group of actions - interaction
    await page.locator('a').first().hover();
    await page.locator('body').click();
    
    // Stop tracing before closing the context
    await context.tracing.stop({ path: 'trace-with-groups.zip' });
    
    // Clean up
    await context.close();
    
    // Note: To view the trace with groups:
    // npx playwright show-trace trace-with-groups.zip
    //
    // Note: In v1.49.0, organizing traces is now possible using multiple
    // trace files rather than chunks, which is a simpler approach
  });

  test('Error Cause Demonstration', async ({ page }) => {
    // In v1.49.0, test errors can have causes
    // We'll simulate this with a try-catch block
    
    try {
      await page.goto('https://example.com');
      
      try {
        // This will throw an error
        throw new Error('Original error');
      } catch (originalError) {
        // Create a new error with the original as its cause
        const wrapperError = new Error('Wrapper error');
        wrapperError.cause = originalError;
        throw wrapperError;
        
        // In v1.49.0 test framework, you can access:
        // - testInfoError.cause in hooks and fixtures
        // - testError.cause in reporters
      }
    } catch (error) {
      // For demonstration purposes only - in actual tests 
      // you'd let Playwright handle the error
      console.log('Error:', error.message);
      console.log('Cause:', error.cause?.message);
      
      // We won't actually throw here to keep the test passing
      // but in a real scenario, the error chain would be preserved
    }
  });
});
