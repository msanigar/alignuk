import { test, expect } from '@playwright/test';

// Device configurations optimized for AI analysis
const DEVICES = {
  mobile: { width: 375, height: 667, name: 'Mobile' },
  tablet: { width: 768, height: 1024, name: 'Tablet' },
  desktop: { width: 1440, height: 900, name: 'Desktop' },
  large: { width: 1920, height: 1080, name: 'Large Desktop' },
  small: { width: 320, height: 568, name: 'Small Mobile' }
};

// Key pages to analyze
const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/quiz', name: 'Quiz Start' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/methodology', name: 'Methodology' },
  { path: '/glossary', name: 'Glossary' }
];

test.describe('Visual Analysis for AI UX Review', () => {
  for (const device of Object.values(DEVICES)) {
    for (const page of PAGES) {
      test(`@visual ${page.name} - ${device.name}`, async ({ page: testPage }) => {
        // Set viewport
        await testPage.setViewportSize({ width: device.width, height: device.height });
        
        // Navigate to page
        await testPage.goto(page.path);
        
        // Wait for animations and content to load
        await testPage.waitForTimeout(2000);
        
        // Take full page screenshot for AI analysis
        await testPage.screenshot({ 
          path: `test-results/visual-analysis/${page.name.toLowerCase()}-${device.name.toLowerCase()}.png`,
          fullPage: true 
        });
        
        // Take viewport screenshot (what user sees initially)
        await testPage.screenshot({ 
          path: `test-results/visual-analysis/${page.name.toLowerCase()}-${device.name.toLowerCase()}-viewport.png`,
          fullPage: false 
        });
      });
    }
  }

  test.describe('Interactive States Analysis', () => {
    test('@visual homepage interactive states - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForTimeout(1000);

      // Hover over primary button
      await page.hover('button:has-text("Start Quiz Now")');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/homepage-desktop-button-hover.png',
        fullPage: false 
      });

      // Hover over secondary button
      await page.hover('button:has-text("Learn More")');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/homepage-desktop-secondary-hover.png',
        fullPage: false 
      });
    });

    test('@visual quiz flow states - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/quiz');
      await page.waitForTimeout(2000);

      // Quiz onboarding state
      await page.screenshot({ 
        path: 'test-results/visual-analysis/quiz-onboarding-mobile.png',
        fullPage: true 
      });

      // Start quiz and capture first question
      await page.click('button:has-text("Start Quiz Now")');
      await page.waitForTimeout(2000);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/quiz-first-question-mobile.png',
        fullPage: true 
      });

      // Answer question and capture next state
      await page.click('.likert-option:has-text("4")');
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/quiz-answered-mobile.png',
        fullPage: true 
      });
    });
  });

  test.describe('Accessibility and UX Analysis', () => {
    test('@visual focus states - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForTimeout(1000);

      // Tab through interactive elements and capture focus states
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/homepage-desktop-focus-1.png',
        fullPage: false 
      });

      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/homepage-desktop-focus-2.png',
        fullPage: false 
      });
    });

    test('@visual loading states - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Simulate slow network
      await page.route('**/*', route => {
        route.continue();
      });
      
      await page.goto('/');
      await page.screenshot({ 
        path: 'test-results/visual-analysis/homepage-mobile-loading.png',
        fullPage: true 
      });
    });
  });

  test.describe('Content Analysis', () => {
    test('@visual typography and spacing - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/about');
      await page.waitForTimeout(2000);

      // Capture typography and content layout
      await page.screenshot({ 
        path: 'test-results/visual-analysis/about-typography-desktop.png',
        fullPage: true 
      });
    });

    test('@visual form elements - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/contact');
      await page.waitForTimeout(2000);

      // Capture form layout and input states
      await page.screenshot({ 
        path: 'test-results/visual-analysis/contact-form-mobile.png',
        fullPage: true 
      });

      // Focus on input field
      await page.click('input[type="email"]');
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/visual-analysis/contact-form-input-focus-mobile.png',
        fullPage: false 
      });
    });
  });

  test.describe('Error States', () => {
    test('@visual error handling - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigate to non-existent page
      await page.goto('/non-existent-page');
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: 'test-results/visual-analysis/404-error-mobile.png',
        fullPage: true 
      });
    });
  });
});
