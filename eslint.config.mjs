import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      '*.d.ts',
      '_document.tsx',
      '_app.tsx',
      '*.config.js',
      '*.mjs',
      '.next/**',
      'node_modules/**',
      'storybook-static/**',
      'out/**',
      'build/**',
    ],
  }
);
