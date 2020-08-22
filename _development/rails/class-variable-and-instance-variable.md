---
layout: posts
title:  "루비 클래스 변수와 인스턴스 변수"
date:   2020-03-26 14:00:00 - 0900
categories: [ rails ]
sidebar:
  nav: "posts"
---

클래스가 데이터를보다 쉽게 ​​공유하기 위해 사용할 수있는 몇 가지 특수 변수 유형이 있습니다.
인스턴스 변수 앞에는 @ 붙습니다. 다른 메소드에서 동일한 변수를 사용하려는 경우 유용합니다.
~~~
class Person
  def initialize(name, age)
    my_age = age # local variable, will be destroyed at end of constructor
    @name = name # instance variable, is only destroyed when the object is
  end

  def some_method
    puts "My name is #{@name}." # we can use @name with no problem
  end

  def another_method
    puts "My age is #{my_age}." # this will not work!
  end
end

mhmd = Person.new("Mark", 23)

mhmd.some_method #=> My name is Mark.
mhmd.another_method #=> throws an error
~~~
클래스 변수 앞에 @@ . 클래스의 모든 인스턴스에서 동일한 값을 포함합니다.
~~~
class Person
  @@persons_created = 0 # class variable, available to all objects of this class
  def initialize(name)
    @name = name

    # modification of class variable persists across all objects of this class
    @@persons_created += 1
  end

  def how_many_persons
    puts "persons created so far: #{@@persons_created}"
  end
end

mark = Person.new("Mark")
mark.how_many_persons #=> persons created so far: 1
helen = Person.new("Helen")

mark.how_many_persons #=> persons created so far: 2
helen.how_many_persons #=> persons created so far: 2
# you could either ask mark or helen
~~~
추가로, 전역 변수 앞에는 $ 붙습니다. 이러한 프로그램은 프로그램의 어느 곳에서나 사용할 수 있으므로 현명하게 사용하십시오.
~~~
$total_animals = 0

class Cat
  def initialize
    $total_animals += 1
  end
end

class Dog
  def initialize
    $total_animals += 1
  end
end

bob = Cat.new()
puts $total_animals #=> 1
fred = Dog.new()
puts $total_animals #=> 2
~~~