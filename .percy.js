module.exports = {
  version: 2,
  snapshot: {
    widths: [375, 768, 1024, 1440, 1920],
    minHeight: 1024,
    percyCSS: `
      /* Hide dynamic content that changes between snapshots */
      .animate-spin { animation: none !important; }
      [data-testid="loading"] { display: none !important; }
      
      /* Ensure consistent fonts */
      * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
      
      /* Stabilize animations */
      * { animation-duration: 0s !important; transition-duration: 0s !important; }
    `,
  },
  discovery: {
    allowedHostnames: ['localhost'],
    disallowedHostnames: [],
    networkIdleTimeout: 100,
  },
};
