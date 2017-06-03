## 构造函数

构造函数提供了一种方便的跨浏览器机制，这种机制允许在创建实例时为实例提供一个通用的原型。

需要注意的是，js并没有在构造函数（constructor）和其他函数之间做区分，所有说每个函数都有一个原型属性。**函数的原型属性是一个对象，当这份函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例**

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