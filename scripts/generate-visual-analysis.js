#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration for visual analysis
const ANALYSIS_CONFIG = {
  devices: {
    mobile: { width: 375, height: 667, name: 'Mobile' },
    tablet: { width: 768, height: 1024, name: 'Tablet' },
    desktop: { width: 1440, height: 900, name: 'Desktop' },
    large: { width: 1920, height: 1080, name: 'Large Desktop' },
    small: { width: 320, height: 568, name: 'Small Mobile' }
  },
  pages: [
    { path: '/', name: 'Homepage', description: 'Main landing page with quiz CTA' },
    { path: '/quiz', name: 'Quiz Start', description: 'Quiz onboarding and first question' },
    { path: '/about', name: 'About', description: 'Information about the project' },
    { path: '/contact', name: 'Contact', description: 'Contact form and information' },
    { path: '/methodology', name: 'Methodology', description: 'Detailed methodology explanation' },
    { path: '/glossary', name: 'Glossary', description: 'Political terms and definitions' }
  ],
  interactions: [
    { name: 'hover', description: 'Hover states on interactive elements' },
    { name: 'focus', description: 'Keyboard focus states for accessibility' },
    { name: 'loading', description: 'Loading states and transitions' },
    { name: 'error', description: 'Error states and error handling' }
  ]
};

function generateAnalysisReport() {
  const report = {
    timestamp: new Date().toISOString(),
    project: 'AlignUK',
    description: 'Visual analysis report for AI-driven UX improvement',
    configuration: ANALYSIS_CONFIG,
    screenshots: [],
    recommendations: {
      mobile: [],
      tablet: [],
      desktop: [],
      accessibility: [],
      general: []
    }
  };

  // Generate screenshot metadata
  const screenshotDir = path.join(__dirname, '../test-results/visual-analysis');
  
  if (fs.existsSync(screenshotDir)) {
    const files = fs.readdirSync(screenshotDir);
    
    files.forEach(file => {
      if (file.endsWith('.png')) {
        const filePath = path.join(screenshotDir, file);
        const stats = fs.statSync(filePath);
        
        const screenshot = {
          filename: file,
          path: `test-results/visual-analysis/${file}`,
          size: stats.size,
          created: stats.birthtime,
          device: extractDeviceFromFilename(file),
          page: extractPageFromFilename(file),
          interaction: extractInteractionFromFilename(file),
          type: extractTypeFromFilename(file)
        };
        
        report.screenshots.push(screenshot);
      }
    });
  }

  // Generate analysis prompts for AI
  report.aiAnalysisPrompts = generateAIAnalysisPrompts(report.screenshots);
  
  return report;
}

function extractDeviceFromFilename(filename) {
  if (filename.includes('mobile')) return 'mobile';
  if (filename.includes('tablet')) return 'tablet';
  if (filename.includes('desktop')) return 'desktop';
  if (filename.includes('large')) return 'large';
  if (filename.includes('small')) return 'small';
  return 'unknown';
}

function extractPageFromFilename(filename) {
  if (filename.includes('homepage')) return 'homepage';
  if (filename.includes('quiz')) return 'quiz';
  if (filename.includes('about')) return 'about';
  if (filename.includes('contact')) return 'contact';
  if (filename.includes('methodology')) return 'methodology';
  if (filename.includes('glossary')) return 'glossary';
  return 'unknown';
}

function extractInteractionFromFilename(filename) {
  if (filename.includes('hover')) return 'hover';
  if (filename.includes('focus')) return 'focus';
  if (filename.includes('loading')) return 'loading';
  if (filename.includes('error')) return 'error';
  if (filename.includes('selected')) return 'selected';
  if (filename.includes('skip')) return 'skip';
  if (filename.includes('back')) return 'back';
  return 'default';
}

function extractTypeFromFilename(filename) {
  if (filename.includes('viewport')) return 'viewport';
  if (filename.includes('flow')) return 'flow';
  if (filename.includes('progress')) return 'progress';
  return 'fullpage';
}

