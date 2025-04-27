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
});
