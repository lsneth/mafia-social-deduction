const { defineConfig } = require('cypress');
const tasks = require('./cypress/plugins');
process.env.TS_NODE_PROJECT = 'tsconfig.cypress.json';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      tasks(on, config); // https://github.com/orgs/supabase/discussions/6177
    },
    baseUrl: 'http://localhost:8081',
  },
  screenshotOnRunFailure: false,
  viewportWidth: 375,
  viewportHeight: 667,
  'ts-node': {
    project: 'tsconfig.cypress.json',
  },
});
