---
title: 关于写作
date: 2019-08-21
categories: 写作
author: LOUSANPANG
tags:
    - 写作
cover_picture: /images/markdown.jpg
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
npm install
```

### 二、常见命令
#### 2.1 [命令](https://hexo.io/zh-cn/docs/commands)
``` bash
hexo g == hexo generate #生成静态文件，会在当前目录下生成一个新的叫做public的文件夹
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
* 需要注意`tags`和`categories`的写法，不然首页不能正确显示标签和摘要；
* `cover_picture`文章封面图，不填默认显示_config.yml配置的图片。

### 四、详细文档
[Hexo主题文档](https://blog.minhow.com/2017/08/01/blog/installation-configuration/)