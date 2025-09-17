import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
    // 基础 JavaScript 配置
    js.configs.recommended,

    // TypeScript 配置
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'prefer-const': 'error',
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'comma-dangle': ['error', 'only-multiline']
        },
    },

    // Vue 配置
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            vue,
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'never',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/require-default-prop': 'off',
            'vue/script-indent': ['error', 2, {
                baseIndent: 1,          // 相对于 <script> 标签的缩进（可选）
                switchCase: 1,          // switch case 语句的缩进（可选）
                ignores: []             // 需要忽略的节点（可选）
            }]
        },
    },
]
