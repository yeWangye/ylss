//获取医院详情函数
function getDoctorDetail() {

	if(localStorage.getItem("loginInfo")) {
		var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

	} else {
		loginInfo = {
			clientId: "1172",
			sessionKey: "11",
			phoneNo: "15201251945"
		}
	}

	mui.ajax("http://ylss.ss0120.com:8080/ylss/patient/getDoctorEvaluat.do", {
		data: {
			doctorId: doctorId,
			longitude: localStorage.getItem("longitude"),
			latitude: localStorage.getItem("latitude"),
			pageSize: 3,
			pageNo: 1,
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			var doctInfo = data.doctInfo;
			var einfo = data.info.evalList;
			console.log(JSON.stringify(data));

			mui(".hosImg")[0].src = doctInfo.headImage;
			mui(".instruction")[0].innerText += doctInfo.introduction;
			mui(".fucsItm")[0].innerText = doctInfo.serviceTime + "次";
			mui(".gznxItem")[0].innerText = doctInfo.workAge + "年";
			mui(".jlItem")[0].innerText = doctInfo.length + "km";

			mui(".hosImg")[0].src = doctInfo.headImage;

			mui(".attendDisease")[0].innerText = doctInfo.specials;

			localStorage.setItem("username", loginInfo.phoneNo);
			localStorage.setItem("password", loginInfo.hxPwd);
			//聊天对象账号缓存
			localStorage.setItem("hxPhone", doctInfo.doctorPhone);
			console.log("hxPhone" + localStorage.getItem("hxPhone"));

			localStorage.setItem("chatname", doctInfo.doctorName);
			//聊天界面用作头像显示
			localStorage.setItem("receiverAvatar", doctInfo.headImage);
			localStorage.setItem("hosAddress", doctInfo.hospitalAddress);
			for(i = 0; i < einfo.length; i++) {
				if(einfo[i].patientImage == "") {
					einfo[i].patientImage = "images/common/tx.png";
				}
				if(einfo[i].patientName == "") {
					einfo[i].patientName = "未命名用户";
				}
				var timeStamp = einfo[i].createTime;
				var newDate = new Date(timeStamp);
				var _html = '<div class="userEvaluateBox">' +
					'<div class="userHead">' +
					'<img src="' + einfo[i].patientImage + '" class="userHeadImg" />' +
					'</div>' +
					'<div class="userInfo">' +
					'<h5 class="userName">' + einfo[i].patientName + '</h5>' +
					'<ul class="starBox"  data-star-num=' + einfo[i].satisfaction + '>' +

					'</ul>' +
					'<p class="userEvaluate">' + einfo[i].evaluation + '</p>' +
					'<div class="systemEvaluate">' +
					'<img src="images/common/icon_system.png" style="float:left" />' +
					'<p style="line-height: 30px;width: 300px;">环境好；医疗设备齐全；服务好</p>' +
					'</div>' +
					'</div>' +
					'<div class="evaluateDate">' +
					'<p>' + newDate.format('yyyy-MM-dd h:m:s') + '</p>' +
					'</div></div>';
				mui("#item1 .evaluate")[0].innerHTML += _html;

			}
			drawStar();

		},
		error: function(xhr, type, errorThrown) {
			mui.toast('网络异常，请稍后再试！');
		}
	});
}
//添加format方法
Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if(/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for(var k in date) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
				date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}
