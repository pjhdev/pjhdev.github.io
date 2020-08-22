---
layout: posts
title:  "스트롱 파라미터(매개변수)"
date:   2020-03-26 14:00:00 - 0900
categories: [ rails ]
sidebar:
  nav: "posts"
---

api 를 개발하다 보면, 필수로 전달되어야 할 파라미터를 체크해야 할 경우가 생깁니다.<br>
체크해야 할 파라메터가 많은 경우 각 파라미터를 직접 널 체크하게 되면 코드가 길어지며 복잡해지게 됩니다.<br>
레일즈에서는 이러한 경우를 위해 parameter 를 체크할 수 있도록 require 와 permit 기능을 제공하고 있습니다.<br>

### *require*
- require 는 필수적으로 포함할 값을 지정해야 할 때 사용합니다. 아래는 사용 예제입니다.
require는 필수적으로 포함할 값을 지정할 수 있습니다. 사용은 아래와 같습니다.
~~~
class UserController

  def create_user
    user = User.create(user_params)
    user.save
  end

  private

  def user_params
    params.require(:user).permit(:name, :age, :email, :address)
  end
end
~~~
params에 user라는 필드가 없을 경우 ParameterMissing 예외가 발생합니다. 정상적으로 들어있다면, 이어서 user에 대해서 permit을 수행합니다. 즉, user에도 Hash가 들어있어야 합니다. (Hash 타입이 아닐 경우 NoMethodError 발생) 동시에 여러 가지의 값을 필수적으로 포함시키고 싶을 경우 어떻게 할까요?
~~~
class UserController

  def create_user
    user = User.create(user_params)
    user.save
  end

  private

  def user_params
    params.require(:token)
    params.require(:item).permit(:name, :price)
    params.require(:user).permit(:name, :age, :email, :address)
    params
  end
end
~~~
위와 같이 여러개의 값에 대해서도 체크할 수 있습니다. 다만, 마지막에 실행되는 줄이 최종으로 반환되는 parameter 값이 되니 주의해야 합니다.

### *permit*
- permit 은 화이트리스트처리에 사용, 즉 필요한 값만을 넘겨받는데 사용합니다.
~~~
class UserController

  def create_user
    user = User.create(user_params)
    user.save
  end

  private

  def user_params
    params.permit(:name, :age, :email, :address)
  end
end
~~~
만약 whitelist에 없는 값이 있으면 경고 로그를 남기고 whitelist에 해당하는 값만 반환합니다. 여기서 예외를 발생 시키고싶다면 environment.rb 파일에 다음 옵션을 추가하면 됩니다.
~~~
config.action_controller.action_on_unpermitted_parameters = :raise
~~~
혹은 액션에서 다음과 같이 지정해줄 수도 있습니다.
~~~
def user_params
  ActionController::Parameters.action_on_unpermitted_parameters = :raise
  params.permit(:name, :age, :email, :address)
end
~~~
이후 발생하는 UnpermittedParameters에 대해서는 예외가 발생하며, 400에러(Bad request)를 반환하는 등의 대처를 할 수 있습니다.

### *중첩된 파라미터 체크*
중첩 매개 변수에 대해서도 검증할 수 있습니다.
~~~
class UserController

  def create_user
    user = User.create(user_params)
    user.save
  end

  private

  def user_params
    params.require(:user).permit(:name, :age, { emails: [] }, :address, sites: [ :name, :url ])
  end
end
~~~
위 코드에서는 user라는 필드에 name, age, emails, address, sites라는 값들이 whitelist에 포함됩니다. 또한 emails는 배열로, sites는 name과 url을 속성으로 가지는 객체의 배열로 검증할 수 있습니다. 따라서, 아래와 같은 요청에 대해서 예외 처리가 가능합니다.
~~~
{
  "user": {
    "name": "youngkyun",
    "age": 20,
    "emails": [
      "chancethecoder@gmail.com"
    ],
    "address": "somewhere",
    "sites": [{
      "name": "personal site",
      "url": "https://chancethecoder.me"
    },{
      "name": "another site",
      "url": "https://anothersite.com",
      "foo": "bar"        // UnpermittedParameters 발생
    }]
  }
}
~~~

참고 : [chancethecoder](https://chancethecoder.tistory.com/8),
[frontdeveloper.pl](https://frontdeveloper.pl/2019/03/why-dont-we-validate-controller-parameters/)