import babel from 'rollup-plugin-babel'
import common from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  plugins: [
    babel(),
    common(),
    resolve(),
    minify({comments: false})
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