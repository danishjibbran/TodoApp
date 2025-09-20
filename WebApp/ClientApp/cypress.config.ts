import {defineConfig} from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  execTimeout: 5000,
  requestTimeout: 5000,
  responseTimeout: 5000,
  pageLoadTimeout: 5000,
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
    setupNodeEvents(on, config) {
      // component testing node events setup code
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
