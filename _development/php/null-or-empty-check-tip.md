---
layout: posts
title:  "empty() 함수와 is_null() 함수 차이"
date:   2020-03-26 14:00:00 - 0900
categories: [ php ]
sidebar:
  nav: "posts"
---

echo empty(null); => true<br>
echo empty([]); => true

but,

echo is_null(null); => true<br>
echo is_null([]); => false

결과에서 보여지듯, 빈 어레이는 널체크에 걸리지 않는다.
하지만, 널값은 엠프티 체크에 걸린다.
rdb select query result 가 없을 경우, empty() 로 체크해야함.

