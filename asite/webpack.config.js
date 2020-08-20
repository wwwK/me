// 自带的库
const path = require('path')
const VENOR = ["lodash"]
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        indexBundle: './pack/index.js', // 入口文件
        iplanBundle: './pack/iplan.js',
        // vendor: VENOR // 第三方库分包
    },
    output: {
        path: path.join(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
        // 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
        // [chunkhash]会自动根据文件是否更改而更换哈希
        filename: '[name].[chunkhash].js' // 打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 20000,
                  name: 'fonts/[name]-[hash].[ext]'
                }
            },
            {
                // 图片格式正则
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [
                      {
                        loader: 'url-loader',
                        // 配置 url-loader 的可选项
                        options: {
                        // 限制 图片大小 5000B，小于限制会将图片转换为 base64格式
                          limit: 5000,
                        // 超出限制，创建的文件格式
                        // build/images/[图片名].[hash].[图片格式]
                          name: 'images/[name].[hash].[ext]'
                       }
                      }
                    ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              },
              // 它会应用到普通的 `.js` 文件
              // 以及 `.vue` 文件中的 `<script>` 块
              {
                test: /\.js$/,
                loader: 'babel-loader'
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 清空旧文件
          // 注意在之前 HTML 文件中请务必删除之前引入的 JS 文件
        new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'tars-site',
            minify: { // 压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符与换行符
              minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',
            template: 'index.html',
            chunks: ['indexBundle']
          }),
        new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'tars-site-iplan',
            minify: { // 压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符与换行符
              minifyCSS: true// 压缩内联css
            },
            filename: 'iplan.html',
            template: 'iplan.html',
            chunks: ['iplanBundle']
          }),  
        new VueLoaderPlugin(),
        // new UglifyJsPlugin({test: /\.js(\?.*)?$/i})
      ],
}