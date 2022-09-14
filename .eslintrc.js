module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/html-indent': ['error', 4],
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'], // Reasoning behind using dangling commas -> https://github.com/airbnb/javascript#commas--dangling
        'no-useless-constructor': 'off', // che: Bug in rule - unless disabled makes eslint crash
        'standard/no-callback-literal': 'off', // che: useless rule
        eqeqeq: ['error', 'smart'],
        'no-return-assign': 'off',
        'prefer-promise-reject-errors': 'off',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'space-before-function-paren': ['error', 'never'],
        // 'vue/html-closing-bracket-newline': [
        //     'error',
        //     {
        //         singleline: 'never',
        //         multiline: 'never',
        //     },
        // ],
        // 'vue/html-self-closing': ['error', {
        //     html: {
        //         void: 'never',
        //         normal: 'any',
        //         component: 'always',
        //     },
        //     svg: 'always',
        //     math: 'always',
        // }],
        // 'vue/html-closing-bracket-spacing': ['error', {
        //     startTag: 'never',
        //     endTag: 'never',
        //     selfClosingTag: 'never',
        // }],
        // 'vue/max-attributes-per-line': ['error', {
        //     'singleline': {
        //         'max': 4,
        //     },      
        //     'multiline': {
        //         'max': 1,
        //     },
        // }],
        // 'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-attribute-name': 0,
        'vue/valid-model-definition': 0,
        'vue/first-attribute-linebreak': 1,
        'vue/require-default-prop': 0,
        'vue/require-explicit-emits': 0,
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'tailwindcss/no-custom-classname': 'off',
    },
};
