var longitude = localStorage.getItem("longitude");
var latitude = localStorage.getItem("latitude");

var search = {
	//	医生护士上门
	findDoctorByType: function(data) {
		var pageNo=data.pageNo;
		var pageSize=data.pageSize;
		var doctorType=data.doctorType;
		var callback=data.callback;
		var flag=data.flag;
		var searchCondition=data.searchCondition||"";
		if(sessionStorage.getItem("ajaxs") && firstTime) {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			for(var i in ajaxs) {
				firstCall(ajaxs[i]);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
//			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			 
//			mui('#pullrefresh').pullRefresh().refresh(true);
			firstTime = false;

			return;
			//					sessionStorage.removeItem("ajaxs");

		} else if(sessionStorage.getItem("ajaxs") && flag == "up") {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			var ajaxLast = ajaxs[ajaxs.length - 1];
			var pageNow = ajaxLast.history.page;
			pageNo = pageNow + 1;
		}
		mui.ajax(config.rootUrl + "ylss/patient/findDoctorByType.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
				longitude: longitude,
				latitude: latitude,
				pageNo: pageNo,
				pageSize: pageSize,
				doctorType: doctorType,
				searchCondition:searchCondition
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				var ajaxs = [];
				if(data.code == "1") {
					var data = data;
					var history = {
						page: pageNo,
						rows: pageSize,
					};
					data.history = history;
					firstTime = false;
					if(sessionStorage.getItem("ajaxs")) {
						ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
					}

					ajaxs.push(data);
					sessionStorage.setItem("ajaxs", JSON.stringify(ajaxs));

					data.callback = callback;
					data.flag = flag;

					if(successCall(data)) {
						return;
					};

				} else {
					mui.toast("获取信息出错");

				}
				if(callback) {
					callback();
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
				if(callback) {
					callback();
				}
			}
		})
	},
	//	中国名医
	getFamousDoctor: function(data) {
		var searchCondition = data.searchCondition || "",
			pageSize = data.pageSize || 3,
			pageNo = data.pageNo || 1,
			callback=data.callback,

			flag=data.flag;

		if(sessionStorage.getItem("ajaxs") && firstTime) {

			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			for(var i in ajaxs) {
				if(ajaxs[i].history.title != "") {
					mui("#keyword")[0].focus();
					mui("#keyword")[0].value = ajaxs[i].history.title;
				}
				firstCall(ajaxs[i]);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			 
//			mui('#pullrefresh').pullRefresh().refresh(true);
			firstTime = false;

			return;
			//					sessionStorage.removeItem("ajaxs");

		} else if(sessionStorage.getItem("ajaxs") && flag == "up") {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			var ajaxLast = ajaxs[ajaxs.length - 1];
			var pageNow = ajaxLast.history.page;
			var titleNow = ajaxLast.history.title;
			pageNo = pageNow + 1;
			searchCondition = titleNow;
		}
		mui.ajax(config.rootUrl + "ylss/patient/getFamousDoctor.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
				longitude: longitude,
				latitude: latitude,
				pageNo: pageNo,
				pageSize: pageSize,
				searchCondition: searchCondition,
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				var ajaxs = [];
				if(data.code == "1") {
					var data = data;
					var history = {
						page: pageNo,
						rows: pageSize,
						title: searchCondition,
					};
					data.history = history;
					firstTime = false;
					if(sessionStorage.getItem("ajaxs")) {
						ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
					}

					ajaxs.push(data);
					sessionStorage.setItem("ajaxs", JSON.stringify(ajaxs));

					data.callback = callback;
					data.flag = flag;

					if(successCall(data)) {
						return;
					};

				} else {
					mui.toast("获取信息出错");

				}
				if(callback) {
					callback();
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
				if(callback) {
					callback();
				}
			}
		})
	},
	//	医院
	getFamousSpecial: function(data) {
		var searchCondition = data.searchCondition || "",
			pageSize = data.pageSize || 3,
			pageNo = data.pageNo || 1,
			callback=data.callback,

			flag=data.flag;

		if(sessionStorage.getItem("ajaxs") && firstTime) {

			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			for(var i in ajaxs) {
				if(ajaxs[i].history.title != "") {
					mui("#keyword")[0].focus();
					mui("#keyword")[0].value = ajaxs[i].history.title;
				}
				firstCall(ajaxs[i]);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			 
//			mui('#pullrefresh').pullRefresh().refresh(true);
			firstTime = false;

			return;
			//					sessionStorage.removeItem("ajaxs");

		} else if(sessionStorage.getItem("ajaxs") && flag == "up") {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			var ajaxLast = ajaxs[ajaxs.length - 1];
			var pageNow = ajaxLast.history.page;
			var titleNow = ajaxLast.history.title;
			pageNo = pageNow + 1;
			searchCondition = titleNow;
		}
		mui.ajax(config.rootUrl + "ylss/patient/getFamousSpecial.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
				longitude: longitude,
				latitude: latitude,
				pageNo: pageNo,
				pageSize: pageSize,
				type:type,
				searchCondition: searchCondition,
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				var ajaxs = [];
				if(data.code == "1") {
					var data = data;
					var history = {
						page: pageNo,
						rows: pageSize,
						title: searchCondition,
					};
					data.history = history;
					firstTime = false;
					if(sessionStorage.getItem("ajaxs")) {
						ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
					}else if(data.hospInfo==0){
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
						mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
						mui(".noData")[0].style.display="block";
						return;
					}

					ajaxs.push(data);
					sessionStorage.setItem("ajaxs", JSON.stringify(ajaxs));

					data.callback = callback;
					data.flag = flag;

					if(successCall(data)) {
						return;
					};

				} else {
					mui.toast("获取信息出错");

				}
				if(callback) {
					callback();
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
				if(callback) {
					callback();
				}
			}
		})
	},
	//	曝光台,名优榜列表
	listForumSay: function(data) {
		var callback = data.callback;
		var page = data.page;
		var rows = data.rows;
		var sayStatus = data.sayStatus || "";
		var title = data.title || "";
		var type = data.type;
		var flag = data.flag || "";

		if(sessionStorage.getItem("ajaxs") && firstTime) {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			for(var i in ajaxs) {
				if(ajaxs[i].history.title != "") {
					mui("#keyword")[0].focus();
					mui("#keyword")[0].value = ajaxs[i].history.title;
				}
				firstCall(ajaxs[i]);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			mui('#pullrefresh').pullRefresh().refresh(true);
			firstTime = false;

			return;
			//					sessionStorage.removeItem("ajaxs");

		} else if(sessionStorage.getItem("ajaxs") && flag == "up") {
			var ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
			var ajaxLast = ajaxs[ajaxs.length - 1];
			var pageNow = ajaxLast.history.page;
			var titleNow = ajaxLast.history.title;
			page = pageNow + 1;
			title = titleNow;
		}
		mui.ajax(config.rootUrl + "ylss/patient/listForumSay.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
				longitude: longitude,
				latitude: latitude,
				page: page,
				rows: rows,
				sayStatus: sayStatus,
				title: title,
				type: type,
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				var ajaxs = [];
				if(data.code == "1") {
					var data = data;
					var history = {
						page: page,
						rows: rows,
						title: title,
					};
					data.history = history;
					firstTime = false;
					if(sessionStorage.getItem("ajaxs")) {
						ajaxs = JSON.parse(sessionStorage.getItem("ajaxs"));
					}

					ajaxs.push(data);
					sessionStorage.setItem("ajaxs", JSON.stringify(ajaxs));

					data.callback = callback;
					data.flag = flag;

					if(successCall(data)) {
						return;
					};

				} else {
					mui.alert("获取信息出错!")
				}
				if(callback) {
					callback();
				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
				if(callback) {
					callback()
				};

			},
			/*complete: function() {
				if(sessionStorage.getItem("scrollY")) {
					var scrollY = sessionStorage.getItem("scrollY");
					mui('.mui-scroll-wrapper').scroll().scrollTo(0, scrollY, 100);
					mui('.mui-scroll-wrapper').scroll().resetPosition(true);
				}
			}*/
		})

	},
	//	找医院
	getHospitalList: function(data) {
		var searchCondition = data.searchCondition || {};
		var callback = data.callback;
		var pageSize = data.pageSize;
		var pageNo = data.pageNo;
		var flag = data.flag;
		mui.ajax(config.rootUrl + "ylss/patient/getHospitalList.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
				longitude: longitude,
				latitude: latitude,
				pageNo: pageNo,
				pageSize: pageSize,
				searchCondition: searchCondition ? searchCondition : "",

			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {

				if(data.code == "1") {
					var hosInfo = data.info;
					var pageCount = data.pageCount;
					if(hosInfo.length == 0) {

						if(callback) {
							callback(pageCount == pageNo)
						};
					} else {
						if(flag == "down") {

							var doctorList = document.getElementById('doctorList').innerHTML;
							document.getElementById("wp").innerHTML = template(doctorList, {
								list: hosInfo
							})
						} else {

							var doctorList = document.getElementById('doctorList').innerHTML;
							document.getElementById("wp").innerHTML += template(doctorList, {
								list: hosInfo
							})
						}

					}
					if(callback) {
						callback(pageCount == pageNo)
					};

				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');

				if(callback) {
					callback()
				};

			}
		})
	}
}

function successCall(data) {
	var callback = data.callback;
	
	var flag = data.flag;
	var info = data.info||data.hospInfo;
	//养生理疗获取
	if(info.doctorList){
		info=info.doctorList;
	}
	if(info.length == 0) {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //refresh completed
		return true;
	}
	var listScript = document.getElementById('listScript').innerHTML;
	var wp = document.getElementById("wp");
	if(flag == "down") {
		wp.innerHTML = template(listScript, {
			list: info
		});
		sessionStorage.removeItem("ajaxs");
		var ajaxs = [];
		ajaxs.push(data);
		sessionStorage.setItem("ajaxs", JSON.stringify(ajaxs));
	} else {
		wp.innerHTML += template(listScript, {
			list: info
		});
	}
}

function firstCall(data) {
	var info = data.info||data.hospInfo;
	//养生理疗获取
	if(info.doctorList){
		info=info.doctorList;
	}
	var listScript = document.getElementById('listScript').innerHTML;
	var wp = document.getElementById("wp");
	wp.innerHTML += template(listScript, {
		list: info
	});

}
mui('body').on('tap', 'a', function() {
				document.location.href = this.href;
})