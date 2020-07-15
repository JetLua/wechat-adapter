import babel from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import common from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      babelHelpers: 'bundled'
    }),
    common(),
    resolve(),
    terser({
      output: {comments: false}
    })
  ],
  output: [
    {
      file: 'dist/wechat-adapter.min.js',
      format: 'umd',
      name: 'wechat-adapter',
      sourcemap: true
    },
    {
      file: 'dist/wechat-adapter.es.js',
      format: 'esm',
      name: 'wechat-adapter',
      sourcemap: true
    }
  ]
}
