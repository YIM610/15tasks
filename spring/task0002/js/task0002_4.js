var promptWrap = $(".prompt-wrap");
var myText = $(".myText");
var word = $(".prompt-wrap").getElementsByTagName("li");
var result = [];

window.onload = function() {
	for(var i = 1, len = word.length; i < len; i++) {
		$.click(word[i], function() {
            myText.value = this.innerHTML;
            clear();
		});
		$.on(word[i], "mouseover", function() {
			word[0].className = "";
			this.className = "choose";
		});
		$.on(word[i], "mouseout", function() {
			word[0].className = "choose";
			this.className = "";
		});
	}
}

function showHint(value, e) {
	if (window.event) {
		var keynum = e.keyCode;
	}
	else if (e.which) {
		var keynum = e.which;
	}
	if (keynum !== 38 && keynum !== 40 && keynum !== 13) {  //up arrow|dn arrow|enter
		ajax(
			"prompt.php",
			{
				data: {
					q: value;
				}, 
				onsuccess: function(responseText, xhr) {
					clear();
					word[0].innerHTML = value;
					if (responseText) {
						promptWrap.style.display = "block";
						result = responseText.replace(/\s+/g, "").split(",");
						for(var i = 0, len = result.length; i < len; i++) {
							word[i + 1].innerHTML = result[i];
						}
					}
					else {
						promptWrap.style.display = "none";
					}
				}
			}
		);
	}
}

function move(e) {                    //键盘事件（上下键及回车）
	var rlen = result.length;
	if (rlen) {
		if (window.event) {
			var keynum = e.keyCode;
		}
		else if (e.which) {
			var keynum = e.which;
		}

		var index = parseInt($(".choose").id[3]);      //获取choose元素是第几个

		switch(keynum) {
			case 38:
			    word[index].className = "";
			    if (index === 0) {
			    	index = rlen;
			    }
			    else {
			    	index--;
			    }
			    word[index].className = "choose";
			    myText.value = word[index].innerHTML;
			    break;
			case 40:
			    word[index].className = "";
			    if (index === rlen) {
			    	index = 0;
			    }
			    else {
			    	index++;
			    }
			    word[index].className = "choose";
			    myText.value = word[index].innerHTML;
			    break;
			case 13:
			    clear();
		}
	}   
}

function clear() {
	for(var i = 1, len = word.length; i < len; i++) {
		word[i].innerHTML = "";
	}
	$(".choose").className = "";
	word[0].className = "choose";
	result.length = 0;
	promptWrap.style.display = "none";
}