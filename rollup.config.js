import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'LeanContentApi',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      json(),
      resolve(),
      commonjs()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];