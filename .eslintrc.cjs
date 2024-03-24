module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
