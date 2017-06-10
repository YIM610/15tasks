# 设计模式

js设计模式的作用——提高代码的重用性，可读性，使代码更容易维护和拓展。

## 单体模式

单体模式是js中最基本最有用的模式。单体在js中有多种用途，用来划分命名空间。可以减少网页中全局变量的数量，可以再多人开发时避免代码的冲突。

在中小型项目或者功能中，单体可以用作命名空间把自己的代码组织在一个全局变量名下：在稍大或复杂的功能中，单体可以用来把相关代码组织在一起以便日后好维护。

使用单体的方法就是用一个命名空间包含自己的所有代码：

    var functionGroup = {
        name: "Darren",
        method1: function() {
            //code
        },
        init: function() {
            //code
        }
    }

或者:

    var functionGroup = new function myGroup() {
        this.name = "Darren";
        this.getName = function() {
            return this.name;
        }
        this.method1 = function() {
            //code
        }
    }

## 工厂模式

提供一个创建一系列相关或相互依赖对象的接口，无需指定他们具体的类。

工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合。通过使用工厂方法而不是new关键字及具体类，可以把所有实例化的代码都集中在一个位置，有助于创建模块化的代码，这是工厂模式的目的和优势。

实际上在js里面，所谓的构造函数也是一个简单工厂。只是批了一件new的衣服。

