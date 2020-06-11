// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dayspan-vuetify-docs/example/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dayspan-vuetify-docs/example'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  lib: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'lib',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'docs',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    proxyTable: {
      //将www.exaple.com印射为/api
      '/api': {
        //设置调用的接口域名和端口号
        target: 'http://localhost:3000/',
        // 如果是https接口，需要配置这个参数
        secure: false,  
        //是否跨域
        changeOrigin: true,
        pathRewrite: {
          //这里理解成用'/api'代替'target'里面的地址，后面组件中我们调接口时直接用'api'代替 比如我要调用'http://www.exaple.com:8602/login/login'，直接写'/api/login/login'即可
          '^/api': '/'
          }
        }
      },
  }
}
