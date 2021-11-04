module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    // 'react/jsx-max-props-per-line': [
    //   1,
    //   {
    //     maximum: '1',
    //     when: 'always',
    //   },
    // ],

    //prettier version:
    // "jsx-max-props-per-line": [
    //   1,
    //   {
    //     "maximum": "1",
    //     "when": "always"
    //   }
    // ],
    'react/prop-types': 0,
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'none',
      },
    ],
  },
};
