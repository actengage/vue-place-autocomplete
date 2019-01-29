module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  // add your custom rules here
  rules: {
    // Ensure no space after keywords like if.
    'keyword-spacing': ["error", {
      "overrides": {
        "if": { "after": false },
        "for": { "after": false },
        "while": { "after": false }
      }
    }],
    // Use alternative brace style
    'brace-style': ['error', 'stroustrup'],
    // No spaces before parens
    'space-before-function-paren': ['error', 'never'],
    // Indent for tabs because spaces suck
    'indent': ['error', 4],
    // Semi colons always where they need to be
    'semi': [2, 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}