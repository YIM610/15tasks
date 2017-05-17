var promptWrap = $(".prompt-wrap");
var myText = $(".myText");
var word = $(".prompt-wrap").getElementsByTagName("li");
var result = [];

window.onload = function() {
	for(var i = 1, len = word.length; i < len; i++) {
		$.click(word[i], function() {
            myText.value = this.innerHTML;
            clear();                  //clear()防止数据的叠加
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
	if (keynum !== 38 && keynum !== 40 && keynum !== 13) {
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