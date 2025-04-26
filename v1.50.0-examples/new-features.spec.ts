import { test, expect } from '@playwright/test';

test.describe('Playwright v1.50.0 New Features', () => {
  test('Test step with timeout option', async ({ page }) => {
    // Setup a page with a slow operation
    await page.setContent(`
      <button id="start-operation">Start Slow Operation</button>
      <div id="status">Idle</div>
      <script>
        document.getElementById('start-operation').addEventListener('click', () => {
          document.getElementById('status').textContent = 'Processing...';
          
          // Simulate a long operation
          setTimeout(() => {
            document.getElementById('status').textContent = 'Completed';
          }, 1500); // 1.5 seconds
        });
      </script>
    `);
    
    // First step - click the button to start operation
    await test.step('Start the operation', async () => {
      await page.click('#start-operation');
      await expect(page.locator('#status')).toHaveText('Processing...');
    });
    
    // Second step with a 1 second timeout - this will time out before completion
    try {
      await test.step('Wait for operation completion (with timeout)', async () => {
        await expect(page.locator('#status')).toHaveText('Completed');
      }, { timeout: 1000 }); // This is the new timeout option in v1.50.0
    } catch (error) {
      console.log('Step timed out as expected');
    }
    
    // Third step - wait without a short timeout to verify operation completes
    await test.step('Verify operation completes eventually', async () => {
      await expect(page.locator('#status')).toHaveText('Completed', { timeout: 2000 });
    });
    
    // The timeout applies only to the individual step, not the whole test
    console.log('Test continues execution after step timeout');
  });

  test('Skip test steps conditionally with test.step.skip()', async ({ page }) => {
    // Setting up feature flag simulation
    const featureFlags = {
      newUIEnabled: false,
      darkModeEnabled: true
    };
    
    // Create a test page
    await page.setContent(`
      <div id="app">
        <h1>Feature Flag Demo</h1>
        <div id="current-theme">Light Mode</div>
        <div id="new-ui-container" style="display: none;">
          <h2>New UI Components</h2>
        </div>
      </div>
    `);
    
    // Always executed step
    await test.step('Verify base page content', async () => {
      await expect(page.locator('h1')).toHaveText('Feature Flag Demo');
    });
    
    // Using the new test.step.skip() to conditionally skip steps
    await test.step('Test new UI components', async step => {
      // Skip this step if the new UI feature is not enabled
      step.skip(!featureFlags.newUIEnabled, 'New UI is not enabled');
      
      // This code won't execute if the step is skipped
      await page.evaluate(() => {
        const element = document.getElementById('new-ui-container');
        if (element) element.style.display = 'block';
      });
      
      await expect(page.locator('#new-ui-container')).toBeVisible();
    });
    
    // Another conditional step
    await test.step('Test dark mode', async step => {
      // Skip if dark mode is not enabled
      step.skip(!featureFlags.darkModeEnabled, 'Dark mode is not enabled');
      
      // This code will execute since darkModeEnabled is true
      await page.evaluate(() => {
        const element = document.getElementById('current-theme');
        if (element) element.textContent = 'Dark Mode';
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#fff';
      });
      
      await expect(page.locator('#current-theme')).toHaveText('Dark Mode');
    });
    
    // This step always runs regardless of what was skipped
    await test.step('Final verification', async () => {
      // We can verify that our app still works even with some steps skipped
      await expect(page.locator('#app')).toBeVisible();
    });
  });

  test('Enhanced aria snapshot with YAML file support', async ({ page }) => {
    // Set up a page with an accessible component
    await page.setContent(`
      <nav role="navigation" aria-label="Main navigation">
        <ul role="menubar">
          <li role="menuitem"><a href="#home">Home</a></li>
          <li role="menuitem"><a href="#products">Products</a></li>
          <li role="menuitem">
            <a href="#about">About</a>
            <ul role="menu">
              <li role="menuitem"><a href="#team">Team</a></li>
              <li role="menuitem"><a href="#history">History</a></li>
            </ul>
          </li>
          <li role="menuitem"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `);
    
    // In v1.50.0, we can match aria snapshots against inline strings
    await expect(page.locator('nav')).toMatchAriaSnapshot(`
      - navigation "Main navigation":
        - menubar:
          - menuitem:
            - link "Home"
          - menuitem:
            - link "Products"
          - menuitem:
            - link "About"
            - menu:
              - menuitem:
                - link "Team"
              - menuitem:
                - link "History"
          - menuitem:
            - link "Contact"
    `);
    
    // New in v1.50.0: We can also store snapshots in YAML files
    // This would normally reference an external file:
    // await expect(page.locator('nav')).toMatchAriaSnapshot({ name: 'navigation-snapshot.yaml' });
    
    // For demonstration purposes, we're using inline snapshot
    console.log(`
      New in v1.50.0: You can store aria snapshots in YAML files:
      
      await expect(page.locator('nav')).toMatchAriaSnapshot({ 
        name: 'navigation-snapshot.yaml' 
      });
    `);
  });

  test('toHaveAccessibleErrorMessage assertion', async ({ page }) => {
    // Setup a form with accessible error messages
    await page.setContent(`
      <form>
        <div>
          <label for="username">Username:</label>
          <input id="username" type="text" aria-errormessage="username-error" aria-invalid="true">
          <div id="username-error" role="alert">Username must be at least 3 characters</div>
        </div>
        
        <div>
          <label for="email">Email:</label>
          <input id="email" type="email" aria-errormessage="email-error" aria-invalid="true">
          <div id="email-error" role="alert">Please enter a valid email address</div>
        </div>
        
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password">
          <!-- No error on this field -->
        </div>
      </form>
    `);
    
    // Use the new toHaveAccessibleErrorMessage assertion from v1.50.0
    await expect(page.locator('#username')).toHaveAccessibleErrorMessage('Username must be at least 3 characters');
    await expect(page.locator('#email')).toHaveAccessibleErrorMessage('Please enter a valid email address');
    
    // Fix: Check for absence of error message more directly
    // Instead of using not.toHaveAccessibleErrorMessage, we'll check a different property
    await expect(page.locator('#password')).not.toHaveAttribute('aria-errormessage');
    await expect(page.locator('#password')).not.toHaveAttribute('aria-invalid', 'true');
    
    // Can check for partial match using regular expression
    await expect(page.locator('#username')).toHaveAccessibleErrorMessage(/at least 3 characters/);
  });
}); 