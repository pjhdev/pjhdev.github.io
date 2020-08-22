---
layout: posts
title:  "Double question mark(??)"
date:   2020-03-29 14:00:00 - 0900
categories: [ php ]
sidebar:
  nav: "posts"
---
$foo = $bar ?? 'something'
위 코드의 결과는 $bar 변수가 존재할 경우 $bar 를 리턴하고 없을 경우 something 이 리턴됩니다.

It's the "null coalescing operator", added in php 7.0. The definition of how it works is:

It returns its first operand if it exists and is not NULL; otherwise it returns its second operand.

So it's actually just isset() in a handy operator.

Those two are equivalent1:

$foo = $bar ?? 'something';
$foo = isset($bar) ? $bar : 'something';
Documentation: http://php.net/manual/en/language.operators.comparison.php#language.operators.comparison.coalesce

In the list of new PHP7 features: http://php.net/manual/en/migration70.new-features.php#migration70.new-features.null-coalesce-op

And original RFC https://wiki.php.net/rfc/isset_ternary

EDIT: As this answer gets a lot of views, little clarification:

1There is a difference: In case of ??, the first expression is evaluated only once, as opposed to ? :, where the expression is first evaluated in the condition section, then the second time in the "answer" section.