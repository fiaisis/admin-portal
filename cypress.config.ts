import { defineConfig } from 'cypress';
import { BASE_URL } from 'src/utils/constants';

// To test against a production environment replace the import above with comments below
// const MOCK_PRODUCTION_NODE_ENV = 'production';
// const BASE_URL = MOCK_PRODUCTION_NODE_ENV !== 'production' ? '' : '/admin-portal';

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
