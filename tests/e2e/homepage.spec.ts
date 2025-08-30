import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/AlignUK/);
    
    // Check for main navigation elements
    await expect(page.locator('h1')).toContainText('Discover Your Political Alignment');
    await expect(page.locator('button:has-text("Start Quiz Now")')).toBeVisible();
    await expect(page.locator('button:has-text("Learn More")')).toBeVisible();
  });

  test('@visual homepage desktop layout', async ({ page }) => {
    await page.goto('/');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Take visual snapshot
    await page.screenshot({ path: 'test-results/homepage-desktop.png', fullPage: true });
  });

  test('@visual homepage mobile layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Take visual snapshot
    await page.screenshot({ path: 'test-results/homepage-mobile.png', fullPage: true });
  });

  test('@visual homepage tablet layout', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Take visual snapshot
    await page.screenshot({ path: 'test-results/homepage-tablet.png', fullPage: true });
  });

  test('should navigate to quiz page', async ({ page }) => {
    await page.goto('/');
    
    // Click the Start Quiz button
    await page.click('button:has-text("Start Quiz Now")');
    
    // Should navigate to quiz page
    await expect(page).toHaveURL(/\/quiz/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click the Learn More button
    await page.click('button:has-text("Learn More")');
    
    // Should navigate to about page
    await expect(page).toHaveURL(/\/about/);
  });

  test('responsive navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile menu (if it exists)
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu button
    const mobileMenuButton = page.locator('[aria-label*="menu"], [aria-label*="Menu"], button:has-text("Menu")');
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Check that menu items are visible
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});
