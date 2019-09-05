---
title: 前端工具-defineProperty实时监听globalState值的变化
date: 2019-09-05
categories: 前端
author: LOUSANPANG
tags:
    - 前端工具
    - react
    - taro
    - 小程序
cover_picture: https://i.loli.net/2019/09/05/xRBEi6pN8KJFHuS.gif
---

![defineproperty.gif](https://i.loli.net/2019/09/05/xRBEi6pN8KJFHuS.gif)

### 一、关于工具
#### 1.1 问题
* 在 `react、taro、微信小程序` 中如何做到像 `vue的watch方法` 一样去监听属性的变化？
* 虽然在 `taro、微信小程序` 中的 `app.js` 中`微信小程序的onLaunch taro的componentDidMount` 生命周期快于各个`page`页面的生命周期，
但是在`app.js`的`onLaunch或componentDidMount`中存在异步且执行时间很长的服务或者延时，那在`page`中的生命周期执行的函数可就不一定在它之后执行了。


#### 1.2 需求
- [ ] 预期行为

![预期行为](https://i.loli.net/2019/09/05/PYcpwaERIL3iTtv.png)

- [x] 实际行为

![definepropety2.png](https://i.loli.net/2019/09/05/zNqyR2j73rLx8cG.png)

#### 1.3 解决
* 使用同步`async await`去解决异步、延时等问题（缺点：使用同步就必须在同一个生命周期中去等待，造成代码赘余，不方便在各个页面使用。）
* 使用`Redux Mobx`数据管理工具（缺点：如果不是很多的跨组件数据监听，显的过于沉重。）
* 使用`Object.defineProperty`去实时监听`state、globalState`对象中的属性的变化。
#### 1.4 使用
```js
    // app.js
    globalData: {
        name: ''
    },
    onLaunch() {
        let obj = this.globalData
        setTimeout(() => {
        obj.name // 读取
        obj.name = 'lousanpang' // 设置
        }, 2000)
    }
```

```js
    // index.js
    $watch() {
        let obj = app.globalData
        Object.defineProperty(obj, "name", {
            configurable: true,
            enumerable: true,
            get() { // 在onLaunch中读取obj.name时会触发get函数
                console.log('%c get读取成功!', 'background:#1976D2;color:#ffffff')
            },
            set(value) { // 在onLaunch中设置obj.name时会触发set函数
                console.log(`%c set设置成功: ${value}`, 'background:#ff4400;color:#ffffff')
            }
        });
    }
    onLoad: function(options) {
        let obj = app.globalData
        this.$watch()
    }
```

![实例](https://i.loli.net/2019/09/05/pixQW2uAV36jCGM.gif)

### 二、 拓展defineProperty
#### 2.1 语法
* 语法
`Object.defineProperty(obj, prop, descriptor)`

* 参数说明：
```
    obj：必需。目标对象
    prop：必需。需定义或修改的属性的名字
    descriptor：必需。目标属性所拥有的特性
```

* descriptor 包含数据描述、存取器描述，6个属性
```
数据描述
    value: 设置属性的值
    writable: 值是否可以重写。true | false
    enumerable: 目标属性是否可以被枚举。true | false
    configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false
```

```
存取器描述
    get:function (){} | undefined,
    set:function (value){} | undefined
```

* 注意：当使用了getter或setter方法，不允许使用writable和value这两个属性

#### 2.2 使用
* 数据描述
```js
    let obj = {}
    Object.defineProperty(obj, "name", {
        value: "lousanpang",
        writable: true,
        enumerable: true,
        configurable: true
    });

    // 读取
    console.log( obj.name ); // lousanpang

    //枚举对象的属性
    for( var val in obj ){
        console.log( val );  // lousanpang
    }

    // 删除
    delete obj.name;
    console.log( obj.name ); // undefined
```

* 存取器描述
```js
    let obj = {
        name: ''
    };
    Object.defineProperty(obj, "name", {
        get() { //当获取值的时候触发
            conosle.log('get!')  
        },
        set(value) { //当设置值的时候触发,设置的新值通过参数value拿到
            console.log(value)
        }
    });

    console.log( obj.name );  // 获取值 ''

    obj.name = 'lousanpang'; // 设置值
    console.log( obj.name ); // lousanpang

    // 触发set 打印value--lousanpang
```

### 三、[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)