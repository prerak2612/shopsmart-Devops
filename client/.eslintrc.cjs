module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.{js,jsx}', 'src/__tests__/**/*.{js,jsx}'],
      env: { jest: true },
      globals: {
        global: 'readonly',
      },
    },
    {
      files: ['playwright.config.js', 'e2e/**/*.js'],
      env: { node: true },
    },
  ],
};