function generateAIAnalysisPrompts(screenshots) {
  const prompts = {
    mobileAnalysis: {
      title: 'Mobile UX Analysis',
      description: 'Analyze mobile screenshots for UX improvements',
      screenshots: screenshots.filter(s => s.device === 'mobile'),
      questions: [
        'Are touch targets appropriately sized for mobile interaction?',
        'Is the typography readable on small screens?',
        'Are there any layout issues on mobile devices?',
        'How well does the navigation work on mobile?',
        'Are there any accessibility issues on mobile?'
      ]
    },
    responsiveAnalysis: {
      title: 'Responsive Design Analysis',
      description: 'Compare screenshots across devices for consistency',
      screenshots: screenshots.filter(s => s.type === 'fullpage'),
      questions: [
        'How does the layout adapt across different screen sizes?',
        'Are there any breakpoint issues?',
        'Is the content hierarchy maintained across devices?',
        'Are there any device-specific UX problems?'
      ]
    },
    interactionAnalysis: {
      title: 'Interaction Design Analysis',
      description: 'Analyze interactive states and micro-interactions',
      screenshots: screenshots.filter(s => s.interaction !== 'default'),
      questions: [
        'Are hover and focus states clear and accessible?',
        'Do interactive elements provide appropriate feedback?',
        'Are there any missing interactive states?',
        'How well do animations and transitions work?'
      ]
    },
    accessibilityAnalysis: {
      title: 'Accessibility Analysis',
      description: 'Review accessibility features and compliance',
      screenshots: screenshots.filter(s => s.interaction === 'focus'),
      questions: [
        'Are focus indicators visible and clear?',
        'Is keyboard navigation logical and complete?',
        'Are there any color contrast issues?',
        'Is the content accessible to screen readers?'
      ]
    },
    quizFlowAnalysis: {
      title: 'Quiz Flow Analysis',
      description: 'Analyze the quiz user experience flow',
      screenshots: screenshots.filter(s => s.page === 'quiz'),
      questions: [
        'Is the quiz flow intuitive and engaging?',
        'Are progress indicators clear and helpful?',
        'How well does the back button functionality work?',
        'Are there any friction points in the quiz experience?',
        'Is the question format clear and easy to understand?'
      ]
    }
  };

  return prompts;
}

function saveReport(report) {
  const reportPath = path.join(__dirname, '../test-results/visual-analysis-report.json');
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Visual analysis report saved to: ${reportPath}`);
  
  // Also generate a markdown summary
  const markdownPath = path.join(__dirname, '../test-results/visual-analysis-summary.md');
  const markdown = generateMarkdownSummary(report);
  fs.writeFileSync(markdownPath, markdown);
  console.log(`Visual analysis summary saved to: ${markdownPath}`);
}

function generateMarkdownSummary(report) {
  let markdown = `# Visual Analysis Report - AlignUK

Generated: ${report.timestamp}

## Overview
This report contains visual analysis data for AI-driven UX improvement of the AlignUK political alignment quiz.

## Screenshots Generated
Total screenshots: ${report.screenshots.length}

### By Device
${Object.entries(report.configuration.devices).map(([key, device]) => {
  const count = report.screenshots.filter(s => s.device === key).length;
  return `- ${device.name}: ${count} screenshots`;
}).join('\n')}

### By Page
${report.configuration.pages.map(page => {
  const count = report.screenshots.filter(s => s.page === page.name.toLowerCase()).length;
  return `- ${page.name}: ${count} screenshots`;
}).join('\n')}

## AI Analysis Prompts

### Mobile UX Analysis
${report.aiAnalysisPrompts.mobileAnalysis.questions.map(q => `- ${q}`).join('\n')}

### Responsive Design Analysis
${report.aiAnalysisPrompts.responsiveAnalysis.questions.map(q => `- ${q}`).join('\n')}

### Interaction Design Analysis
${report.aiAnalysisPrompts.interactionAnalysis.questions.map(q => `- ${q}`).join('\n')}

### Accessibility Analysis
${report.aiAnalysisPrompts.accessibilityAnalysis.questions.map(q => `- ${q}`).join('\n')}

### Quiz Flow Analysis
${report.aiAnalysisPrompts.quizFlowAnalysis.questions.map(q => `- ${q}`).join('\n')}

## Usage Instructions

1. Run the visual tests: \`npm run test:visual\`
2. Review the generated screenshots in \`test-results/visual-analysis/\`
3. Use this report with AI tools to analyze the visual output
4. Implement UX improvements based on AI recommendations

## File Structure
\`\`\`
test-results/visual-analysis/
├── homepage-*.png
├── quiz-*.png
├── about-*.png
├── contact-*.png
├── methodology-*.png
└── glossary-*.png
\`\`\`
`;

  return markdown;
}

// Main execution
if (require.main === module) {
  console.log('Generating visual analysis report...');
  const report = generateAnalysisReport();
  saveReport(report);
  console.log('Visual analysis report generation complete!');
}

module.exports = { generateAnalysisReport, generateAIAnalysisPrompts };
