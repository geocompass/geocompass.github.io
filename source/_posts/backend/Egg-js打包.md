---
title: Egg.js打包
date: 2019-08-21 20:31:05
author: LH
categories: 后端
tags:
    - Egg.js
---
 **本文由 [@小刘](https://github.com/MrSmallLiu) 原创，转载请注明出处。**
 &nbsp; &nbsp; &nbsp; &nbsp;*github示例地址：https://github.com/MrSmallLiu/pkg-egg-example*
 &nbsp; &nbsp; &nbsp; &nbsp;打包Node.js代码的工具有很多，有些工具在打包时将自己写的代码打包为二进制文件配合node_modules一起使用，有些工具将全部代码打包为二进制，个人比较偏向于全部打包，例如[pkg](https://github.com/zeit/pkg)，都可以支持express、koa等框架打包，但是对于将koa框架封装后的Egg.js框架打包都没有说明如何使用，我在多次尝试后，加之阅读一部分Egg.js源码后终于利用[pkg](https://github.com/zeit/pkg)成功的打包。如下介绍如何利用**pkg**打包Egg.js代码。
 ## 利用pkg打包Egg.js代码
 	（上面嘟囔了一堆废话，终于步入正题。） 	
**pkg**是将整个工程打包为一个二进制文件，包括node运行环境一起打包，非常方便迁移，而且不需要客户环境重新部署Node.js以及下载相关依赖，具体步骤如下： 
  ### 安装[pkg](https://github.com/zeit/pkg)(参考pkg)
 ```javascript
 	npm install pkg -g
 ```
 ### 配置Egg.js的public路径。由于打包后为二进制文件，对于某些用户将前端代码放在Egg.js工程目录下的将不能操作，于是修改Egg.js的public路径配置到运行路径下：
 ```javascript
	// 修改config/config.default.js
	config.static = {
	        prefix: '/',
	        dir: process.cwd() + '/public'
	    }
 ```
 ### 配置Egg.js的运行时路径。由于Egg.js运行时会生成run文件夹以及相关文件，而pkg打包后为二进制文件，不能在继续进行写操作，故将rundir配置到运行路径下：
 ```javascript
	 //修改config/config.default.js
	config.rundir = process.cwd() + '/run'
 ```
 ### 修改package.json配置pkg相关参数：
*  **将代码以静态文件方式添加到打包中：**
```javascript
	//修改package.json，增加pkg节点
	"pkg": {
	    "assets": [
	      "./config/*.js",
	      "./app.js",
	      "./app/**/*.js",
	      "./node_modules/nanoid/**/*.js"  //该行为必须添加，由于Egg.js使用nanoid库，其中用到一个文件pkg未能解析，于是手动添加
   			]
   		}
```
* **配置pkg入口：**
```javascript
	// 修改package.json，增加bin节点，指定入口文件
	"bin": "build.js"
	// build.js文件内容
	require(__dirname + '/node_modules/egg-scripts/bin/egg-scripts.js')
```
* **配置build命令**
```javascript
	// 修改package.json,在scripts下增加build命令
	"scripts": {
	    "build": "pkg . --targets node8-linux-x64 --out-path /usr/dist  --debug"
	  }
	// --targets 指定node版本为8以及linux-x64
	// --out-path 指定打包后文件输出路径
	// --debug 指定debug模式编译
```
### 开始打包
```javascript
	// 初次打包时间较长，后续打包pkg会使用node缓存，提高打包效率
	npm run build
```
### 运行
```javascript
	./test_pkg start /snapshot/test_pkg --port=9001 --title=test_pkg
	// ./test_pkg 打包后的二进制文件
	// /snapshot/test_pkg 其中/snapshot为必须路径，test_pkg为工程目录路径
	// --port --title等支持与平常启动时的任意命令参数
```
以上即完成了Egg.js的项目打包工作，这时可能有人会想到**数据库相关配置怎么动态来改变呢？** **C++编译的模块能否支持打包呢？**，那请继续阅读。 
## 扩展
### 如何支持动态config
可能有人会想到利用Egg.js的启动周期来做呀，那么说对了，就是利用**configWillLoad**周期来做，在项目中创建app.js文件（如果已经有的请忽略），利用周期读取外部config.js，然后替换config/config.default.js内容，示例代码如下：
```javascript
// 替换sequelize的storage，替换dataPath路径
var fs = require('fs');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    configWillLoad() {
        let customConfig = require(process.cwd() + '/config.js');
        this.app.config.sequelize.storage = customConfig.dbPath;
        this.app.config.dataPath = customConfig.dataPath;
    }
}
 
module.exports = AppBootHook;
```
<font color=red>***注意***</font>
Node.js大部分用户应该都会使用sequelize，而对于Egg.js使用egg-sequelize，由于egg-sequelize周期中包含agent.js，启动时读取config/config.default.js，会导致启动失败，于是本人修改了一版egg-sequelize_pkg用于打包使用，除配置名称差异外使用方法与egg-sequelize一致，不需要修改原有代码,如下配置更改即可
```javascript
// {app_root}/config/plugin.js
exports.sequelizePkg = {
  enable: true,
  package: 'egg-sequelize_pkg',
};
// {app_root}/config/config.default.js
exports.sequelizePkg = {
};
```
github地址为：https://github.com/MrSmallLiu/egg-sequelize_pkg *欢迎提问题，也欢迎star*
### C++模块引入
pkg介绍对于C++编译的.node模块，在打包时不会将其打包进二进制文件中，故需要特殊处理，目前是修改源码引用（各位有好的办法可以推荐给我）,然后将.node模块拿到运行目录下：
* 修改node_modules中对应模块源码的require二进制文件的地方，将其修改为：
```javascript
// 以node-sqlite3为例
将lib/sqlite3.js中的
var binding = require(binding_path);
修改为
var binding = require(process.cwd()+'/node_sqlite3.node')
```
* 将源码中的node_sqlite3.node文件拷贝到编译后的运行目录，将整个文件夹zip即可在任何地方运行
---
以上介绍了如何利用pkg进行打包Egg.js工程，如有疑问可以联系作者或者下方评论，一起讨论。
*QQ: 1016817543 邮箱：1016817543@qq.com  github：https://github.com/MrSmallLiu (欢迎star)*


	 
