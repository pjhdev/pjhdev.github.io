---
layout: posts
title:  "Nginx 설정 팁"
date:   2020-03-29 14:00:00 - 0900
categories: [ nginx ]
sidebar:
  nav: "posts"
---
Nginx는 C언어와 유사한 문법을 통해서 웹서버를 유연하게 다룰 수 있다. 필자는 Nginx에 대하여 완벽하게 문법을 이해하고 있는 상태는 아니지만, 몇몇의 자주 사용하게 되는 기능들을 정리해 놓고자 한다. 이건 필자가 주로 사용하는 기능이라는 의미이며 Nginx를 처음 다루는 사용자가 보면 도움이 되지 않을까 싶다.


### 리디렉션
## 도메인 리디렉션
어떤 도메인에 접근했을 때 다른 도메인으로 보내주려면 아래와 같이 작성한다. CNAME으로 넘겨주는 방법도 있겠지만 홈페이지의 도메인을 변경했을때 SEO에 적은 영향을 미치게 하고 싶어 이와같이 하였다.
~~~
return 301 https://www.$server_name$request_uri;
~~~

## 특정 URL 리디렉션
URL이 변경되어 특정 위치에 접근했을때 다른 페이지로 념겨주려면 아래와 같이 작성한다. 코드는 필자의 (도메인을 생략한)블로그의 링크를 예시로 들었다.
~~~
location = /programing/Qt-Connect {
    return 301 /qt/connect;
}
~~~

## HTTPS 리디렉션
사용자가 http로 접근했을때 https로 리디렉션 해주려면 아래와 같이 작성한다. 클라우드 플레어를 사용한다면 기본적으로 적용되므로 안해줘도 된다.
~~~
if ($scheme = http) {
    return 301 https://$server_name$request_uri;
}
~~~

### 404, 403 페이지 설정
404(Not Found) 혹은 403(Fobidden) 에러가 발생했을 때 접속한 사용자에게 커스텀 된 페이지를 보여준다. 가령 404 에러가 발생했을때 비슷한 문서를 찾을 수 있도록 검색 페이지를 제공해 줄 수 있다.
~~~
error_page 404 /404.html;
    location /404.html {
    internal;
}

error_page 403 /403.html;
    location /403.html {
    internal;
}
~~~
이제 커스텀 된 페이지를 /404.html에 작성해 두면 되겠다.



### 특정 파일 접근 차단
어떤 파일 확장자에만 접근을 불가능하게 하고 싶다면 아래와 같이 작성해 줄 수 있다.
~~~
location ~ \.txt$ {
    return 403;
}
~~~
위와같이 작성하면 모든 텍스트파일의 접근을 차단한다.



### URL에서 HTML 없애기
about.html에 있는 파일이지만 about로 접근할때 보여줄 수 있는 방법이다. URL이 깔끔하게 보여진다.
~~~
try_files $uri $uri.html $uri/ =404;
~~~
about으로 접근했을때 about.html을 먼저 찾아보고 없다면 about/index.html을 찾아 볼 것이다. 그래도 없으면 404 에러가 발생한다.



### 디렉토리에 비밀번호 걸기
특정 디렉토리로 접근할때 사용자/비밀번호를 입력하도록 하는 방법은 다음과 같다.
~~~
location /Private/ {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/private/.htpasswd;
}
~~~
.htpasswd는 아파치 유틸을 이용해서 생성해 주어야 한다. 생성 방법



### 프록시 패스
장고나 Node.js를 사용하는 경우 프록시 패스를 사용하여 Nginx에서 접근하게 할 수 있다. 필자의 경우에는 특정 도메인에 적용하고 싶어서 사용하였다.
~~~
location / {
    proxy_pass http://127.0.0.1:8000/;
}
~~~


### 스태틱 파일 캐시
이미지 파일이나 스타일시트, 스크립트 파일은 캐시시켜서 사용자의 로딩속도를 향상시키고 궁극적으로 이탈률을 줄이는 효과가 있다.
~~~
location ~* \.(?:jpg|jpeg|png|gif|ico|gz|svg|svgz|ogg|mp4|webm|ogv|htc|cur)$ {
    valid_referers none blocked blex.kr *.blex.kr;
    if ($invalid_referer) {
        return 403;
    }
    expires 3M;
    access_log off;
    add_header Cache-Control "public";
}

location ~* \.(?:css|js)$ {
    expires 1M;
    access_log off;
    add_header Cache-Control "public";
}

location = /favicon.ico {
    expires max;
    access_log off;
    log_not_found off;
}
~~~


### 핫링크 차단
다른 도메인에서 내 사이트의 이미지를 가져가는 것을 hotlink라고 부른다. 이를 아래와같이 차단할 수 있다.
~~~
location ~* \.(?:jpg|jpeg|png|gif|ico|gz|svg|svgz|ogg|mp4|webm|ogv|htc|cur)$ {
    valid_referers none blocked mydomain.com *.mydomain.com;
    if ($invalid_referer) {
        return 403;
    }
}
~~~


### 업로드 사이즈
PHP 등을 활용하고 있는 경우 일정 사이즈가 넘어가는 파일은 업로드가 불가하다.
~~~
client_max_body_size 10M;
~~~