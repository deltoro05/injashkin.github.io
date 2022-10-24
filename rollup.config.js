export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'docs/index.1gg5pvr4d.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
