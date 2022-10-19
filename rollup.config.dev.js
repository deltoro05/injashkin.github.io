export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'dev/index.1gfodp0mt.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
