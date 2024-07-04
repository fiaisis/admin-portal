import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
