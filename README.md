# me
buila a site all about "me"

# about technology
## 选型
### vuetify
[vuetify](https://vuetifyjs.com/zh-Hans/getting-started/quick-start/)
### express
[generator 创建](https://www.expressjs.com.cn/starter/generator.html)


## 力荐 website
[made with vue.js](https://madewithvuejs.com)
## 工具架
### dayspan-vuetify
[dayspan-vuetify](https://github.com/ClickerMonkey/dayspan-vuetify)

# about production
## 博客站点
[tuaran.github.io](https://tuaran.github.io)
## web 前端应用
* [前端书签网]()
* [日立]()

思路：采用 dayspan-vuetify 开源库，但是该开源库的数据存储方式是存 localstorage，数据只能本地保存。所以考虑用 express 做服务，post 数据存在 mysql 中，然后 get 获取。以达到数据线上存储的目的。

1. 采用 exprss 作为服务器，axios 作请求库，本地开发 vuecli2 proxy 作代理。
2. express 连接数据库：[mysql](https://expressjs.com/zh-cn/guide/database-integration.html)  [node-express-mysql-demo](https://github.com/lihao336991/node-express-mysql)
3. centos 安装 mysql [centos 安装 mysql](http://www.glmapper.com/2019/01/05/mysql-on-linux/) [navicat12 破解](https://defcon.cn/513.html)

```
// mysql8.0 修改密码
// 初始密码为空
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxx';  
```