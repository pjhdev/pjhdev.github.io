---
layout: posts
title:  "개인서버에 센트리 설치!"
date:   2020-03-26 14:00:00 - 0900
categories: [ tech ]
sidebar:
  nav: "posts"
---

운영중인 개인 서버에 프로젝트들의 로그 및 버그 수집을 위해 센트리를 설치하려 한다.
오픈소스인 센트리를 on-premise 방식으로 설치하기 위해서는 아래의 요구사항이 있다.

[설치 전 준비사항]
- Docker 17.05.0+
- Docker Compose 1.19.0+
- A dedicated (sub)domain to host Sentry on (for example, sentry.yourcompany.com).
- At least 2400MB memory
- 2 CPU Cores

### 도커 & 도커 컴포스 설치<br>
온프레미스 방식으로 제공되는 센트리는 서버의 도커 컨테이너 위에서 동작하기 때문에 도커 설치가 필요하다.
영어에 능숙하다면 [공식 사이트의 가이드](https://docs.docker.com/install/linux/docker-ce/centos/) 가 잘 나와있어 해당 가이드를 참고하면 된다.

1. 구버전의 도커가 설치되어 있는 경우 제거
~~~
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
~~~
2. 도커설치에 필요한 필수 패키지 설치
~~~
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
~~~
3. stable(안정된 버전의) 도커 저장소 추가
~~~
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
~~~
4. 도커 설치 & 실행
~~~
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
~~~
5. 도커 컴포즈 설치<br>
(여러개의 컨테이너를 한번에 관리하기에 유용한 도구)
~~~
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
~~~
바이너리 파일 실행권한 추가
~~~
sudo chmod +x /usr/local/bin/docker-compose
~~~
설치가 잘 되었는지 아래 명령어로 확인
~~~
docker-compose --version
~~~

위의 과정까지 마쳤다면 실질적으로 센트리 설치를 위한 준비가 완료되었다고 봐도 된다.
(서버 사양의 문제는 해결할 수 없으니..)

### 센트리 설치<br>
센트리 가이드를 가보면 알겠지만, 가이드가 심플한만큼 설치과정이 매우 간단하다. 이는 도커를 이용하기 때문이다.
쉘을 실행하면, 필요한 디펜던시 및 도커이미지를 등록하여 센트리를 구동하는데 필요한 각종 서비스를 구성 및 실행해준다.

1. 센트리 온프레미스 저장소  & 실행
~~~
git clone https://github.com/getsentry/onpremise.git
cd onpremise
./install.sh
~~~
이후 도커 이미지 풀 & 실행이 자동으로 완료되며 설치가 끝나면 센트리의 계정 생성을 하겠냐는 터미널 메세지가 출력된다. 생성을 해주자.
- ![Image Alt 텍스트](/assets/images/sentry-create-user.png)
이후 아래의 창이 뜨면서 설치가 완료된다.
- ![Image Alt 텍스트](/assets/images/sentry-install-done.png)
아래 명렁어를 실행해서 센트리를 실행시키자.<br>
명령어를 보면 알겠지만, 컨테이너 하나를 실행시키는게 아닌, 구성된 모든 컨테이너를 한번에 실행시키는 것이다.
~~~
docker-compose up -d
~~~

* 삽질한 포인트들
  1. ./install.sh 했지만 아래의 에러가 발생
  ~~~
  Traceback (most recent call last):
    File "/usr/local/bin/sentry", line 8, in <module>
      sys.exit(main())
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/__init__.py", line 164, in main
      cli(prog_name=get_prog(), obj={}, max_content_width=100)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 722, in __call__
      return self.main(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 697, in main
      rv = self.invoke(ctx)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 1066, in invoke
      return _process_result(sub_ctx.command.invoke(sub_ctx))
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 895, in invoke
      return ctx.invoke(self.callback, **ctx.params)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 535, in invoke
      return callback(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/decorators.py", line 17, in new_func
      return f(get_current_context(), *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/decorators.py", line 30, in inner
      return ctx.invoke(f, *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 535, in invoke
      return callback(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/decorators.py", line 17, in new_func
      return f(get_current_context(), *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 168, in upgrade
      _upgrade(not noinput, traceback, verbosity, not no_repair)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 121, in _upgrade
      _migrate_from_south(verbosity)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 93, in _migrate_from_south
      if not _has_south_history(connection):
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 78, in _has_south_history
      cursor = connection.cursor()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 254, in cursor
      return self._cursor()
    File "/usr/local/lib/python2.7/site-packages/sentry/db/postgres/decorators.py", line 44, in inner
      return func(self, *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/db/postgres/base.py", line 99, in _cursor
      cursor = super(DatabaseWrapper, self)._cursor()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 229, in _cursor
      self.ensure_connection()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 213, in ensure_connection
      self.connect()
    File "/usr/local/lib/python2.7/site-packages/django/db/utils.py", line 94, in __exit__
      six.reraise(dj_exc_type, dj_exc_value, traceback)
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 213, in ensure_connection
      self.connect()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 189, in connect
      self.connection = self.get_new_connection(conn_params)
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/postgresql/base.py", line 176, in get_new_connection
      connection = Database.connect(**conn_params)
    File "/usr/local/lib/python2.7/site-packages/psycopg2/__init__.py", line 126, in connect
      conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
  django.db.utils.OperationalError: could not connect to server: No route to host
  	Is the server running on host "postgres" (172.22.0.3) and accepting
  	TCP/IP connections on port 5432?
  ~~~
  원인은 확실하게 알 수 없으나 docker-compose.yml 내의 postgresql 버전을 9.6 -> 10 으로 변경 후 해결됨.
  2. 1. 을 해결하고서 다시 ./install.sh 해도 아래의 에러가 발생
  ~~~
  raceback (most recent call last):
    File "/usr/local/bin/sentry", line 8, in <module>
      sys.exit(main())
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/__init__.py", line 164, in main
      cli(prog_name=get_prog(), obj={}, max_content_width=100)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 722, in __call__
      return self.main(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 697, in main
      rv = self.invoke(ctx)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 1066, in invoke
      return _process_result(sub_ctx.command.invoke(sub_ctx))
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 895, in invoke
      return ctx.invoke(self.callback, **ctx.params)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 535, in invoke
      return callback(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/decorators.py", line 17, in new_func
      return f(get_current_context(), *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/decorators.py", line 30, in inner
      return ctx.invoke(f, *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/core.py", line 535, in invoke
      return callback(*args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/click/decorators.py", line 17, in new_func
      return f(get_current_context(), *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 168, in upgrade
      _upgrade(not noinput, traceback, verbosity, not no_repair)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 121, in _upgrade
      _migrate_from_south(verbosity)
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 93, in _migrate_from_south
      if not _has_south_history(connection):
    File "/usr/local/lib/python2.7/site-packages/sentry/runner/commands/upgrade.py", line 78, in _has_south_history
      cursor = connection.cursor()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 254, in cursor
      return self._cursor()
    File "/usr/local/lib/python2.7/site-packages/sentry/db/postgres/decorators.py", line 44, in inner
      return func(self, *args, **kwargs)
    File "/usr/local/lib/python2.7/site-packages/sentry/db/postgres/base.py", line 99, in _cursor
      cursor = super(DatabaseWrapper, self)._cursor()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 229, in _cursor
      self.ensure_connection()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 213, in ensure_connection
      self.connect()
    File "/usr/local/lib/python2.7/site-packages/django/db/utils.py", line 94, in __exit__
      six.reraise(dj_exc_type, dj_exc_value, traceback)
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 213, in ensure_connection
      self.connect()
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/base/base.py", line 189, in connect
      self.connection = self.get_new_connection(conn_params)
    File "/usr/local/lib/python2.7/site-packages/django/db/backends/postgresql/base.py", line 176, in get_new_connection
      connection = Database.connect(**conn_params)
    File "/usr/local/lib/python2.7/site-packages/psycopg2/__init__.py", line 126, in connect
      conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
  django.db.utils.OperationalError: fe_sendauth: no password supplied
  ~~~
  해당 에러는, 센트리에서 사용하는 rdb 인 postgresql 의 초기 비밀번호가 설정되어 있지 않아서 발생한 문제이다.
  clone 한 폴더의 sentry 경로 내의 *sentry.conf.py* 파일을 에디터로 열어 패스워드 부분을 입력한다.<br>
  ![Image Alt 텍스트](/assets/images/postgres-set-password.png)