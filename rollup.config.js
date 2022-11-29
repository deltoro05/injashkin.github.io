export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'docs/index.1gj1hs667.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
