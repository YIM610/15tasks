#闭包
正常情况下，我们不能再函数外面访问函数内的局部变量。我们可以变通方法，在函数的内部，再定义一个函数。

    function f1() {
        var n = 999;

        function f2() {
            alert(n);   //999
        }
    }

在上面的代码中，f2被包含在函数f1的内部，这时候f1内部的所有局部变量，对f2都是可见的。那么既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们就可以再f1外部读取它的内部变量了。

    function f1() {
        var n = 999;

        function f2() {
            alert(n);
        }

        return f2;
    }

    var result = f1();
    result();          //999

这个f2函数，我们就称为闭包。通俗来说，闭包就是能够读取其他函数内部变量的函数。我们还可以把闭包简单理解成“定义在一个函数内部的函数”，所以在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

##闭包的用途

最大的用途有两个：

1. 读取函数内部的变量
2. 让局部变量的值始终保存在内存中

        function f1() {
            var n = 999;

            nAdd = function() {
                n += 1;
            }

            function f2() {
                alert(n);
            }

            return f2;
        }
 
        var result = f1();
        result();          //999
        nAdd();
        result();           //1000


在这段代码中，result实际上就是闭包f2函数，它一共运行两次，一次的值是999，第二次的值是1000.这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

这段代码中另一个值得注意的地方，就是nAdd声明的时候没有使用var关键字，因此nAdd是一个全局变量，它的值是一个匿名函数，这个匿名函数本身也是一个闭包，所有nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

##使用闭包的注意点

1. 由于闭包会使得函数中的变量都保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
2. 闭包会在父函数外部，改变副函数内部变量的值。所以，如果你把父函数当做对象使用，把闭包当做它的公用方法，把内部变量当做它的私有属性，这时一定要小心，不要随便改变副函数内部变量的值。

另外，我们需要知道，每次函数调用的时候创建一个新的闭包。
   
    function newClosure(someNum, someRef) {
        // Local variables that end up within closure
        var num = someNum;
        var anArray = [1,2,3];
        var ref = someRef;
        return function(x) {
            num += x;
            anArray.push(num);
            alert('num: ' + num +
            '\nanArray ' + anArray.toString() +
            '\nref.someVar ' + ref.someVar);
        }
    }
 
    closure1=newClosure(40,{someVar:'closure 1'});
    closure2=newClosure(1000,{someVar:'closure 2'});
 
    closure1(5); // num:45 anArray[1,2,3,45] ref:'someVar closure1'
    closure2(-10);// num:990 anArray[1,2,3,990] ref:'someVar closure2'