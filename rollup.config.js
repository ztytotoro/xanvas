import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/core/index.ts',
  output: {
    file: 'dist/index.web.js',
    format: 'iife',
    name: 'zovas'
  },
  plugins: [typescript(), resolve()]
};
