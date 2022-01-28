---
layout: posts
title:  "ApplicationJob & PerformLater(비동기로 백그라운드에서 작업 처리)"
date:   2020-03-26 14:00:00 - 0900
categories: [ rails ]
sidebar:
  nav: "posts"
---
레일즈 프로젝트에서 특정한 요청에 대해서 먼저 응답을 한 뒤, 뒤이어 백그라운드에서 특정한 작업을 처리하기를 원한다면 아래와 같이 사용하면 된다.
### 백그라운드에서 비동기로 실행 될 실제 처리가 포함된 작업 생성
~~~
class BulkMailInsertJob < ApplicationJob
queue_as :default
    def perform(args)
        # Do something later
    end
end
~~~
### 요청을 받고 응답한 뒤 백그라운드에서 실행될 잡을 호출
~~~
class TestBackgroundJobController < ApplicationController
    def background_job
        render json: "response first.", status: :ok
        args = {arg1: 1, arg2: 2...}
        BulkMailInsertJob.perform_later(args)
    end
end
~~~
perform_now, perform_later 등의 명령어를 통해 작업 큐에 해당 작업들이 등록됩니다. 이 작업들은 Ram 에 보관되며, 프로세스 충돌 또는 서버 재기동 시 아직 실행되지 않은 모든 작업은 유실됩니다.