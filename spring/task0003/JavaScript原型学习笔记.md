js不包含传统的类继承模型，而是使用prototypal原型模型。
## 原型

原型就是一个对象，其他对象可以通过它实现属性继承。

一个对象的真正原型是被对象内部的[[Prototype]]属性(property)所持有。ECMA引入了标准对象原型访问器Object.getPrototype(object)，到目前为止只有Firefox和chrome实现了此访问器。除了IE，其他的浏览器支持非标准的访问器\_\_proto__，如果这两者都不起作用的，我们需要从对象的构造函数中找到的它原型属性。

在js中，如果它不是一个主数据类型（undefined,null,boolean,number,string），那它就是一个对象，对象是属性的集合。**但当我们试图获取一个主数据类型的原型时，它会被强制转化为一个对象。**

### 原型的使用方式1

通过给对象的prototype属性赋值对象字面量来设定对象的原型：

    var Calculator = function (decimalDigits, tax) {
        this.decimalDigits = decimalDigits;
        this.tax = tax;
    }

    Calculator.prototype = {
        add: function(x, y) {
            return x + y;
        },
        
        subtract: function(x, y) {
            return x - y;
        }
    };

这样我们就可以new Caculator对象以后，调用add方法来计算结果了。

### 原型的使用方式2

第二种方法是，在赋值原型prototype的时候使用function立即执行的表达式来赋值：

    Caculator.prototype = function () {
        add = function(x, y) {
            return x + y;
        },

        subtract = function(x, y) {
            return x - y;
        }
        
        return {
            add: add,
            subtract: subtract
        }
    } ();

这种方法可以封装私有的function，通过return的形式暴露出简单的使用名称，以达到public/private的效果。我们可以在new Calculator对象以后调用add方法来计算结果了。

另外，原型的每个属性可以不必像之前一样一次性设置，可以分开设置：

    var BaseCalculator = function() {
        //为每个实例都声明一个小数位数
        this.decimalDigits = 2;
    };

    //使用原型给BaseCalculator扩展2个对象方法
    BaseCalculator.prototype.add = function(x, y) {
        return x + y;
    }

    BaseCalculator.prototype.subtract = function(x, y) {
        return x - y;
    }

这里首先声明了一个BaseCalculator对象，构造函数里会初始化一个小数位数的属性，然后通过原型属性设置两个function。

    var Calculator = function() {
        //为每个实例都声明一个税收数字
        this.tax = 5;
    };

    Calculator.prototype = new BaseCalculator();

我们可以看到Caculator的原型是指向到BaseCaculator的一个实例上，目的是让Caculator集成它的两个function。**由于它的原型是BaseCaculator的一个实例，所以不管创建多少个Caculator对象实例，他们的原型指向的都是同一个实例。**创建Caculator实例后，可以访问到它的decimalDigits属性值和两个function。

    var Calculator = function() {
        this.tax = 5;
    };

    Calculator.prototype = BaseCalculator.prototype;

通过将BaseCaculator的原型赋给Caculator的原型，这样你在Caculator的实例上就访问不到decimalDigits值了。（但是还能访问到两个function，因为function是定义在原型属性里面的）

**需要理解的是，在定义一个prototype的时候，会构造一个原型对象，这个原型对象存储于构造这个prototype的函数的原型方法之中。**如下图：

![](http://files.jb51.net/file_images/article/201207/201207071647184.png)

其中\_\_proto__相当于一个链接指针,每个对象都有一个\_\_prototype__属性，指向创建该对象的函数的prototype。

**特例：Object.prototype的\_\_prototype__指向null**
## 重写原型
在使用第三方JS类库的时候，往往有时候他们定义的原型方法是不能满足我们的需要，但是又离不开这个类库，所以这时候我们就需要重写他们的原型中的一个或者多个属性或function，我们可以通过继续声明的同名的方法来达到覆盖重写前面的function。**重写的代码需要放在最后，这样才能覆盖前面的代码**

## 原型链
    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}
    // 设置Bar的prototype属性为Foo的实例对象
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // 修正Bar.prototype.constructor为Bar本身
    Bar.prototype.constructor = Bar;

    var test = new Bar() // 创建Bar的一个新实例

    // 原型链
    test [Bar的实例]
        Bar.prototype [Foo的实例]
            { foo: 'Hello World' }
            Foo.prototype
                {method: ...};
                Object.prototype
                    {toString: ... /* etc. */};

这个例子中，test对象从Bar.prototype和Foo.prototype继承下来；因此，它能访问Foo的原型方法method。同时，它也能够访问那个定义在原型上的Foo实例属性value。（所有的Bar实例都会共享相同的value属性）

### 属性查找

当查找一个对象的属性时，js会**向上**遍历原型链，直到找到给定名称的属性为止，到查找到达原型链的顶部，也就是Object.prototype。如果任然没有找到指定的属性，就会返回undefined。

    function foo() {
        this.add = function (x, y) {
            return x + y;
        }
    }
 
    foo.prototype.add = function (x, y) {
        return x + y + 10;
    }
 
    Object.prototype.subtract = function (x, y) {
        return x - y;
    }
 
    var f = new foo();
    alert(f.add(1, 2)); //结果是3，而不是13
    alert(f.subtract(1, 2)); //结果是-1

需要强调的是，属性在查找的时候，先查找自身的属性，如果没有再查找原型，如果没有，再往上走，一直查到object原型，**所以在某种层面上说，用for in语句遍历属性的时候，效率也是个问题。

我们可以赋值任何类型的对象到原型上，但是不能赋值原子类型的值。

### hasOwnProperty函数
hasOwnProperty是Object.prototype的一个方法，能判断一个对象是否包含自定义属性而不是原型链上的属性，因为hasOwnProperty是js中唯一一个处理属性但是不查找原型链的函数。

但存在一个问题：js不会保护hasOwnProperty被非法占用，因此如果一个对象碰巧存在这个属性，就需要使用外部的hasOwnProperty函数来获取正确的结果。
  
    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: "Here be dragons"
    };

    foo.hasOwnProperty("bar");           //总是返回false

    //使用{}对象的hasOwnProperty,并将其执行环境设置为foo
    {}.hasOwnProperty.call(foo, "bar");  //true

在使用for in loop遍历对象时，推荐总是使用hasOwnProperty方法，这会避免原型对象扩展带来的干扰。


### instanceof函数

instanceof表示的就是一种继承关系，或者原型链的结构

![](http://images.cnitblog.com/blog/138012/201409/181635128935132.png)
![](http://images.cnitblog.com/blog/138012/201409/181635468939277.png)

    console.log(A instanceof B);

Instanceof的判断队则是：沿着A的\_\_proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

#### 一些怪异行为的理解：

![](http://images.cnitblog.com/blog/138012/201409/181636252689920.png)

![](http://images.cnitblog.com/blog/138012/201409/181637013624694.png)
