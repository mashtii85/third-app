module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react', 'prettier-standard'],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    before: true,
    cy: true,
    Cypress: true,
    localStorage: true,
    JSX: true
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': [
      1,
      { printWidth: 100, semi: false, singleQuote: true, trailingComma: 'none' }
    ],
    // GraphQL rules
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     env: 'apollo',
    //     schemaJson: require('./schema.json')
    //   }
    // ],

    'max-len': [
      'error',
      {
        // Ignore SVGs d=
        ignorePattern: 'd="([\\s\\S]*?)"|data:image|-----BEGIN PUBLIC KEY-----',
        ignoreTemplateLiterals: true,
        code: 100,
        tabWidth: 2
      }
    ],

    // Next JS does not require react import
    'react/react-in-jsx-scope': 'off',

    // Make sure imports are taken care off
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // don't force es6 functions to include space before paren
    'space-before-function-paren': 0,
    'react/prop-types': 0,

    // allow specifying true explicitly for boolean props
    'react/jsx-boolean-value': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/no-did-update-set-state': 0
  }
}
