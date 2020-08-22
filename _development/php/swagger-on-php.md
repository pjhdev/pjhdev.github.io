---
layout: posts
title:  "Swagger for api documentation"
date:   2020-03-31 14:00:00 - 0900
categories: [ php ]
sidebar:
  nav: "posts"
---

스웨거(Swagger)는 Open Api Specification(OAS)를 위한 프레임워크 입니다.
API 들이 가지고 있는 스펙(spec)을 명세, 관리할 수 있는 프로젝트 입니다. 이는 타 프로젝트와의 api 연동 시
API 의 요구사항 및 스펙을 한눈에 확인하기 용이하고, 변경시에도 쉽게 반영 및 파악될 수 있도록 해주어 불편함이 줄어듭니다.

스웨거는 여러 언어 및 플랫폼을 지원하는데 이 글에서는 php 와 swagger 를 연동하여 swagger-ui 를 통해 웹페이지로 확인 가능하도록 연동하는 과정을 소개합니다.

PHP 서버 코드에 swagger를 설치하기 위해 따라야 할 단계는 다음과 같습니다.
1. Composer를 사용하여 Swagger-Php 다운로드
2. 주석을 추가하여 문서 생성
3. Swagger JSON 파일 생성
4. 프로젝트에 Swagger-UI 패키지 다운로드
5. Swagger-UI를 코드에 연결

웹페이지를 통해 swagger 로 명세한 api 들의 정보를 확인하기 위해서는 해당 api 들의 명세가 작성된 json 또는 yaml 파일이 필요합니다.

### 1. Swagger Generator 설치
composer 가 설치된 상태라고 가정하고, 컴포저를 통해 zircote/swagger-php 패키지를 설치합니다.
이 패키지는 커맨드라인 입력을 통해 프로젝트 내의 doctrine annotaion 을 찾아 api documentations 을 생성합니다.
~~~
mkdir swagger-generator
cd swagger-generator
composer require zircote/swagger-php
~~~

### 2. php 프로젝트 내에 Annotation 추가
annotation 의 사전적 정의는 주석이지만, 일반적은 주석(# or //) 과는 조금 다르게 동작한다. 가장 큰 차이는 기능을 부여할 수 있다는 점이다.
zircote/swagger-php 를 사용하여 api document 를 생성할 때 api 들에 대한 명세가 기본적으로 작성되어있어야 하는데, 이때 annotation 을 사용하여 명세를 작성합니다.
annotation 을 사용하기 위해 아래와 같이 php 프로젝트 내에서 컴포저를 통해 패캐지를 인스톨합니다.
~~~
cd php-project
composer require doctrine/annotations
~~~
이후, 프로젝트의 base 스크립트(ex_ App.php) 에 아래의 어노테이션을 추가합니다.
~~~
/**
 * @OA\Info(title="Search API", version="1.0.0")
 */
~~~
이제 각 서비스(컨트롤러)에 아래처럼 명세를 작성합니다.<br><br>
[최상단]
~~~
use OpenApi\Annotations as OA;
~~~
[각 메소드]
~~~
/**
 * @OA\Post(
 *     path="/search",
 *     summary="Returns most accurate search result object",
 *     description="Search for an object, if found return it!",
 *     @OA\RequestBody(
 *         description="Client side search object",
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",                 
 *         @OA\Schema(ref="#/components/schemas/SearchObject")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Success",
 *     @OA\Schema(ref="#/components/schemas/SearchResultObject)   
 *     ), 
 *     @OA\Response(
 *         response=404,
 *         description="Could Not Find Resource"
 *     )   
 * )
 */
~~~

### 3. 명세가 담긴 swagger.json or swagger.yaml 생성
swagger-generator 를 설치한 경로로 이동 후, 아래 경로까지 이동합니다.
~~~
cd /path/to/swagger-generator
cd ./vendor/zircote/swagger-php/bin
~~~
위 경로로 이동 후 아래 커맨드를 실행하여 명세가 담긴 json or yaml 파일을 생성합니다.
-o 옵션 뒤에 입력하는 경로에 json 파일이 생성됩니다.
~~~
./openapi path/to/project -o path/to/project/swagger.json
~~~

### 4. php 프로젝트에 SwaggerUI 적용
swagger-ui 프로젝트를 클론하고, 해당 프로젝트 내의 ./dist 경로 내의 모든 파일을 php 프로젝트의 루트 디렉토리로 옮깁니다.
3. 에서 생성한 swagger.json 파일은 옮겨진 디렉터리의 위치와 동일한 레벨에 위치해야 합니다.
ex_) /webroot/swagger.json , /webroot/web
~~~
git clone https://github.com/swagger-api/swagger-ui.git
cd swagger-ui
mv ./dist /path/to/your/project/public/web/
~~~

### 완료
이제, php 프로젝트의 swagger.json 파일을 호출하면 아래처럼 깔금하게 표현된 api docs 를 확인할 수 있습니다.
![스웨거 인덱스](/assets/images/swagger-index.png)

참고 : 
[how-to-add-swagger-ui-to-php-server-code](https://medium.com/@tatianaensslin/how-to-add-swagger-ui-to-php-server-code-f1610c01dc03),
[zircote/swagger-php](https://github.com/zircote/swagger-php),