比如有一个大功能要做，其中有一部分是要考虑扩展性的，那么这部分代码就可以考虑抽象出来，当做一个全新的对象处理。好处就是将来扩展的时候容易维护，只需要操作这个对象的内部方法和属性，达到了动态实现的目的。

    var XMLHttpFactory = function() {};
    XMLHttpFactory.createXMLHttp = function() {
        var XMLHttp = null;
        if(window.XMLHttpRequest) {
            XMLHttp = new XMLHttpRequest()
        }
        else if(window.ActiveXObject) {
            XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        return XMLHttp;
    }

    //XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象。
    var AjaxHander = function() {
        var XMLHttp = XMLHttpFactory.createXMLHttp();
        //...
    }

工厂模式又区分为简单工厂模式和抽象工厂模式，上面介绍的是简单工厂模式，这种模式用的更多也更简单。

而抽象工厂模式的使用方法是先设计一个抽象类，这个类不能被实例化，只能用来派生子类，最后通过对子类的扩展实现工厂方法：

    var XMLHttpFactory = function(){};
    XMLHttpFactory.prototype = {  
        //如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类  
        createFactory:function(){  
           throw new Error('This is an abstract class');  
        }  
    }
  
    //派生子类，继承的模式，不明白可以去参考原理  
    var XHRHandler = function(){  
        XMLHttpFactory.call(this);  
    };  
    XHRHandler.prototype = new XMLHttpFactory();  
    XHRHandler.prototype.constructor = XHRHandler;  
    //重新定义createFactory 方法  
    XHRHandler.prototype.createFactory = function(){  
        var XMLHttp = null;  
        if (window.XMLHttpRequest){  
           XMLHttp = new XMLHttpRequest()  
        }
        else if (window.ActiveXObject){  
            XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")  
        }  
        return XMLHttp;  
    } 

## 观察者模式

观察者模式是最常用的模式之一，在很多语言里都得到大量应用，包括我们平时接触的dom事件，也是js和dom之间实现的一种观察者模式。

    div.onclick = function click() {
        alert("click");
    }

只要订阅了div的click事件，当点击div的时候，function click就会被触发。

好莱坞有句名言. “不要给我打电话， 我会给你打电话”. 这句话就解释了一个观察者模式的来龙去脉。 其中“我”是发布者， “你”是订阅者。

观察者模式可以很好的实现2个模块之间的解耦。

    loadImage(imgAry, function(){
    Map.init();
    Gamer.init();
    Sount.init();
    })

改进后：

    loadImage.listen("ready", function(){
        map.init();
    })

    loadImage.listen("ready", function(){
        Gamer.init();
    })

    loadImage.listen("ready", function(){
        Sount.init();
    })

loadImage完成之后，它根本不会关心将来发生什么。它现在只要发布一个信号：

    loadImage.trigger("ready");

那么监听它的ready事件的对象都会收到通知。

## 桥接模式

在实现API的时候，桥梁模式非常有用。在所有模式中，这种模式最容易立即付诸实践。

桥梁模式可以用来弱化它与使用它的类和对象之间的耦合，就是将抽象与其实现隔离开来，以便二者独立变化。这种模式对于js中常见的时间驱动的编程有很大益处，桥梁模式最常见和实际的应用场合之一是时间监听器回调函数。

    var singleton = function( fn ){
        var result;
        return function(){
            return result || ( result = fn .apply( this, arguments ) );
        }
    }
 
    var createMask = singleton( function(){
 
    return document.body.appendChild( document.createElement('div') );
 
    })

singleton是抽象部分，而createMask是实现部分。他们完全可以独立变化互不影响。如果需要写一个createScript就一点都不费力：

    var creatrScript = singleton(fuction(){
        return document.body.appendChild(document.createElement("script"));
    })

另外一个常见的例子就是forEach函数的实现，用来迭代一个数组：

    forEach = function(arr, fn) {
        for(var i = 0, l = arr.length; i < l; i++) {
            var c = arr[i];
            if(fn.call(c, i, c) === false) {  //是为了按任何顺序输入c,i都能被识别
                return false;
            }
        }
    }

**桥梁模式还可以用于连接公开的API代码和私有的实现代码，还可以把多个类连接在一起。**

## 装饰者模式

这个模式能够动态地给对象添加一些额外的职责。就扩展功能而言，它比生成子类方式更为灵活。

装饰者模式和组合模式有很多共同点，他们都与所包装的对象实现统一的接口并且会把任何方法调用传递给这些对象。可是组合模式用于把众多子对象组织为一个整体，而装饰者模式用于在不修改现有对象或从派生子类的前提下为其添加方法。

    //创建一个命名空间为myText.Decorations  
    var myText = {};  
    myText.Decorations = {};  
    myText.Core = function(myString){  
        this.show = function(){return myString;}  
    }  
    //第一次装饰  
    myText.Decorations.addQuestuibMark = function(myString){  
        this.show = function(){return myString.show()+'?';};  
    }  
    //第二次装饰  
    myText.Decorations.makeItalic = function(myString){  
        this.show = function(){return '<li>'+myString.show()+'</li>'};  
    }  
    //得到myText.Core的实例  
    var theString = new myText.Core('this is a sample test String');  
    alert(theString.show());      //output 'this is a sample test String'  
    theString = new myText.Decorations.addQuestuibMark(theString);  
    alert(theString.show());      //output 'this is a sample test String?'  
    theString = new myText.Decorations.makeItalic (theString);  
    alert(theString.show());      //output '<li>this is a sample test String</li>'

## 代理模式

代理模式的定义是把对一个对象的访问，交给另外一个代理对象来操作。 

## 组合模式

组合模式是一种专为创建web上的动态用户界面而量身定做的模式。使用这种模式，可以用一条命令在多个对象上激发复杂的或递归的行为。组合模式擅长于对大批对象进行操作。

优点：

1. 可以用同样的方法处理对象的集合与其中的特定子对象
2. 可以把一批子对象组织成树形结构，并且使整棵树都可以被遍历。

范围：

1. 存在一批组织成某处层次体系的对象
2. 希望这批对象或者其中一部分对象实话一个操作

其实组合模式就是将一系列相似或相近的对象组合在一个大的对象，由这个大对象提供一些常用接口来对这些小对象进行操作，代码可重用，对外操作简单。

## 门面模式

门面模式是几乎所有js库的核心原则。门面模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

门面模式的两个作用：

1. 简化类的接口。
2. 消除类与使用它的客户代码之间的耦合。 

        var addEvent = function(el,type,fn) {  
            if(window.addEventListener){  
                el.addEventListener(type,fn);  
            }
            else if(window.attachEvent){  
                el.attachEvent('on'+type,fn);  
            }
            else{  
                el['on'+type] = fn;  
            }  
        }

有一个例子：

    var getName = function(){
        return ''svenzeng"
    }
    var getSex = function(){
       return 'man'
    }

如果我们需要一起调用getName和getSex函数，那可以用一个更高层的接口getUserinfo来调用：

    var getUserInfo = function() {
        var info = a() + b();
        return info;
    }

门面模式还有一个好处是可以对用户隐藏真正的实现细节，用户只关心最高层的接口。比如在烧鸭饭套餐中，你并不关心师傅是先做烤鸭还是先炒白菜，也不关心那只鸭子是在哪里成长的。

## 适配器模式

适配器模式是将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的类可以一起工作，使用这种模式的对象又叫包装器，因为他们是在用一个新的接口包装另一个对象。

从表面上看，它和门面模式有一点相似，差别在于他们如何改变接口，门面模式展现的是一个简化的接口，它并不提供额外的选择，而适配器模式则要把一个接口转换为另一个接口，它并不会滤除某些功能，也不会简化接口：

    //假如有一个3个字符串参数的函数，但是现在拥有的却是一个包含三个字符串元素的对象，那么就可以用一个配置器来衔接二者  
    var clientObject = {  
        str1:'bat',  
        str2:'foo',  
        str3:'baz' 
    }  
    function interfaceMethod(str1,str2,str3){  
        alert(str1)  
    }  
    //配置器函数  
    function adapterMethod(o){  
        interfaceMethod(o.str1, o.str2, o.str3);  
    }  
    adapterMethod(clientObject)  
    //adapterMethod函数的作为就在于对interfaceMethod函数进行包装，并把传递给它的参数转换为后者需要的形式。

## 享元模式

享元模式可以避免大量非常类似类的开销。在程序设计中有时需要生成大量细粒度的类实例来表示数据。如果发现这些实例除了几个参数外基本都是相同的，有时就能大幅度地减少需要实例化类的数量，如果能把这些参数移到实例外面，在方法调用时将他们传递进来，就可以通过共享大幅度地减少单个实例的数目。

组成部分：

1. “享元”：抽离出来的外部操作和数据;
2. “工厂”：创造对象的工厂;
3. “存储器”：存储实例对象的对象或数组，供“享元”来统一控制和管理。

关键：

1. 合理划分内部和外部数据。既要保持每个对象的模块性、保证享元的独立、可维护，又要尽可能多的抽离外部数据。
2. 管理所有实例既然抽离出了外部数据和操作，那享元就必须可以访问和控制实例对象。在JavaScript这种动态语言中，这个需求是很容易实现的：我们可以把工厂生产出的对象简单的扔在一个数组中。为每个对象设计暴露给外部的方法，便于享元的控制。

## 访问者模式

那么通俗点讲，访问者模式先把一些可复用的行为抽象到一个函数(对象)里，这个函数我们就称为访问者（Visitor）。如果另外一些对象要调用这个函数，只需要把那些对象当作参数传给这个函数，在js里我们经常通过call或者apply的方式传递this对象给一个Visitor函数.

例子中，我们利用访问者模式，给object对象增加push方法：

    var Visitor = {};
    Visitor.push = function() {
        return Array.prototype.push.apply(this, arguments);
    }

    var obj = {};
    obj.push = Visitor.push;
    obj.push("first");
    alert(obj[0]);       //"first"
    alert(obj.length);   //1

## 策略模式

策略模式就是定义一系列的算法，把他们一个个封装起来，并且使它们可以相互替换。

想象我们现在有一个表单文本框，需要验证非空，敏感词，字符过长这几种情况。当然是可以写3个if else来解决，但是这样写代码的扩展性和维护性可想而知。如果表单里面的元素再多一点，需要校验的情况多一点，加起来写上百个if else也不是没有可能。

所以更好的做法是把每种验证规则都用策略模式单独的封装起来。需要哪种验证的时候只需要提供这个策略的名字：

    nameInput.addValidata({
        notNull: true,
        dirtyWords: true,
        maxLength: 30
    })

    而notNull，maxLength等方法只需要统一的返回true或者false，来表示是否通过了验证。
    validataList = {
        notNull: function( value ){
        return value !== '';
        },
        maxLength: function( value, maxLen ){
            return value.length() > maxLen;
        }
   }

##模板方法模式

模板方法是预先定义一组算法，先把算法的不变部分抽象到父类，再将另外一些可变的步骤延迟到子类去实现。

一个很常见的场景是在一个公司的项目中，经常由架构师搭好架构，声明出抽象方法。下面的程序员再分头重写这些抽象方法。

假如上帝创造生命时用到了模板方法模式：

    var Life = function() {};
    Life.prototype.init = function() {
        this.DNA复制();
        this.出生();
        this.成长();
        this.衰老();
        this.死亡();
    }
    this.prototype.DNA复制 = function() {
        //code
    };
    this.prototype.出生 = function() {};
    //...

其中DNA复制是预先定义的算法中的不变部分，所有子类都不能改写它。而其他方法在父类中会被先定义成一个空函数，然后被子类重写，这就是模板方法中所谓的可变的步骤。

    var Mammal = function() {};
    Mammal.prototype = Life.prototype;
    Mammal.prototype.出生 = function() {
        //code
    }

## 中介者模式

中介者对象可以让各个对象之间不需要显示的相互作用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

![](http://jbcdn2.b0.upaiyun.com/2012/10/image-4.png)

![](http://jbcdn2.b0.upaiyun.com/2012/10/image-5.png)

代理模式中A知道B的一切，而中介者模式中A,B,C对E,F,G的实现并不关心，而且中介者模式可以连接任意多种对象。

    var mode1 = Mode.create(),  mode2 = Mode.create();
    var view1 = View.create(),   view2 = View.create();
    var controler1 = Controler.create( mode1, view1, function(){
        view1.el.find( ''div' ).bind( ''click', function(){
            this.innerHTML = mode1.find( 'data' );
        })
    })
    var controler2 = Controler.create( mode2 view2, function(){
        view1.el.find( ''div' ).bind( ''click', function(){
            this.innerHTML = mode2.find( 'data' );
        })
    })

## 迭代器模式

迭代器模式提供一种方法顺序访问一个聚合对象中各个元素，而又不需要暴露该方法中的内部表示。

js中我们经常会封装一个each函数实现迭代器

    forEach = function(ary, fn) {  
        for (var i = 0, l = ary.length; i < l; i++) {    
            var c = ary[ i ];
            if (fn.call(c, i, c) === false){      
                return false;    
            }   
        }
    }

    forEach( [ 1, 2, 3 ], function( i, n ){
        alert ( i );
    })

obj的迭代器：

    forEach = function(obj, fn) {
        for (var i in obj) {    
            var c = obj[ i ];
            if (fn.call( c, i, c ) === false) {
                return false;    
            }   
        }
    }

    forEach( {"a": 1,"b": 2}, function( i, n ){
        alert ( i );
    })