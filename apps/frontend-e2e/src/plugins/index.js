/**
 * Cypress - Plugins
 */
const dotenvPlugin = require('cypress-dotenv')

module.exports = async (on, config) => {
  // Load any CYPRESS_* environment variables defined in .env file so you can
  // access them via Cypress.env() from within tests.
  config = dotenvPlugin(config)

  // Look for Brave browser (currently on MacOS)
  // and add to browsers list if found
  // await findBrave().then((browser) => {
  //   if (browser) config.browsers = config.browsers.concat(browser)
  // })
  // require('cypress-watch-and-reload/plugins')
  return require('cypress-data-session/src/plugin')(on, config)

  // return config
}
