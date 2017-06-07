# JavaScript面对对象编程
## 封装
js是一种基于对象的语言，我们遇到的所有东西几乎都是对象。但是，它又不是一种真正面向对象编程（OOP）语言，因为他的语法中没有class（类）。

一般的做法是，我们将属性和方法封装成一个对象，甚至从原生对象生成一个实例对象。

### 生成实例对象的原始模式

    var Cat = {
        name : '',
        color : ''
    }

    var cat1 = {};
    cat1.name = "大毛";
    cat1.color = "黄色"; 

     var cat2 = {};
    cat2.name = "二毛";
    cat2.color = "黑色";

这是最简单的封装，把两个属性封装在一个对象里面。但是，这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。

### 原始模式的改进

    function Cat(name, color) {
        return {
            name: name,
            color: color
        }
    }

    var cat1 = Cat("大毛", "黄色");
    var cat2 = Cat("二毛", "黑色");

这种方法虽然好了一点，但是cat1和cat2之间任然没有内在的联系，不能反映出它们是同一个原型对象的实例。

### 构造函数模式

    function Cat(name, color) {
        this.name = name;
        this.color = color;
    }

    var cat1 = new Cat("大毛", "黄色");
    var cat2 = new Cat("二毛", "黑色");

这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。

    alert(cat1.constructor == Cat);   //true
    alert(cat2.constructor == Cat);   //true

构造函数方法很好用，但是存在一个浪费内存的问题。

    function Cat(name,color){
        this.name = name;
        this.color = color;
        this.type = "猫科动物";
        this.eat = function(){
            alert("吃老鼠");
        };
    }

    var cat1 = new Cat("大毛","黄色");
    var cat2 = new Cat ("二毛","黑色");
    alert(cat1.type); // 猫科动物
    cat1.eat(); // 吃老鼠

这样做表面上好像没什么问题，但实际上有很大的弊端。那就是对于每一个实例对象，type和eat()方法都是一模一样的内容，每次生成一个实例，都必须为重复的内容，多占用一些内存。

    alert(cat1.eat === cat2.eat);  //false

### prototype模式

    function Cat(name, color) {
        this.name = name;
    }

    Cat.prototype.type = "猫科动物";
    Cat.prototype.eat = function() {
        alert("吃老鼠")
    }

用这种方法，所有实例的type和eat()方法，其实都是同一个内存地址，指向Prototype对象。

#### isPrototypeOf()

这个方法用来判断，某个prototype对象和某个实例之间的关系。

    alert(Cat.prototype.isPrototypeOf(cat1)); //true
    alert(Cat.prototype.isPrototypeOf(cat2)); //true

#### in运算符

in可以用来判断某个实例是否含有某个属性，不管是不是本地属性。in运算符还可以用来遍历某个对象的所有属性

    alert("name" in cat1); // true
    alert("type" in cat1); // true

## 构造函数的继承

    function Animal(){
        this.species = "动物";
    }

    function Cat(name, color) {
        this.name - name;
        this.color = color;
    }

如果我们要让Cat继承Animal，可以使用如下五种方法：

### 构造函数绑定

使用call或apply方法，将父对象的构造函数绑定在子对象上。

    function Cat(name,color){
        Animal.apply(this, arguments);
        this.name = name;
        this.color = color;
    }

    var cat1 = new Cat("大毛","黄色");
    alert(cat1.species); // 动物

### prototype模式

第二种方法更常见，使用prototype属性。

    Cat.prototype = new Animal();
    Cat.prototype.constructor = Cat;
    var cat1 = new Cat("大毛","黄色");
    alert(cat1.species); // 动物

代码第一行，我们将cat的prototype对象指向一个Animal的实例。

**代码第二行将Cat.prototype.constructor从Cat变成Animal纠正。因为这会导致继承链的紊乱（cat1明明是用构造函数Cat生成的）**

所以我们在编程的时候应该遵循的是，如果替换了prototype对象，那么下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。

    o.prototype = {};
    o.prototype.constructor = o;

### 直接继承prototype

这种方法是对prototype模式的改进。因为Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过Animal()，直接继承Animal.prototype。

    funcion Animal() {}
    Animal.prototype.species = "动物"

    Cat.prototype = Animal.prototype;
    Cat.prototype.constructor = Cat;  //这一行实际上把Animal.prototype对象的constructor属性也改掉了
    var cat1 = new Cat("大毛", "黄色");
    alert(cat1.species);   //动物

    alert(Animal.prototype.constructor);   //Cat

与前一种方法比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

### 利用空对象作为中介

    var F = function() {};
    F.prototpe = Animal.prototype;
    Cat.prototype = new F();
    Cat.prototype.constructor = Cat;

F是空对象，所以几乎不占内存，这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。

    alert(Animal.prototype.constructor);  //Animal

我们可以将上面的方法封装成一个函数，便于使用。

    function extend(Child, Parent) {
        var F = function() {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.uber = Parent.prototype;
    }

函数的最后一行是为子对象设置一个uber属性，这个属性直接指向父对象的prototype属性。这等于在子对象上打开一条通道，可以直接调用父对象的方法，是为了实现继承的完备性，属于备用性质。

### 拷贝继承

    function extend2(Child, Parent) {
        var p = Parent.prototype;
        var c = Child.prototype;
        for(var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
    }

这个函数的作用，就是将父对象的prototype对象中的属性拷贝给Child对象的prototype对象。

## 组合继承

组合继承是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

    function Parent(age){
        this.name = ['mike','jack','smith'];
        this.age = age;
    }
    Parent.prototype.run = function () {
        return this.name  + ' are both' + this.age;
    };
    function Child(age){
        Parent.call(this,age);//对象冒充，给超类型传参
    }
    Child.prototype = new Parent();//原型链继承
    var test = new Child(21);//写new Parent(21)也行
    alert(test.run());//mike,jack,smith are both21

## 非构造函数的继承

    var Chinese = {
        nation: "中国";
    }

    var Doctor = {
        Career: "医生";
    }

这里两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现继承。那么我们怎样才能让医生继承中国人。

### object()方法

    functipn oject(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使子对象与父对象连在一起。使用方法：

    var Doctor = object(Chinese);
    Doctor.career = "医生";
    alert(Doctor.nation);  //中国

### 浅拷贝

除了使用prototype链以外，还有另外一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

    function extendCopy(p) {
        var c = {};
        for(var i in p) {
            c[i] = p[i];
        }

        c.uber = p;
        return c;
    }

使用方法：

    var Doctor = extendCopy(chinese);
    Doctor.career = "医生";
    alert(Doctor.nation);   //中国

但是，这样的拷贝有一个问题。如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的知识一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

例如：

    Chinese.birthPlaces = ["北京", "上海", "香港"];
    var Doctor = extendCopy(Chinese);
    Doctor.birthPlaces.push("厦门");

    alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
    alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门

Chinese的出生地也被改掉了。这种方法只能拷贝基本类型的数据，我们把这种拷贝叫做“浅拷贝”。

### 深拷贝

深拷贝能够实现真正意义上的数组和对象的拷贝。

    function deepCopy(p, c) {
        var c = c || {};
        for(var i in p) {
            if(typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], c[i]);
            }
            else {
                c[i] = p[i];
            }
        }
        return c;
    }

使用方法同上，改变Doctor的出生地不会改变Chinese的出生地。目前，Jquery库使用的就是这种继承方法。