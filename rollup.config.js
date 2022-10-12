export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'docs/index.1gdnjso4d.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'iife',
  },
};
