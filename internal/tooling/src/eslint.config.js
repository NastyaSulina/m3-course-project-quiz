import jseslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['**/dist']),
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [jseslint.configs.recommended, tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
            },
        },
        rules: {},
    },
])
