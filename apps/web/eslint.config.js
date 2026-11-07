import config from '@platform/tooling/eslint'
import globals from 'globals'

export default [
    ...config,
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        rules: {},
    },
]
