function showHobby() {
	var text = $(".myTextArea").value;
	text = text.replace(/[\s,，、;；]+/g, ' ');
	text = trim(text);
	var hobby = text.split(' ');
	hobby = uniqArray(hobby);

	if ((hobby.length == 1) && (hobby[0] == "")) {
		$(".error").innerHTML = "请输入至少一个爱好";
	}
	else if (hobby.length > 10) {
		$(".error").innerHTML = "爱好数量不能超过10个";
	}
	else {
		$(".error").innerHTML = '';
		if ($(".result")) {
			$(".center").removeChild($(".result"));
		}

		/*if (isIE()) {
			document.body.innerHTML = "<div class="result"><h3>爱好</h3></div>";
			for(var i = 0, len = hobby.length; i < len; i++) {
				$(.result).innerHTML = "<input type='checkbox'>" + hobby[i];
			}
		}*/

		var result = document.createElement("div");
		result.className = "result";
		var h3 = document.createElement("h3");
		h3.innerHTML = "爱好";
		result.appendChild(h3);
		for(var i = 0, len = hobby.length; i < len; i++) {
			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			result.appendChild(checkbox);
			var data = document.createTextNode(hobby[i] + " ");
			result.appendChild(data);
		}
		$(".center").appendChild(result);
	}
}

function reset() {
    $('.error').innerHTML = '';
    $('.myTextArea').value = '';
    if ($('.result')) {
        $('.center').removeChild($('.result'));
    }
}
