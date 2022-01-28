var store = [{
        "title": "empty() 함수와 is_null() 함수 차이",
        "excerpt":"echo empty(null); =&gt; true  echo empty([]); =&gt; true   but,   echo is_null(null); =&gt; true  echo is_null([]); =&gt; false   결과에서 보여지듯, 빈 어레이는 널체크에 걸리지 않는다. 하지만, 널값은 엠프티 체크에 걸린다. rdb select query result 가 없을 경우, empty() 로 체크해야함.   ","categories": ["php"],
        "tags": [],
        "url": "http://localhost:4000/development/php/null-or-empty-check-tip",
        "teaser": null
      },{
        "title": "함수 반환타입 선언",
        "excerpt":"함수의 선언부 끝에 콜론(:) 과 함께 데이터타입(오브젝트 포함)을 적어주는 것을 Return Type Declarations(함수 반환타입 선언) 이라고 한다.  이렇게 함수의 반환 타입을 선언하게 되면, 해당 타입 이외의 값이 반환될 경우 익셉션이 발생하게 된다.  ","categories": ["php"],
        "tags": [],
        "url": "http://localhost:4000/development/php/return-type-declarations",
        "teaser": null
      },{
        "title": "액티브레코드 대용량 인서트",
        "excerpt":"api 개발을 하다 보면 rdb 테이블에 대량의 레코드를 인서트 해야 할 경우가 있습니다. 이때, 레코드별로 하나의 인서트 쿼리로 테이블에 생성할 경우 매번 커넥션을 맺거나 쿼리를 시도하기 때문에 레코드 수가 증가하면 할수록 많은 시간이 소요됩니다. 레일즈에서는 고맙게도 이러한 대용량 레코드 인서트를 위해 activerecord-import 라는 gem 이 있습니다. 이름에서 알 수 있듯이...","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/active-record-import-bulk-insert",
        "teaser": null
      },{
        "title": "ApplicationJob & PerformLater(비동기로 백그라운드에서 작업 처리)",
        "excerpt":"레일즈 프로젝트에서 특정한 요청에 대해서 먼저 응답을 한 뒤, 뒤이어 백그라운드에서 특정한 작업을 처리하기를 원한다면 아래와 같이 사용하면 된다. 백그라운드에서 비동기로 실행 될 실제 처리가 포함된 작업 생성 class BulkMailInsertJob &lt; ApplicationJob queue_as :default def perform(args) # Do something later end end 요청을 받고 응답한 뒤 백그라운드에서 실행될 잡을 호출...","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/application-job",
        "teaser": null
      },{
        "title": "루비 클래스 변수와 인스턴스 변수",
        "excerpt":"클래스가 데이터를보다 쉽게 ​​공유하기 위해 사용할 수있는 몇 가지 특수 변수 유형이 있습니다. 인스턴스 변수 앞에는 @ 붙습니다. 다른 메소드에서 동일한 변수를 사용하려는 경우 유용합니다. class Person def initialize(name, age) my_age = age # local variable, will be destroyed at end of constructor @name = name # instance variable, is...","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/class-variable-and-instance-variable",
        "teaser": null
      },{
        "title": "오래된 루비 버전을 사용할 경우 발생하는 문제",
        "excerpt":"얼마전 입사 4년만에 업무용 맥 시스템을 거의 새것으료 교체받았다. 기존에 사용하던 맥미니는 모하비로의 업그레이드도 되지 않는 구형이었지만 개발하는데 느린것을 제외하고는 문제가 없었다. 하지만 새로운 아이맥에 개발환경을 셋팅하다보니 몇가지 문제점이 발생하여 기록을 남긴다. 사내 QA 용도의 운영툴을 Rails 로 개발 &amp; 운영중이었는데 개발된지 오래되다 보니 사용하는 레일즈와 루비 버전이 많이 낮았다....","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/old-version-error",
        "teaser": null
      },{
        "title": "스트롱 파라미터(매개변수)",
        "excerpt":"api 를 개발하다 보면, 필수로 전달되어야 할 파라미터를 체크해야 할 경우가 생깁니다. 체크해야 할 파라메터가 많은 경우 각 파라미터를 직접 널 체크하게 되면 코드가 길어지며 복잡해지게 됩니다. 레일즈에서는 이러한 경우를 위해 parameter 를 체크할 수 있도록 require 와 permit 기능을 제공하고 있습니다. require require 는 필수적으로 포함할 값을 지정해야 할...","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/strong-parameters",
        "teaser": null
      },{
        "title": "래핑 파라미터",
        "excerpt":"레일즈로 개발하다 보면 클라이언트에서 파라미터를 특정 엘리먼트로 래핑해서 보내야하는 경우가 있다. 예를 들어 Devise는 요청의 모든 파라미터들을 user로 감싸서 보내야한다. 하지만 클라이언트 입장에서는 이 작업이 번거롭고 불편하다. // Parameters { \"email\": \"example@gmail.com\", \"name\": \"홍길동\" } // Nested parameters { \"user\": { \"email\": \"example@gmail.com\", \"name\": \"홍길동\" } } 이런 경우에 wrap_parameters를...","categories": ["rails"],
        "tags": [],
        "url": "http://localhost:4000/development/rails/wrap-parameters",
        "teaser": null
      },{
        "title": "개인서버에 센트리 설치!",
        "excerpt":"운영중인 개인 서버에 프로젝트들의 로그 및 버그 수집을 위해 센트리를 설치하려 한다. 오픈소스인 센트리를 on-premise 방식으로 설치하기 위해서는 아래의 요구사항이 있다. [설치 전 준비사항] Docker 17.05.0+ Docker Compose 1.19.0+ A dedicated (sub)domain to host Sentry on (for example, sentry.yourcompany.com). At least 2400MB memory 2 CPU Cores 도커 &amp; 도커 컴포스...","categories": ["tech"],
        "tags": [],
        "url": "http://localhost:4000/development/sentry/install-sentry",
        "teaser": null
      },{
        "title": "Nginx 설정 팁",
        "excerpt":"Nginx는 C언어와 유사한 문법을 통해서 웹서버를 유연하게 다룰 수 있다. 필자는 Nginx에 대하여 완벽하게 문법을 이해하고 있는 상태는 아니지만, 몇몇의 자주 사용하게 되는 기능들을 정리해 놓고자 한다. 이건 필자가 주로 사용하는 기능이라는 의미이며 Nginx를 처음 다루는 사용자가 보면 도움이 되지 않을까 싶다. 리디렉션 도메인 리디렉션 어떤 도메인에 접근했을 때 다른...","categories": ["nginx"],
        "tags": [],
        "url": "http://localhost:4000/development/nginx/nginx-setting-tip",
        "teaser": null
      },{
        "title": "Double question mark(??)",
        "excerpt":"$foo = $bar ?? ‘something’ 위 코드의 결과는 $bar 변수가 존재할 경우 $bar 를 리턴하고 없을 경우 something 이 리턴됩니다. It’s the “null coalescing operator”, added in php 7.0. The definition of how it works is: It returns its first operand if it exists and is not NULL; otherwise it...","categories": ["php"],
        "tags": [],
        "url": "http://localhost:4000/development/php/double-question-mark",
        "teaser": null
      },{
        "title": "Swagger for api documentation",
        "excerpt":"스웨거(Swagger)는 Open Api Specification(OAS)를 위한 프레임워크 입니다. API 들이 가지고 있는 스펙(spec)을 명세, 관리할 수 있는 프로젝트 입니다. 이는 타 프로젝트와의 api 연동 시 API 의 요구사항 및 스펙을 한눈에 확인하기 용이하고, 변경시에도 쉽게 반영 및 파악될 수 있도록 해주어 불편함이 줄어듭니다. 스웨거는 여러 언어 및 플랫폼을 지원하는데 이 글에서는...","categories": ["php"],
        "tags": [],
        "url": "http://localhost:4000/development/php/swagger-on-php",
        "teaser": null
      },{
        "title": "도커로 개발환경 통일하기",
        "excerpt":"함수의 선언부 끝에 콜론(:) 과 함께 데이터타입(오브젝트 포함)을 적어주는 것을 Return Type Declarations(함수 반환타입 선언) 이라고 한다.  이렇게 함수의 반환 타입을 선언하게 되면, 해당 타입 이외의 값이 반환될 경우 익셉션이 발생하게 된다.  ","categories": ["docker"],
        "tags": [],
        "url": "http://localhost:4000/development/docker/docker-dev-environment",
        "teaser": null
      },{
        "title": "공부해야할 것",
        "excerpt":"php tdd    [링크]   모던 php developer   ","categories": ["note"],
        "tags": [],
        "url": "http://localhost:4000/note/study-list/",
        "teaser": null
      },{
        "title": "A list of animals",
        "excerpt":" ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/development/",
        "teaser": null
      }]
