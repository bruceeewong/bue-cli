'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const resolve = dir => path.join(__dirname, dir)

const port = process.env.port || process.env.npm_config_port || 9528

// vue-cli 配置详情 https://cli.vuejs.org/config/
module.exports = {
  // publicPath:
  // 指定静态资源的路径，默认是 /，静态资源前缀是: /static/
  // 如果要将网页部署在域名的某路径下。如: http://foo.github.io/bar/, 则 publicPath 需设置为 /bar/，这样页面上所有静态资源前缀就会配置成 /bar/static/
  // 大多数情况请保持默认设置 '/' 即可 !!!
  // 详情: http://cli.vuejs.org/config/#publicpath
  publicPath: '/', // 静态资源路径前缀, 如js|css|jpg...
  outputDir: 'dist', // 打包后构件输出的目录名称
  assetsDir: 'static', // 打包后存放静态资源的目录名称

  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 关闭
  devServer: {
    // 本地开发的端口:
    // 可在项目根目录下的命令行通过执行如下命令自定义端口:
    // npm run dev --port=9527 或者 port=95287 npm run dev
    port,
    open: false, // 构建完是否自动打开页面
    // 是否在页面显示各级别的提示信息
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置本地服务器的代理, 可用于mock与解决本地联调后端跨域的问题
    proxy: {
      // 本地mock规则配置示例
      // 将拦截当前环境的 VUE_APP_BASE_API 中定义前缀的请求, 转发到本地mock服务器
      // 如 xxx-api/login => mock/login
      // 详情: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ''
        }
      }

      // // 解决后端跨域问题,本地代理服务器示例
      // '^/api': {
      //   target: 'http://ip:port',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '',
      //   },
      // },
    },
    after: require('./mock/mock-server.js') // 启用本地mock服务器
  },
  configureWebpack: {
    name: defaultSettings.title || 'vue Admin Template', // 在setting文件配置的页面标题
    resolve: {
      alias: {
        '@': resolve('src') // 配置src目录别名为 @
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 设置 svg-sprite-loader 解析 svg 文件
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 使用icon组件自动加载 icons/svg中的 svg 文件
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 设置 preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 开发环境配置
    config
      .when(
        process.env.NODE_ENV === 'development',
        // sourceMap配置
        // https://webpack.js.org/configuration/devtool/#development
        config => config.devtool('eval-cheap-module-source-map')
      )

    // 非开发环境配置
    config
      .when(
        process.env.NODE_ENV !== 'development',
        // html-webpack-plugin增强配置
        // https://github.com/numical/script-ext-html-webpack-plugin
        (config) => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()

          // code splitting 将第三方依赖项拆分成 chunk
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })

          // creates a runtime file to be shared for all generated chunks.
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
