import { defineConfig } from 'cypress';

// To temporarily test against a LOCAL production environment uncomment below
// process.env.CI_TEST = 'true';

// If running on CI, NextJS will be running as production and expect "/admin-portal"
const BASE_URL = process.env.CI_TEST === 'true' ? '/admin-portal' : '';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000${BASE_URL}`,
    supportFile: false,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
