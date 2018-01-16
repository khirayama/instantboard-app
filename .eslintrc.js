module.exports = {
  parser: 'typescript-eslint-parser',
  extends: [
    'eslint-config-xo-space/esnext',
    'eslint-config-xo-react/space',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
    'eslint-config-prettier/standard',
  ],
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-typescript',
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
    'no-restricted-globals': 0,

    // For ignoring to use `className` props for components
    'react/forbid-component-props': 0,

    // Break code for following rules when enable --fix option
    // 'react/jsx-first-prop-new-line': 0,
    // 'react/jsx-closing-bracket-location': 0,
    // 'react/self-closing-comp': 0,
    // 'react/jsx-indent': 0,
    // 'react/jsx-max-props-per-line': 0,
    // 'react/jsx-closing-tag-location': 0,
    // 'react/jsx-tag-spacing': 0,
    // 'react/no-unescaped-entities': 0,
    // 'react/void-dom-elements-no-children': 0,
    // 'react/jsx-indent-props': 0,

    // Does not work following rules
    // https://github.com/eslint/typescript-eslint-parser#known-issues
    'no-undef': 0,
    'no-unused-vars': 1,
  },
};
