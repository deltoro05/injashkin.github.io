'use strict';

const fs = require('fs');

const hash = Date.now().toString(32);

// ---------------------------------------------------------------

const contentIndexPug = fs.readFileSync('src/layouts/base/index.pug', 'utf-8');

const replacer = contentIndexPug
  .replace(
    /{stylesheetHref = '\/index.*.css'}/,
    `{stylesheetHref = '/index.${hash}.css'}`
  )
  .replace(/{scriptSrc = '\/index.*.js'}/, `{scriptSrc = '/index.${hash}.js'}`);

fs.writeFileSync('src/layouts/base/index.pug', replacer);

// ---------------------------------------------------------------

const contentRollupConfig = fs.readFileSync('rollup.config.js', 'utf-8');

const replacerRollup = contentRollupConfig.replace(
  /file: 'docs\/index.*.js',/,
  `file: 'docs/index.${hash}.js',`
);

fs.writeFileSync('rollup.config.js', replacerRollup);

// ---------------------------------------------------------------

const contentRollupConfigDev = fs.readFileSync('rollup.config.dev.js', 'utf-8');

const replacerRollupDev = contentRollupConfigDev.replace(
  /file: 'dev\/index.*.js',/,
  `file: 'dev/index.${hash}.js',`
);

fs.writeFileSync('rollup.config.dev.js', replacerRollupDev);

// ---------------------------------------------------------------

const contentFile = fs.readFileSync('options.json');
const obj = JSON.parse(contentFile);
obj.stylesheetHref = `/index.${hash}.css`;
obj.scriptSrc = `/index.${hash}.js`;
fs.writeFileSync('options.json', `${JSON.stringify(obj)}`);

// ---------------------------------------------------------------

fs.renameSync('tmp/index.css', `tmp/index.${hash}.css`);
