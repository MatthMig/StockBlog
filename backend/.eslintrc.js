module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:cypress/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['jest'],
  rules: {
  }
}
