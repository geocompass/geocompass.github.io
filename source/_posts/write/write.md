---
title: 关于写作
date: 2019-08-21
categories: 写作
author: LOUSANPANG
tags:
    - 写作
cover_picture: https://wx1.sinaimg.cn/mw690/006n3OP2gy1g68har8gq4j31cq0u012u.jpg
top: 2
---

![miho](https://wx1.sinaimg.cn/mw690/006n3OP2gy1g68har8gq4j31cq0u012u.jpg)

### 一、安装
#### 1.1 安装前提
* [Node.js (Should be at least nodejs 6.9)](https://nodejs.org/en/)
* [Git](https://git-scm.com/)
``` bash
npm install -g hexo-cli
```
#### 1.2 下载源码目录
``` bash
git clone https://github.com/geocompass/geocompass.github.io.git
```
#### 1.3 安装依赖
``` bash
cd geocompass.github.io

git checkout hexo

npm install
```
#### 1.4 编码
``` bash
cd source/_posts

cd bigdata/ #在对应适合你的文件夹下边建立 博客文档

hexo n [Your Blod Name]

编码格式请参照 3.1 关于写作
```
#### 1.5 部署
``` bash
git pull # 建议每次都要更新哦 也许你在书写过程中，有人已经提交code啦

手动将子目录的 .git 文件复制粘贴到 .deploy_git 文件中
hexo g
hexo d

在hexo分支提交到远程你的代码例如：
git add --a
git commit -a -m 'Your name commit pages'
git push
```

### 二、常见命令
#### 2.1 [命令](https://hexo.io/zh-cn/docs/commands)
``` bash
hexo g == hexo generate #生成静态文件，在当前目录下生成一个新的叫做public的文件夹
hexo s == hexo server #启动本地web服务，用于博客的预览
hexo d == hexo deploy #部署播客到远端（比如github, heroku等平台）
hexo clean #清除缓存文件 (db.json) 和已生成的静态文件 (public)
hexo n == hexo new "postName" #新建文章
hexo n == hexo new page "pageName" #新建页面
``` 

### 三、关于写作
#### 3.1 [书写](https://github.com/WongMinHo/hexo-theme-miho/blob/master/_source/blog/installation-configuration.md)
``` bash
---
title: 关于书写
date: 2019-08-21
categories: 类别1
author: MinHow
tags:
    - 标签1
    - 标签2
cover_picture: /images/banner.jpg
top: 1
---
<!-- more -->
### 一、标题一
#### 1.1 标题1.1
``` 
说明：
* 需要注意 `tags` 和 `categories` 的写法，不然首页不能正确显示标签和摘要；
* `cover_picture` 文章封面图，不填默认显示_config.yml配置的图片。
* `cover_picture` 建议添加符合自己博客的主题图片。

### 四、详细文档
[Hexo主题文档](https://blog.minhow.com/2017/08/01/blog/installation-configuration/)

### 五、常见问题
#### 5.1 部署不成功
* 请严格按照 `1.5 部署` 流程提交一下你的code, 也许你的问题会解决。
* 关于为什么要移动 `.git文件` 请查阅[Hexo部署报错Spawn failed及解决方案](https://perry96.com/archives/882898e3.html)
* 部署成功后网站并不是最新的，请清楚一下浏览器缓存，再尝试。
* 关于你的博客取用图片，你可以建立自己的`GitHub图片供应仓库`，例如[GitHub图片供应库](https://github.com/LOUSANPANG/Picture-library)
* 更多问题请提交[Issues](https://github.com/geocompass/geocompass.github.io/issues)
* 📝