import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.web.js',
      format: 'iife',
      name: 'zovas'
    },
    plugins: [typescript(), resolve()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm'
    },
    plugins: [typescript(), resolve()]
  }
];
