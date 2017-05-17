function countTime() {
	var text = $('.myText').value;
	text = trim(text);
    
    var patt = new RegExp(/^\d{4}-\d{1,2}-\d{1,2}$/g);
	if (!patt.test(text)) {             //错误处理
		$(".error").innerHTML = "请按照特定的格式YYYY-MM-DD输入数字";
	}
	else {
		var time = text.split('-');
		t = setTimeout("countTime()", 1000);  //一秒执行一次此函数

		$(".error").innerHTML = "";
		if ($(".result")) {
			$(".center").removeChild($(".result"));
		}

		var endDate = new Date();
		endDate.setFullYear(time[0], time[1] - 1, time[2]);//setFullyear中月份比原本月份小1：time[1] - 1
		endDate.setHours(0, 0, 0, 0);
		var today = new Date();
		var diff = endDate - today;   //diff在此处为一个毫秒表示的时间

		if (diff <= 0) {
			$(".error").innerHTML = "请输入一个将来的时间";
			clearTimeout(t);
			return;
		}

		var p_diffDay = diff / (24 * 60 * 60 * 1000);   //相差的日期
		var diffDay = Math.floor(p_diffDay);  //floor函数输出第一个小于参数的整数
		var p_diffHour = (p_diffDay - diffDay) * 24;  //相差的小时
		var diffHour = Math.floor(p_diffHour);
		var p_diffMin = (p_diffHour - diffHour) * 60;  //相差的分钟
		var diffMin = Math.floor(p_diffMin);
		var p_diffSec = (p_diffMin - diffMin) * 60;  //相差的秒数
		var diffSec = Math.floor(p_diffSec); 

		var result = document.createElement("div");
		result.className = "result";
		$(".center").appendChild(result);
		var h3 = document.createElement("h3");
		h3.innerHTML = "倒计时";
		result.appendChild(h3);
		var pTime = document.createElement("p");
		pTime.innerHTML = "距离" + time[0] + "年" + time[1] + "月" + time[2] + "日还有" + diffDay + "天" + diffHour + "小时" + diffMin + "分" + diffSec + "秒";
		result.appendChild(pTime);
	}
}

function reset() {
	clearTimeout(t);
	$(".error").innerHTML = "";
	$(".myText").value = "";
	if ($(".result")) {
		$(".center").removeChild($(".result"));
	}
}