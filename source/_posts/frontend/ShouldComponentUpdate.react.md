---
title: 性能优化实践
date: 2019-08-23
categories: 前端
author: LOUSANPANG
tags:
    - Taro
    - React
cover_picture: https://i.loli.net/2019/08/24/geyON6Jsk3xofwh.jpg
---

![2018-4-8-render.jpg](https://i.loli.net/2019/08/24/geyON6Jsk3xofwh.jpg)

### 性能优化实践-减少不必要的页面渲染（shouldComponentUpdate）

### 一、问题
#### 1.1 `setState` 改变 state 值、组件接受 `props` 导致组件重渲染
#### 1.2 你的页面是不是有N+个 `setState` ?
#### 1.3 对于视图层没有任何变化的、不需要做多余的重渲染工作

### 二、解决
#### 2.1 对于不需要立即获取某个 `state` 值的不必使用 `setState`
```tsx
this.setState({
    latitude: xxxx
})

==>

this.state.latitude = xxxx
```
#### 2.2 设置 `setState` 对于视图层没有变化的，例如设置相同的值，使用 `shouldComponentUpdate` 去阻拦渲染更新。
```tsx
  constructor(props) {
    super(props);
    this.state = {
      Number: 1
    }
  }

  handleClick = () => { // 并没有改变Number的值
     const preNumber = this.state.Number
     this.setState({
        Number: this.state.Number
     })
  }

  shouldComponentUpdate(nextProps,nextState){
      if(nextState.Number === this.state.Number){
        return false
      }
  }
```
#### 2.3 父组件接受的props没有变化视图层也会重渲染，接收多少个参数渲染多少次
* 解决方案同理

### 三、关于 `shouldComponentUpdate` 堆的比较问题（堆和栈）
#### 3.1 对于基本类型栈来说比较两者的区别是没有问题的，但是对于堆（例如对象）来说比较就有了问题：

![1060770-20170413205951455-770293101.png](https://i.loli.net/2019/08/24/5QRqNHyaLnoZD3i.png)
![1060770-20170413210203376-1462898013.png](https://i.loli.net/2019/08/24/kTDBsX4Lfu5NqmM.png)

```tsx
	let xm = {
		age: 18,
		score: 4
	};
	let xh = {
		age: 18,
		score: 4
	};
	console.log(xm === xh);   //false
 
    let newobj = xh
	console.log(newobj === xh);   //true
```

#### 3.2 解决
**解决**
1. 拓展语法 `Object.assign()`

```tsx
let obj = object.assign({},{a:1},{b:1}) // obj为{a:1,b:1}
```

2. [深拷贝／浅拷贝](https://github.com/LOUSANPANG/JavaScriptYouDon-tKnow/blob/master/%E5%85%8B%E9%9A%86arguments%E7%B1%BB%E6%95%B0%E7%BB%84.md)

3. [immutable.js 官方推荐第三方库](https://github.com/immutable-js/immutable-js)
