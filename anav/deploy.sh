#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# scp
# scp 命令将本地打包文件夹上传到 linux 服务器上，forever 持续集成，构建到 tuaran,site
# 需要输入 SSH 远程连接服务器的密码
scp -r ./build root@120.78.205.57:/root/www/443/


# 进入生成的文件夹
# 构建到 tuaran.github.io
# cd public

# git
# git init
# git add -A
# git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 需要输入 Github 密码
# git push -f https://github.com/TUARAN/tuaran.github.io.git master

# cd -