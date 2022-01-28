---
layout: posts
title:  "액티브레코드 대용량 인서트"
date:   2020-03-26 14:00:00 - 0900
categories: [ rails ]
sidebar:
  nav: "posts"
---

api 개발을 하다 보면 rdb 테이블에 대량의 레코드를 인서트 해야 할 경우가 있습니다. 이때, 레코드별로 하나의 인서트 쿼리로 테이블에 생성할 경우 매번 커넥션을 맺거나 쿼리를 시도하기 때문에 레코드 수가 증가하면 할수록 많은 시간이 소요됩니다.
레일즈에서는 고맙게도 이러한 대용량 레코드 인서트를 위해 activerecord-import 라는 gem 이 있습니다. 이름에서 알 수 있듯이 이 gem 은 activerecord 를 베이스로 동작하기 때문에 사용하려는 레일즈 프로젝트에서 orm 으로 activerecord 를 사용하고 있어야 합니다.<br>

*activerecord-import* gem 을 사용하기 위해서는 gemfile 에 아래와 같이 추가를 해줍니다.
~~~
gem 'activerecord-import'
~~~
추가한 이후, 아래 명령어로 gem 을 설치합니다.
~~~
bundle install
~~~

설치된 gem 을 사용하기 위해서는 아래의 예시처럼 사용하면 됩니다.
기본적인 사용법으로는, column 해시테이블과 과 그에 맞는 value 의 리스트를 매개변수로 import 또는 bulk_import 메소드를 호출하하는 것입니다.
~~~
columns = [:uid, :title, :message] - 컬럼은 실제 테이블의 컬럼명과 매칭되어야 합니다.
values = [{uid: 1234, title: "제목1", message: "내용1"}, {uid: 5678, title: "제목2", message: "내용2"}] - 컬럼에 해당하는 값의 리스트여야 합니다.
Mail.bulk_import(columns, values)
~~~
위와 같이 실행할 경우, values 의 각 데이터마다 1건씩 인서트가 되는게 아니라 아래처럼 한줄의 쿼리로 인서트가 됩니다. 따라서 대용량의 쿼리 인서트의 경우 시간 및 부하를 비약적으로 줄일 수 있습니다.
~~~
INSERT INTO Mail (uid, title, message) VALUES (1234, 제목1, 내용1), (5678, 제목2, 내용2)
~~~
위와 같은 기본적인 사용법 외에 옵션을 주어 validate, insert ignore, on_duplicate_key_update 등의 처리도 가능하기 때문에 아래의 github 또는, api docs 를 참고하도록 하자.

[Gitub - activerecord-import](https://github.com/zdennis/activerecord-import)
[Rubydoc - activerecord-import](https://rubydoc.info/gems/activerecord-import/ActiveRecord/Base#bulk_import-class_method)