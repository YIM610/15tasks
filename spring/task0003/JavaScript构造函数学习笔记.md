## 构造函数

构造函数提供了一种方便的跨浏览器机制，这种机制允许在创建实例时为实例提供一个通用的原型。

需要注意的是，js并没有在构造函数（constructor）和其他函数之间做区分。但是构造函数内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

任何一个prototype对象都有一个constructor属性，指向它的构造函数。**另外每一个实例都有一个constructor属性，默认调用prototype对象的constructor属性**

每个函数都有一个原型属性。**函数的原型属性是一个对象，当这份函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例**

    //创建一个函数b
    var b = function(){ var one; }
    //使用b创建一个对象实例c
    var c = new b();
    //查看b 和c的构造函数
    b.constructor;  // function Function(){ [native code]}
    b.constructor==Function.constructor; //true
    c.constructor; //实例c的构造函数 即 b function(){ var one; }
    c.constructor==b //true
    //b是一个函数，查看b的原型如下
    b.constructor.prototype // function (){}
    b.__proto__  //function (){}
    
    //b是一个函数，由于javascript没有在构造函数constructor和函数function之间做区分，所以函数像constructor一样，
    //有一个原型属性，这和函数的原型(b.__proto__ 或者b.construtor.prototype)是不一样的
    b.prototype //[object Object]   函数b的原型属性

    b.prototype==b.constructor.prototype //fasle
    b.prototype==b.__proto__  //false
    b.__proto__==b.constructor.prototype //true

    //c是一个由b创建的对象实例，查看c的原型如下

    c.constructor.prototype //[object Object] 这是对象的原型

    c.__proto__ //[object Object] 这是对象的原型c.constructor.prototype==b.constructor.prototype;  //false  c的原型和b的原型比较

    c.constructor.prototype==b.prototype;  //true c的原型和b的原型属性比较


    //为函数b的原型属性添加一个属性max

    b.prototype.max = 3

    //实例c也有了一个属性max

    c.max  //3

上面的例子中，对象实例c的原型和函数的b的原型属性是一样的，如果改变b的原型属性，则对象实例c的原型也会改变，所以一个函数的原型属性其实和实际的原型没有关系对我们来说至关重要。

prototype与constructor的关系：

    function Dog() {}
    alert(Dog === Dog.prototype.constructor);  //true

### 关于this

一般而言，在js中，this指向函数执行时的当前对象。值得注意的是，该关键字在js中和执行环境而非声明环境有关。

    var someone = {
        name: "Bob",
        showName: function() {
            alert(this.name);
        }
    };

    var other = {
        name: "Tom",
        showName: someone.showName;
    }

    other.showName();    //Tom

在这个例子当中，this关键字虽然是在someone.showName中声明的，但运行的时候是other.showName,所以最后alert出来的是other.name。

当没有明确的执行时的当前对象时，this指向全局对象window。

    var name = "Tom";

    var Bob = {
        name: "Bob",
        show: function(){
            alert(this.name);
        }
    }

    var show = Bob.show;
    show();　　//Tom

但是我们不能简单的认为show是window对象下的方法。在局部变量引用的函数上，无法这样解释：

    var name = "window";

    var Bob = {
        name: "Bob",
        showName: function(){
            alert(this.name);
        }
    };

    var Tom = {
        name: "Tom",
        showName: function(){
            var fun = Bob.showName;
            fun();
        }
    };

    Tom.showName();　　//window

### this的用法

#### 作为函数调用

    function makeNoSense(x) { 
        this.x = x; 
    } 
 
    makeNoSense(5); 
    x;// x 已经成为一个值为 5 的全局变量

这是函数的最通常用法，函数被调用时，this被绑定到全局对象，接下来执行赋值语句，相当于隐式声明了一个全局变量。

