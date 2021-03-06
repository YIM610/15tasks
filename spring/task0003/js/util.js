//2.1
//判断arr是否为一个数组，返回一个布尔值
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
}

//判断fu是否为一个函数，返回一个布尔值

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
		clone = {};                        //如果只留花括号，则定义只包含默认属性和方法的对象
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
	if (name.indexOf(className) !== -1) {   //返回classname在name中第一次出现的索引
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
function $(selector) {
    var allchilds = [];
    var childs = function (element) {    // 递归获取所有子元素
        return element.getElementsByTagName('*');
    }

    var ele = document.getElementsByTagName('html')[0];    // 获取所有元素
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var eleLen = ele.length;
        var isGet = false;

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].id === sele[i].substring(1)) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '.':
                for (var j = 0; j < eleLen; j++) {
                    var name = uniqArray(ele[j].className.split(' '));
                    if (name.indexOf(sele[i].substring(1)) !== -1) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key] === value) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key]) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                break;
            default :
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].tagName === sele[i].toUpperCase()) {    // tagName 属性的返回值始终是大写的
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
        }
    }

    if (!isGet) {
        ele = null;
    }

    return ele;
}

/*
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
*/


// task 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element.addEventListener(event, listener);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	element.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
	addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	addEvent(element, 'keydown', function(e) {
		var event = e || event.keyCode;
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) {
			listener.call(element, event);
		}
	});
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// task 4.2
// 对一个列表里所有的<li>增加点击事件的监听
function clickListener(event) {
	console.log(event);
}

// 我们通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了。
function clickListener(event) {
	console.log(event);
}

function renderList() {
	$("#list").innerHTML = '<li>new item</li>';
}

function init() {
    /*
    each($("#list").getElementsByTagName("li"),function(item) {
	    $.click(item, clickListener);
    })
    */
	$.click($("#btn"),renderList);
}

// 我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了。
// 那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法。
function delegateEvent(element, tag, eventName, listener) {
	addEvent(element, eventName, function(e) {
		var event = e || window.event;
		var tag = event.target || event.srcElement;

		if (target && target.tagName === tag.toUpperCase()) {
			listener.call(target, event);
		}
	});
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
/*
$.delegate($("#list"), "li", "click", clickListener);
*/

//task 5.1
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	return /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : -1;
}

// 设置cookie
function isValidCookieName(cookieName) {
	return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\/\\u0080-\\uffff]+\x24'))
	    .test(cookieName);
}

function setCookie(cookieName, cookieValue, expiredays) {
	if (!isValidCookieName(cookieName)) {
		return;
	}

	var exdate = "";
	if (expiredays) {
		exdate = new Date();
		exdate.setTime(exdate.getDate() + expiredays);
		var expires = ";expires=" + exdate.toUTCString();
	}
	document.cookie = cookieName + '=' + encodeURIComponent(cookieValue) + expires;
}

//获取Cookie值
function getCookie(cookieName) {
	if (!isValidCookieName) {
		return null;
	}

	var re = new RegExp(cookieName + "=(.*?)($|;)");
	return re.exec(document.cookie)[1] || null;
}

// task 6.1
// 学习Ajax，并尝试自己封装一个Ajax方法。
function ajax(url, options) {
	//创建对象
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
        xmlhttp = new ActiveXObjext("Microsoft.XMLHTTP");
	}

	//处理data
	if (options.data) {
		var dataarr = [];
		for(var item in options.data) {
			dataarr.push(item + '=' + encodeURI(options.data[item]));
		}
		var data = dataarr.join('&')
	}

	//处理type
	if (!options.type) {
		options.type = "GET";
	}
	options.type = options.type.toUpperCase();

	//发送请求
	if (options.type ==="GET") {
		var myURL = "";
		if (options.data) {
			myURL = url + '?' + data;
		}
		else {
			myURL = url;
		}
		xmlhttp.open("get", myURL, true);
		xmlhttp.send();
	}
	else if (options.type === "POST") {
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-typr", "application/x-www-form-urlencoded");
		xmlhttp.send(data);
	}

	//readyState
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				if (options.onsuccess) {
					options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
				}
			}
			else {
				if (options.onfail) {
					options.onfail();
				}
			}
		}
	}
}


// 使用示例：
/*
ajax(
    'prompt.php',
    {
        data: {
            q: 'a'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
        onfail : function () {
            console.log('fail');
        }
    }
);
*/