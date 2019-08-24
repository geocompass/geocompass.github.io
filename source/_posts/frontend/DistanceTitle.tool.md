---
title: 前端工具-距离转换标题缩写
date: 2019-08-22
categories: 前端
author: LOUSANPANG
tags:
    - 前端工具
    - 地图工具
cover_picture: https://github.com/LOUSANPANG/Picture-library/blob/master/geocompass/tool1.png
---

<div align=center>
    <img src="https://github.com/LOUSANPANG/Picture-library/blob/master/geocompass/tool1.png">
</div>

### 一、关于工具
#### 1.1 问题
* 地图展示出来的距离不符合我们展示的要求例如：`0.01km 1.001km`
* 对应地图信息标题展示内容过长例如：`北京市海淀区车道沟1号青东商务区`
#### 1.2 需求
* 我们可能想要的距离 `10m 1.0km`
* 我们想要的标题 `北京市...青东商务区`
#### 1.3 应用
```js
const StrEllipsis = (str, len, starlen = 0, endlen = 0) => {
  if (str.length > len) {
    return str.substr(0, starlen) + "..." + str.substr(str.length - endlen, str.length);
  }
  return str;
};

const StrKm = (juli, fixednum = 3) => {
    if (parseInt(juli) == juli) {
        return juli + 'km'
    } else {
        let left = juli.toString().split(".")[0]
        let leftlast = left[left.length-1]
        if (left.length == 1 && leftlast == 0) {
            return juli.toFixed(fixednum)*(10 ** fixednum) + 'm'
        } else {
            return juli.toFixed(1) + 'km'
        }
    }
}

export {
    StrEllipsis,
    StrKm
}
```
#### 1.4 使用
```js
import {StrEllipsis, StrKm} from ''

StrEllipsis('北京市海淀区车道沟1号青东商务区', 8, 3, 5) // '北京市...青东商务区'
StrEllipsis('北京市海淀区车道沟1号青东商务区', 30) // '北京市海淀区车道沟1号青东商务区'

StrKm(0.01) // 10m
StrKm(1.01) // 1.0km
StrKm(0.123456) // 123m
```