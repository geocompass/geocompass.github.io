---
title: 更快捷的PG+PostGIS转换火星坐标系方法
date: 2019-08-22 14:38:14
author: 
categories: 数据库
tags:
    - PostgreSQL
    - PostGIS
---
### 关于坐标系
我们通常用经纬度来表示一个地理位置，但是由于一些原因，我们从不同渠道得到的经纬度信息可能并不是在同一个坐标系下。
   高德地图、腾讯地图以及谷歌中国区地图使用的是GCJ-02坐标系
   百度地图使用的是BD-09坐标系
   底层接口(HTML5 Geolocation或ios、安卓API)通过GPS设备获取的坐标使用的是WGS-84坐标系

不同的坐标系之间可能有几十到几百米的偏移，所以在开发基于地图的产品，或者做地理数据可视化时，我们需要修正不同坐标系之间的偏差。

### WGS-84 - 世界大地测量系统
WGS-84（World Geodetic System, WGS）是使用最广泛的坐标系，也是世界通用的坐标系，GPS设备得到的经纬度就是在WGS84坐标系下的经纬度。通常通过底层接口得到的定位信息都是WGS84坐标系。如天地图，osm底图等。

### GCJ-02 - 国测局坐标
GCJ-02（G-Guojia国家，C-Cehui测绘，J-Ju局），又被称为火星坐标系，是一种基于WGS-84制定的大地测量系统，由中国国测局制定。此坐标系所采用的混淆算法会在经纬度中加入随机的偏移。如谷歌地图（中国区），高德地图，腾讯地图等。

### BD-09 - 百度坐标系
BD-09（Baidu, BD）是百度地图使用的地理坐标系，其在GCJ-02基础上又增加了一次偏移，用来保护用户隐私。从百度产品中得到的坐标都是BD-09坐标系。

### 转换方法
基于 PG+PostGIS 进行三种坐标系之间的转换，支持点、线、面、多点、多线、多面等各种需求进行互转

**geoc_gcj02towgs84：火星坐标系转WGS84坐标系**
**geoc_wgs84togcj02：WGS84坐标系转火星坐标系**
**geoc_wgs84tobd09：WGS84坐标系转百度坐标系**
**geoc_bd09towgs84：百度坐标系转WGS84坐标系**
**geoc_gcj02tobd09：火星坐标系转百度坐标系**
**geoc_bd09togcj02：百度坐标系转火星坐标系**

### 示例

```sql
GCJ02转WGS84
select geoc_gcj02towgs84(geom) from test_table
WGS84转GCJ02
select geoc_wgs84togcj02(geom) from test_table
WGS84转BD09
select geoc_wgs84tobd09(geom) from test_table
BD09转WGS84
select geoc_bd09towgs84(geom) from test_table
GCJ02转BD09
select geoc_gcj02tobd09(geom) from test_table
BD09转GCJ02
select geoc_bd09togcj02(geom) from test_table
```
## 如何安装

PostgreSQL安装PostGIS扩展
复制geoc-pg-coordtansform.sql中代码，在数据库执行
github地址：https://github.com/geocompass/pg-coordtransform

 ## 注

 **转载请标名出处**







