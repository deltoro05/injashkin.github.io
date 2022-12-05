export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'dev/index.1gjhpaa2l.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
