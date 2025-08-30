# Visual Testing & AI Analysis Setup

This directory contains comprehensive E2E tests designed to generate visual snapshots for AI-driven UX analysis and improvement.

## Overview

The visual testing harness is specifically designed to:
- Generate screenshots across multiple devices and screen sizes
- Capture interactive states (hover, focus, loading, etc.)
- Provide structured data for AI analysis
- Enable data-driven UX improvements

## Quick Start

### 1. Install Dependencies
```bash
npm install
npm run playwright:install
```

### 2. Run Visual Tests
```bash
# Run all visual tests and generate analysis report
npm run test:visual:analysis

# Run visual tests with headed browser (to see what's happening)
npm run test:visual:headed

# Run specific visual tests
npm run test:visual
```

### 3. Review Results
Check the generated files in `test-results/visual-analysis/`:
- Screenshots organized by device and page
- JSON report with metadata
- Markdown summary for easy review

## Test Structure

### Device Coverage
- **Mobile**: 375x667 (iPhone SE)
- **Small Mobile**: 320x568 (Small devices)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1440x900 (Standard desktop)
- **Large Desktop**: 1920x1080 (Large screens)

### Page Coverage
- Homepage (`/`)
- Quiz Start (`/quiz`)
- About (`/about`)
- Contact (`/contact`)
- Methodology (`/methodology`)
- Glossary (`/glossary`)

### Interaction States
- Default page load
- Hover states
- Focus states (keyboard navigation)
- Loading states
- Error states
- Selected states
- Progress states

## AI Analysis Workflow

### 1. Generate Visual Data
```bash
npm run test:visual:analysis
```

### 2. Review Generated Files
- `test-results/visual-analysis/` - Screenshots
- `test-results/visual-analysis-report.json` - Structured data
- `test-results/visual-analysis-summary.md` - Human-readable summary

### 3. AI Analysis Prompts
The system generates specific prompts for AI analysis:

#### Mobile UX Analysis
- Are touch targets appropriately sized?
- Is typography readable on small screens?
- Are there layout issues on mobile?
- How well does navigation work on mobile?

#### Responsive Design Analysis
- How does layout adapt across screen sizes?
- Are there breakpoint issues?
- Is content hierarchy maintained?
- Any device-specific UX problems?

#### Interaction Design Analysis
- Are hover and focus states clear?
- Do interactive elements provide feedback?
- Are there missing interactive states?
- How well do animations work?

#### Accessibility Analysis
- Are focus indicators visible?
- Is keyboard navigation logical?
- Any color contrast issues?
- Is content accessible to screen readers?

#### Quiz Flow Analysis
- Is the quiz flow intuitive?
- Are progress indicators clear?
- How well does the back button work?
- Any friction points in the experience?

### 4. Implement Improvements
Based on AI analysis, implement UX improvements and re-run tests to validate changes.

## Test Files

### `homepage.spec.ts`
Basic homepage functionality and responsive behavior.

### `visual-analysis.spec.ts`
Comprehensive visual analysis across all devices and pages.

### `quiz-flow-analysis.spec.ts`
Detailed quiz flow analysis with interaction states.

## Configuration

### Playwright Config (`playwright.config.ts`)
- Multiple device configurations
- Screenshot and video capture
- Parallel test execution
- Custom timeouts

### Percy Config (`.percy.js`)
- Multiple viewport widths
- Custom CSS for consistent snapshots
- Network idle timeouts

## Advanced Usage

### Custom Device Testing
Add new device configurations in `playwright.config.ts`:

```typescript
{
  name: 'Custom Device',
  use: { 
    viewport: { width: 1200, height: 800 }
  },
}
```

### Custom Interaction Testing
Add new interaction tests in the spec files:

```typescript
test('@visual custom interaction', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Custom interaction
  await page.click('.custom-element');
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: 'test-results/visual-analysis/custom-interaction.png',
    fullPage: true 
  });
});
```

### Batch Analysis
Run analysis on specific subsets:

```bash
# Only mobile tests
npx playwright test --grep @visual --project="Mobile Chrome"

# Only specific page
npx playwright test --grep "homepage.*@visual"
```

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run Visual Tests
  run: npm run test:visual:analysis
  
- name: Upload Screenshots
  uses: actions/upload-artifact@v2
  with:
    name: visual-analysis-screenshots
    path: test-results/visual-analysis/
```

### Percy Integration
For continuous visual regression testing:

```bash
# Set Percy token
export PERCY_TOKEN=your_token_here

# Run with Percy
npm run test:visual
```

## Troubleshooting

### Common Issues

1. **Tests fail to start**
   - Ensure dev server is running on port 3001
   - Check that all dependencies are installed

2. **Screenshots are empty**
   - Increase wait times in tests
   - Check for loading states that need to complete

3. **Inconsistent screenshots**
   - Use the provided Percy CSS to stabilize animations
   - Add appropriate wait times for dynamic content

### Debug Mode
Run tests with headed browser to see what's happening:

```bash
npm run test:visual:headed
```

## Contributing

When adding new visual tests:

1. Use the `@visual` tag for visual tests
2. Include appropriate wait times for animations
3. Test across multiple device sizes
4. Add metadata to the analysis report
5. Update this README if adding new features

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Percy Visual Testing](https://docs.percy.io/)
- [Visual Regression Testing Best Practices](https://www.percy.io/blog/visual-regression-testing-best-practices)