对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生另外一个问题：

    var point = { 
        x : 0, 
        y : 0, 
        moveTo : function(x, y) { 
            // 内部函数
            var moveX = function(x) { 
            this.x = x;//this 绑定到了哪里？
            }; 
            // 内部函数
            var moveY = function(y) { 
                this.y = y;//this 绑定到了哪里？
            }; 
 
            moveX(x); 
            moveY(y); 
        } 
    }; 
    point.moveTo(1, 1); 
    point.x; //==>0 
    point.y; //==>0 
    x; //==>1 
    y; //==>1

这属于js的设计缺陷，正确的设计方式是内部函数的this应该绑定到其外层函数对应的对象上，为了规避这一设计确信，可以采用变量替代的方法，约定俗成，该变量一般被命名为that：

    var point = { 
        x : 0, 
        y : 0, 
        moveTo : function(x, y) { 
            var that = this; 
            // 内部函数
            var moveX = function(x) { 
                that.x = x; 
            }; 
            // 内部函数
            var moveY = function(y) { 
            that.y = y; 
            };
 
            moveX(x); 
            moveY(y); 
        } 
    }; 
    point.moveTo(1, 1); 
    point.x; //==>1 
    point.y; //==>1

#### 作为对象方法调用

函数可以作为某个对象的方法调用，这时this就指这个上级对象：

    var point = { 
        x : 0, 
        y : 0, 
        moveTo : function(x, y) { 
            this.x = this.x + x; 
            this.y = this.y + y; 
        } 
    }; 
 
    point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象

#### 作为构造函数调用
作为一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用，如果调用正确，this绑定到新创建的对象上。

    function Point(x, y){ 
        this.x = x; 
        this.y = y; 
    }
    
    var point1 = new Point();  //this绑定到point1上

#### 使用apply或call调用

apply和call能够强制改变函数执行时的当前对象，让this指向其他对象。

    var name = "window";
    
    var someone = {
        name: "Bob",
        showName: function(){
            alert(this.name);
        }
    };

    var other = {
        name: "Tom"
    };    

    someone.showName.apply();    //window
    someone.showName.apply(other);    //Tom

**当无参数时，当前对象为window，有参数时当前对象为该参数**

#### setTimeout、setInterval
在本节的第一个例子的答案是Bob,**需要注意的是，在浏览器中setTimeout、setInterval和匿名函数执行时的当前对象是全局对象window**所以浏览器中全局变量可以当成是window对象下的变量，例如全局变量a，可以用window.a来引用。

#### eval

对于eval函数，其执行时候似乎没有指定当前对象，但实际上其this并非指向window，因为该函数执行时的作用域是当前作用域，即等同于在该行将里面的代码填进去：

    var name = "window";

    var Bob = {
        name: "Bob",
        showName: function() {
            eval("alert(this.name)");
        }
    };
  
    Bob.showName();    //Bob

## 函数的执行环境

js中的函数既可以被当做普通函数执行，也可以作为对象 的方法执行，这是导致this含义如此丰富的主要原因。一个函数被执行时，会创建一个执行环境（ExecutionContext），函数的所有的行为均发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments变量，其中包含调用函数时传入的参数。接下来创建作用域链。然后初始化变量，首先初始化函数的形参表，值为 arguments变量中对应的值，如果 arguments变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ExecutionContext）创建成功后，函数执行时才会执行，这点对于我们理解 JavaScript 中的变量作用域非常重要。最后为 this变量赋值，如前所述，会根据函数调用方式的不同，赋给 this全局对象，当前对象等。至此函数的执行环境（ExecutionContext）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ExecutionContext）中读取。

### Function.bind

this在js中经常被误用的一种情况：回调函数。
js支持函数式编程，函数属于一级对象，可以作为参数被传递。请看下面的例子myObject.handler作为回调函数，会在onclick事件被触发时被调用，但此时，该函数已经在另外一个执行环境中执行了，this自然也不会绑定到myObject对象上。

    button.onclick = myObject.handler;

为了避免这种错误，许多js框架都提供了手动绑定this的方法，在新版的js中，已经提供了内置的bind方法供使用。