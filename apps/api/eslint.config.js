import config from '@platform/tooling/eslint'

export default [
    ...config,
    {
        rules: {
            '@typescript-eslint/require-await': ['off'],
        },
    },
]
