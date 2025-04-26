import { test, expect } from '@playwright/test';

test.describe('Playwright v1.52.0 New Features', () => {
  test('New expect().toContainClass() method', async ({ page }) => {
    // Setup a page with elements having multiple classes
    await page.setContent(`
      <div class="todo-item important done high-priority">Task 1</div>
      <div class="todo-item pending low-priority">Task 2</div>
    `);

    // Using toContainClass to check individual classes
    const firstItem = page.locator('.todo-item').first();
    await expect(firstItem).toContainClass('done'); // Checks just for 'done' class
    await expect(firstItem).toContainClass('important'); // Checks just for 'important' class
    
    // Compare with toHaveClass which needs all classes to match
    await expect(firstItem).toHaveClass('todo-item important done high-priority');
    
    // Check second item
    const secondItem = page.locator('.todo-item').nth(1);
    await expect(secondItem).toContainClass('pending');
    await expect(secondItem).not.toContainClass('done');
  });

  test('Enhanced Aria Snapshots with /children and /url', async ({ page }) => {
    // Setup a page with nested elements and links
    await page.setContent(`
      <nav role="navigation">
        <ul role="list">
          <li role="listitem">Feature A</li>
          <li role="listitem">
            <a href="https://playwright.dev">Feature B</a>
          </li>
        </ul>
      </nav>
    `);

    // Using the new aria snapshot format with /children and /url
    await expect(page.locator('nav')).toMatchAriaSnapshot(`
  - navigation:
    - list:
      - /children: equal
      - listitem: Feature A
      - listitem:
        - link "Feature B":
          - /url: "https://playwright.dev"
`);
  });

  test('New maxRedirects option in apiRequest', async ({ request }) => {
    // Testing maxRedirects option with a redirect chain
    const response = await request.get('http://httpbin.org/redirect/2', {
      maxRedirects: 2
    });
    await expect(response).toBeOK();

    // Should fail with too many redirects
    try {
      await request.get('http://httpbin.org/redirect/3', {
        maxRedirects: 2
      });
    } catch (error) {
      await expect(error.message).toContain('Max redirect count exceeded');
    }
  });

  test('New ref option in locator.ariaSnapshot()', async ({ page }) => {
    // Setup a simple page with a button
    await page.setContent(`
      <div role="main">
        <button role="button" aria-label="Save">Save</button>
      </div>
    `);

    // Generate aria snapshot with ref enabled
    const snapshot = await page.locator('[role="main"]').ariaSnapshot({
      ref: true
    });
    
    // Log the snapshot with references
    console.log(snapshot);
    
    // Verify the snapshot contains references in the [ref=] format
    expect(snapshot).toContain('[ref=');
    
    // The snapshot should include the main element with its reference
    expect(snapshot).toMatch(/main \[ref=.*\]:/);
    
    // And the button element with its reference
    expect(snapshot).toMatch(/button "Save" \[ref=.*\]/);
    
    // We can verify the button directly using standard locators
    const saveButton = page.locator('button[aria-label="Save"]');
    await expect(saveButton).toHaveText('Save');
    
    // Extract the reference IDs for documentation or other purposes
    const mainMatch = snapshot.match(/main \[ref=([^\]]+)\]/);
    const buttonMatch = snapshot.match(/button "Save" \[ref=([^\]]+)\]/);
    
    if (mainMatch && buttonMatch) {
      console.log(`Main element ref ID: ${mainMatch[1]}`);
      console.log(`Button element ref ID: ${buttonMatch[1]}`);
      
      // The ref IDs can be used in documentation or for cross-referencing
      // elements in complex snapshots
    }
  });
}); 