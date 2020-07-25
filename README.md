# 我的 web 应用

* [tuaran.github.io](https://tuaran.github.io)
* [前端书签网](http://febm.tuaran.site)
* [每日一立](http://ddup.tuaran.site)
* [图床服务](http://120.78.205.57:3000)

## 实现思路
* [前端书签网](http://febm.tuaran.site)

[README](https://github.com/TUARAN/FEMB#febm)

思路：采用 vuecli3 脚手架搭建。将浏览器书签导出为 x.html，采用 node 读取本地文件解析成书签树格式，将书签树按照指定样式绘制。

* [每日一立](http://ddup.tuaran.site)

思路：采用 dayspan-vuetify 开源库，但是该开源库的数据存储方式是存 localstorage，数据只能本地保存。所以考虑用 express 做服务，post 数据存在 mysql 中，然后 get 获取。以达到数据线上存储的目的。

1. 采用 exprss 作为服务器，axios 作请求库，本地开发 vuecli2 proxy 作代理。
2. express 连接数据库：[mysql](https://expressjs.com/zh-cn/guide/database-integration.html)  [node-express-mysql-demo](https://github.com/lihao336991/node-express-mysql)
3. centos 安装 mysql [centos 安装 mysql](http://www.glmapper.com/2019/01/05/mysql-on-linux/) [navicat12 破解](https://defcon.cn/513.html)
4. 备注：初始安装，用户名为 root密码为空，需修改密码。

//TODO:数据的存储和读取

* [图床服务](http://120.78.205.57:3000)

思路：采用 Express 搭建，支持多图上传。

1. 实现图片的上传，存储到服务器，重命名。
2. 图片读取瀑布流展示。

//TODO:优化 UI

## 技术栈
### vuetify
[vuetify](https://vuetifyjs.com/zh-Hans/getting-started/quick-start/)

### express
[generator 创建](https://www.expressjs.com.cn/starter/generator.html)

### dayspan-vuetify
[dayspan-vuetify](https://github.com/ClickerMonkey/dayspan-vuetify)

### nginx
* nginx 配置 SSL 证书
* http return https
* 多 server

### JS 瀑布流
[瀑布流](https://www.jianshu.com/p/39c5f4beb575)

### 推荐 website
[made with vue.js](https://madewithvuejs.com)
