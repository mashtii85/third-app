// todo: import locales
module.exports = {
  i18n: {
    locales: ['en-gb', 'en', 'es', 'ar'],
    defaultLocale: 'en',
    react: {
      useSuspense: false
    },
    localeDetection: false,
    // disable prerender on production env
    reloadOnPrerender: true
  }
}