//构建评论dom结构函数
function setEvaluate(type, pageSize, pageNo) {
	mui.ajax("http://ylss.ss0120.com:8080/ylss/patient/listDoctorEvaluat.do", {
		data: {
			doctorId: doctorId,
			pageNo: pageNo,
			type: type == "all" ? "" : type,
			pageSize: pageSize,
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			console.log(data);
			var info = data.info;
			var einfo = data.einfo;
			var tempInfo = data.tempInfo;
			if(type == "all") {
				for(i = 0; i < tempInfo.length; i++) {
					var systemEvaluateBox = mui(".systemEvaluateBox")[0];
					if(mui(".systemEvaluateItem").length == 0) {
						systemEvaluateBox.innerHTML += '<div class="systemEvaluateItem"><p>' + tempInfo[i].evaLabel + '(' + tempInfo[i].count + ')</p></div>';
					}
				}
				mui(".allEvaluation")[0].innerHTML = einfo.allEvaluat;
				mui(".goodEvaluation")[0].innerHTML = einfo.goodEvaluat;
				mui(".commonEvaluation")[0].innerHTML = einfo.commonEvaluat;
				mui(".badEvaluation")[0].innerHTML = einfo.badEvaluat;
			}
			for(i = 0; i < info.length; i++) {
				var timeStamp = info[i].createTime;
				var newDate = new Date(timeStamp);
				if(info[i].patientImage == "") {
					info[i].patientImage = "images/common/tx.png";
				}
				if(info[i].patientName == "") {
					info[i].patientName = "未命名用户";
				}
				var _html = '<div class="userEvaluateBox">' +
					'<div class="userHead">' +
					'<img src="' + info[i].patientImage + '" class="userHeadImg" />' +
					'</div>' +
					'<div class="userInfo">' +
					'<h5 class="userName">' + info[i].patientName + '</h5>' +
					'<ul class="starBox"  data-star-num=' + info[i].satisfaction + '>' +

					'</ul>' +
					'<p class="userEvaluate">' + info[i].evaluation + '</p>' +
					'<div class="systemEvaluate">' +
					'<img src="images/common/icon_system.png" style="float:left" />' +
					'<p style="line-height: 30px;width: 300px;">服务好</p>' +
					'</div>' +
					'</div>' +
					'<div class="evaluateDate">' +
					'<p>' + newDate.format('yyyy-MM-dd h:m:s') + '</p>' +
					'</div></div>';

				switch(type) {
					case "good":
						mui("#itemGood .evaluate")[0].innerHTML += _html;

						break;
					case "common":
						//					mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageSize * pageNo >= einfo.commonEvaluat));
						mui("#itemCommon .evaluate")[0].innerHTML += _html;
						break;
					case "bad":
						//					mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageSize * pageNo >= einfo.badEvaluat));
						mui("#itemBad .evaluate")[0].innerHTML += _html;
						break;
					case "all":
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageSize * pageNo >= einfo.allEvaluat));
						mui("#itemAll .evaluate")[0].innerHTML += _html;
						break;

				}

			}
			drawStar();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了

		},
		error: function(xhr, type, errorThrown) {
			mui.toast('网络异常，请稍后再试！');
		}
	});
}
//绘制星星函数
function drawStar() {
	var star = mui(".starBox");
	for(i = 0; i < star.length; i++) {
		star[i].innerHTML = "";
		var starNum = star[i].getAttribute("data-star-num");

		for(j = 0; j < starNum; j++) {

			star[i].innerHTML += '<li>' +
				'<img src="images/common/icon_star.png" class="star"/>' +
				'</li>';
		}

	}
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	getDoctorDetail();
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 1;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	var allEvaluation = mui(".allEvaluation")[0].innerHTML;
	var goodEvaluation = mui(".goodEvaluation")[0].innerHTML;

	var commonEvaluation = mui(".commonEvaluation")[0].innerHTML;
	var badEvaluation = mui(".badEvaluation")[0].innerHTML;

	/*if(allEvaluation-(8*count)>=0){

		console.log(allEvaluation-(8*count));
		
	}else{
		console.log("allEvaluation-(8*count):"+allEvaluation-(8*count));
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
		
	}*/
	/*setEvaluate("all", allEvaluation-(8*count), 8*count);
	setEvaluate("good", goodEvaluation-(4*count), 4*count);
	setEvaluate("common", commonEvaluation-(4*count), 4*count);
	setEvaluate("bad", badEvaluation-(4*count), 4*count);*/
	//全部评价
	setEvaluate("all", 8, count);
	//好评
	setEvaluate("good", 4, count);
	//中评
	setEvaluate("common", 8, count);
	//差评
	setEvaluate("bad", 8, count);
	count++;
}