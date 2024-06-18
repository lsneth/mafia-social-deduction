import { defineConfig } from 'cypress'
import tasks from './cypress/plugins'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      tasks(on, config) // https://github.com/orgs/supabase/discussions/6177
    },
  },
  screenshotOnRunFailure: false,
})
