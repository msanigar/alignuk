import { test, expect } from '@playwright/test';

test.describe('Quiz Flow Visual Analysis for AI UX Review', () => {
  test('@visual complete quiz flow - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 1. Quiz onboarding
    await page.goto('/quiz');
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-flow-1-onboarding-mobile.png',
      fullPage: true 
    });

    // 2. Start quiz
    await page.click('button:has-text("Start Quiz Now")');
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-flow-2-first-question-mobile.png',
      fullPage: true 
    });

    // 3. Answer first question
    await page.click('.likert-option:has-text("4")');
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-flow-3-first-answer-mobile.png',
      fullPage: true 
    });

    // 4. Navigate through a few more questions
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: `test-results/visual-analysis/quiz-flow-${4 + i}-question-${i + 2}-mobile.png`,
        fullPage: true 
      });
      
      // Answer with different values to test various states
      const answers = ['2', '6', '1'];
      const answerOption = page.locator(`.likert-option:has-text("${answers[i]}"), button:has-text("${answers[i]}")`);
      if (await answerOption.isVisible()) {
        await answerOption.click();
        await page.waitForTimeout(500);
      }
    }

    // 5. Test back button functionality
    await page.click('button:has-text("Back")');
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-flow-7-back-button-mobile.png',
      fullPage: true 
    });

    // 6. Continue to results (using quick test for demo)
    const quickTestButton = page.locator('button:has-text("Quick Test"), button:has-text("🚀")');
    if (await quickTestButton.isVisible()) {
      await quickTestButton.click();
      await page.waitForTimeout(5000); // Wait for results to load
      await page.screenshot({ 
        path: 'test-results/visual-analysis/quiz-flow-8-results-mobile.png',
        fullPage: true 
      });
    } else {
      // If quick test button not available, just capture the current state
      await page.screenshot({ 
        path: 'test-results/visual-analysis/quiz-flow-8-no-quick-test-mobile.png',
        fullPage: true 
      });
    }
  });

  test('@visual quiz interaction states - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/quiz');
    await page.waitForTimeout(2000);

    // Start quiz
    const startButton = page.locator('button:has-text("Start Quiz"), button:has-text("Start Quiz Now"), button:has-text("Take Quiz")');
    if (await startButton.isVisible()) {
      await startButton.click();
      await page.waitForTimeout(2000);
    } else {
      // If no start button, just wait and continue
      await page.waitForTimeout(2000);
    }

    // Test hover states on likert scale
    await page.hover('.likert-option:has-text("1")');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-likert-hover-1-desktop.png',
      fullPage: false 
    });

    await page.hover('.likert-option:has-text("7")');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-likert-hover-7-desktop.png',
      fullPage: false 
    });

    // Test selected state
    await page.click('.likert-option:has-text("4")');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-likert-selected-desktop.png',
      fullPage: false 
    });
  });

  test('@visual quiz accessibility - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/quiz');
    await page.waitForTimeout(2000);

    // Start quiz
    const startButton2 = page.locator('button:has-text("Start Quiz"), button:has-text("Start Quiz Now"), button:has-text("Take Quiz")');
    if (await startButton2.isVisible()) {
      await startButton2.click();
      await page.waitForTimeout(2000);
    } else {
      // If no start button, just wait and continue
      await page.waitForTimeout(2000);
    }

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-keyboard-focus-1-tablet.png',
      fullPage: false 
    });

    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-keyboard-focus-2-tablet.png',
      fullPage: false 
    });

    // Test keyboard selection
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-keyboard-selection-tablet.png',
      fullPage: false 
    });
  });

  test('@visual quiz progress and navigation - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/quiz');
    await page.waitForTimeout(2000);

    // Start quiz
    const startButton3 = page.locator('button:has-text("Start Quiz"), button:has-text("Start Quiz Now"), button:has-text("Take Quiz")');
    if (await startButton3.isVisible()) {
      await startButton3.click();
      await page.waitForTimeout(2000);
    } else {
      // If no start button, just wait and continue
      await page.waitForTimeout(2000);
    }

    // Capture progress bar states
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-progress-1-mobile.png',
      fullPage: true 
    });

    // Answer a few questions and capture progress updates
    for (let i = 0; i < 3; i++) {
      await page.click('.likert-option:has-text("4")');
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: `test-results/visual-analysis/quiz-progress-${i + 2}-mobile.png`,
        fullPage: true 
      });
    }

    // Test skip functionality
    await page.click('button:has-text("Skip this question")');
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'test-results/visual-analysis/quiz-skip-mobile.png',
      fullPage: true 
    });
  });
});
