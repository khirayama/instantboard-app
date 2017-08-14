module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-typescript',
  ],
  extends: [
    'eslint-config-xo-space/esnext',
    'eslint-config-xo-react/space',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    // Does not work following rules
    // https://github.com/eslint/typescript-eslint-parser#known-issues
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
    'space-infix-ops': 0,
    // For eslint --fix
    'react/jsx-indent': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-closing-tag-location': 0,
  },
};
