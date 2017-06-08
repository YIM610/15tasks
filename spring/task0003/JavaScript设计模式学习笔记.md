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

好莱坞有句名言. “不要给我打电话， 我会给你打电话”. 这句话就解释了一个观察者模式的来龙去脉。 其中“我”是发布者， “你”是订阅者。

观察者模式可以很好的实现2个模块之间的解耦。

## 桥接模式

在实现API的时候，桥梁模式非常有用。在所有模式中，这种模式最容易立即付诸实践。

桥梁模式可以用来弱化它与使用它的类和对象之间的耦合，就是将抽象与其实现隔离开来，以便二者独立变化。这种模式对于js中常见的时间驱动的编程有很大益处，桥梁模式最常见和实际的应用场合之一是时间监听器回调函数。

不好的示例：

    element.onclick = function() {
        new setLogFunc();
    }

这段代码中无法看出LogFun方法要显示在什么地方以及有什么可配置的选项以及应该怎样去修改它。桥梁模式就是要解决这个问题，让接口可配置。把页面中的一个个功能都想象成模块，接口可以使得模块之间的耦合降低。

桥梁模式目的就是让API更加健壮，提高组件的模块化程度，促成更简洁的实现，并提高抽象的灵活性：

    element.onclick = function() {
        //API可控制性提高了，使得这个API更加健壮
        new someFunction(element, param, callback);
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

门面模式是几乎所有js库的核心原则。子系统中的一组接口提供一个一致的界面，门面模式定义了一个高层接口，这个接口使得这一子系统更加容易使用，它可以用来修改类和对象的接口，使其更便于使用。

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

    