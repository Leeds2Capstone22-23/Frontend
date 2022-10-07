module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
    // Necessary to ensure tsconfig is resolved
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style':0,
    'max-len': [1, 100, 2],
    'import/prefer-default-export': 0,
    'no-new': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 'off',
    // Allow _vars to be ignored
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    // Enforces a naming convention, but allows leading/trailing
    // underscores for everything except types
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  "settings": {
    "react": {
        "version": "detect"
        }
    }
};
