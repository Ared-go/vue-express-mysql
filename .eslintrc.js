module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-multiple-empty-lines': 0,
        'indent': 0,
        'eol-last': 0,
        'space-before-function-paren': 0,
        'semi': 0,
        'no-trailing-spaces': 0,
        'key-spacing': 0,
        'object-curly-spacing': 0,
        'comma-spacing': 0,
        'space-in-parens': 0,
        'spaced-comment': 0,
        'semi-spacing': 0,
        'keyword-spacing': 0,
        'no-irregular-whitespace': 0,
        'quotes': 0,
        'space-infix-ops': 0,
        'space-before-blocks': 0,
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        'padded-blocks': 0,
        'no-undef': 0,
        'no-multi-spaces': 0,
        'quote-props': 0,
        'no-dupe-keys': 0,
        'vue/no-dupe-keys': 0,
        'func-call-spacing': 0,
        'no-unneeded-ternary': 0,
        'no-unused-vars': 0,
        'no-useless-return': 0,
        'comma-dangle': 0
    }
}