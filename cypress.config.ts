import { defineConfig } from 'cypress'
import tasks from './cypress/plugins'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      tasks(on, config) // https://github.com/orgs/supabase/discussions/6177
    },
    baseUrl: 'http://localhost:8081',
  },
  screenshotOnRunFailure: false,
  viewportWidth: 375,
  viewportHeight: 667,
})
