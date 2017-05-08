//2.1
//判断arr是否为一个数组，返回一个布尔值
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fu) {
	return Object.prototype.toString.call(fn) === '[object Function]';
}


//2.2
//使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
//被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	var clone = src;
	if (src instanceof Date) {
		clone = new Date(src.getDate());
		return clone;
	}

	if (src instanceof Array) {
		clone = [];
		for(var key in src) {
			clone[key] = cloneObject(src[key]);
		}
		return clone;
	}

	if (src instanceof Object) {
		clone = {};       //如果只留花括号，则定义只包含默认属性和方法的对象
		for(var key in src) {
			if (src.hasOwnProperty(key)) {
				clone[key] = cloneObject(src[key]);
			}
		}
		return clone;
	}

	//对于数字、字符串、布尔、null、undefined
    return src;
}

// 测试用例：
/*
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/


//2.3
//对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(source){
	var len = source.length,
	    result = source.slice(0),
	    i,datum;

	//从后往前双重循环比较
	//如果两个元素相同，删除后一个
	while (--len>0) {
		datum = result[len];
		i = len;
		while(--i) {
			if (datum === result[i]) {
				result.splice(len, 1);
				break;
			}
		}
	}
	return result;
}

//hash
function uniqArray1(arr) {
	var obj = {};
	var result = [];
	for (var i = 0, len = arr.length; i<len; i++) {
		var key = arr[i];
		if (!obj[key]) {
			result.push(key);
			obj[key] = true;
		}
	}
	return result;
}

//hash+es5
//速度最快
function uniqArray2(arr) {
	var obj = {};
	for(var i = 0, len = arr.length; i < len; i++) {
		obj[arr[i]] = true;
	}
	return Object.keys(obj);
}

function uniqArray3(arr) {
	var new_array = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		if (arr[i] !== '' && new_array.indexof(arr[i]) < 0) {
			new_array.push(arr[i]);
		}
	}
	return new_array;
}

// 使用示例
/*
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);

var al = 10000;
var a = [];
while (al--){
a.push(al%2);
}

console.time('uniqArray')
console.log(uniqArray(a).length);
console.timeEnd('uniqArray')

console.time('uniqArray1')
console.log(uniqArray1(a).length);
console.timeEnd('uniqArray1')

console.time('uniqArray2')
console.log(uniqArray2(a).length);
console.timeEnd('uniqArray2')

console.time('uniqArray3')
console.log(uniqArray3(a).length);
console.timeEnd('uniqArray3')
*/


// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	function isEmpty(c) {
		return /\s/.test(c);
	}

	var len = str.length;
	for(var i = 0; i < len && isEmpty(str.charAt(i)); i++) {
		if (i === len) {   //全部都是空白字符
			return '';
		}
	for(var j = len; j && isEmpty(str.charAt(j - 1)); j--);
			return str.substring(i, j);
	}
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
/*
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
*/

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
	for(var i = 0, len = arr.length; i < len; i++) {
		fn(arr[i], i);
	}
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html
*/
function getObjectLength(obj) {
	var element = 0;
	for(var key in obj) {
		if (obj.hasOwnProperty(key)) {
			element++;
		}
	}
	return element;
}

// 使用示例
/*
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
*/

//task 2.4
//判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

function isMobilePhone(phone) {
	return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}

//task3.1
//element是否有这个类
function hasClass(element, className) {
	var name = element.className.match(/\S+/g) || [];
	if (name.indexof(className) !== -1) {   //返回classname在name中第一次出现的索引
		return true;
	}
	return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
    	element.className = trim(element.className + ' ' + newClassName);
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	if (hasClass(element, oldClassName)) {
		element.className = trim(element.className.replace(oldClassName, ''));
	}
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSilbingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var x = 0;
	var y = 0;
	var current = element;
	while(current !== null) {
		x += current.offsetLeft;
		y += current.offsetTop;
		current = current.offsetParent;
	}
	//element.getBoundingClientRect()   返回元素在页面中相对于视口的位置
	var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
	x -= scrollLeft;
    y -= scrollTop;
    return {
        x: x,
        y: y
    }
}

//task3.2
//实现一个简单的query
function $(selector) {                                       //$(selector)表示getElementById("selector")
	var ele = document;                                      //document是文档对象
	var sele = selector.replace(/\s+/, ' ').split(' ');      //除去多于的空格并分割
	for(var i = 0, len = sele.length; i < len; i++) {
		switch(sele[i][0]) {   //从子节点中查找？每一项的第一个字符？
			case '#':
			    ele = ele.getElementById(sele[i].substring(1));
			    break;
			case '.':
			    ele = ele.getElmentByClassName(sele[i].substring(1))[0];
			    break;
			case '[':
			    var valueLoc = sele[i].indexOf('=');
			    var temp = ele.getElementsByTagName('*');
			    var tlen = temp.length;
			    if (valueLoc !== -1) {
			    	var key = sele[i].substring(1, valueLoc);
			    	var value = sele[i].substring(valueLoc + 1,sele[i].length - 1);
			    	for (var j = 0; j < len; j++) {
			    	    if (temp[j][key] === value) {
			    		    ele = temp[j];
			    		    break;
			    	    }
			        }
			    }
			    else {
			    	var key = sele[i].substring(1, sele[i].length - 1);
			    	for(var j = 0; j < len; j++) {
			    		if (temp[j][key]) {
			    			ele = temp[j];
			    		    break;
			    		}
			    	}
			    }
			    default:
			        ele = ele.getElementsByTagName(sele[i])[0];
			        break;
		}
	}
	if (!ele) {
		ele = null;
	}
	return ele;
}