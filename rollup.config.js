export default {
  input: 'src/index.js',

  watch: {
    include: './src/**',
    clearScreen: false,
  },

  output: {
    file: 'docs/index.1gp5cs5pm.js', //- эта строка обрабатывается регулярным выражением в scripts.js
    format: 'cjs',
  },
};
