export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'dev/index.1gg9iopo3.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
