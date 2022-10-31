const copy = require('rollup-plugin-copy');
const commonjs = require('@rollup/plugin-commonjs');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const typescript = require('@rollup/plugin-typescript');
const replace = require('@rollup/plugin-replace');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const wpGlobals = {
  'react': 'React',
  '@wordpress/data': 'wp.data',
  '@wordpress/i18n': 'wp.i18n',
  '@wordpress/components': 'wp.components',
  '@wordpress/elements': 'wp.elements',
  '@wordpress/hooks': 'wp.hooks',
  '@wordpress/core-data': 'wp.coreData',
}

const replaceValues = {
  '@@text_domain': 'lzb-entity-select',
  '@@plugin_version': require('./package.json').version,
}

module.exports = {
  input: './src/lzb-entity-select.tsx',
  output: {
    file: './dist/lzb-entity-select.js',
    format: 'iife',
    globals: { ...wpGlobals },
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({ preferBuiltins: false }),
    commonjs(),
    replace({
      preventAssignment: true,
      include: ['./src/*'],
      delimiters: ['', ''],
      values: replaceValues,
    }),
    copy({
      targets: [{
        src: 'src/*.php',
        dest: 'dist/',
        transform: (contents, filename) => {
          let replaced = contents.toString();
          Object.keys(replaceValues).forEach((value) => {
            replaced = replaced.replace(new RegExp(value, 'g'), replaceValues[value]);
          });
          return replaced;
        }
      }],
    }),
    typescript(),
  ],
  external: [
    ...Object.keys(wpGlobals)
  ]
}