var search = {
	longitude: localStorage.getItem("longitude"),
	latitude: localStorage.getItem("latitude"),
	loginInfo: loginInfo,
	//	医生护士上门
	findDoctorByType: function(doctorType, searchCondition) {
		mui.ajax(config.rootUrl + "ylss/patient/findDoctorByType.do", {
			data: {
				clientId: this.loginInfo.clientId,
				phoneNo: this.loginInfo.phoneNo,
				sessionKey: this.loginInfo.sessionKey,
				longitude: this.longitude,
				latitude: this.latitude,
				pageNo: "1",
				pageSize: "8",
				doctorType: doctorType,
				searchCondition: searchCondition ? searchCondition : "",

			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				if(data.code == "1") {
					var hosInfo = data.info.doctorList;

					if(hosInfo.length == 0) {
						document.getElementById('wp').innerHTML = '<p>搜索结果为空</p>'
					} else {
						var doctorList = document.getElementById('doctorList').innerHTML;
						document.getElementById("wp").innerHTML = template(doctorList, {
							list: hosInfo
						})
					}

				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
			}
		})
	},
	//	中国名医
	getFamousDoctor: function(searchCondition) {
		mui.ajax(config.rootUrl + "ylss/patient/getFamousDoctor.do", {
			data: {
				clientId: this.loginInfo.clientId,
				phoneNo: this.loginInfo.phoneNo,
				sessionKey: this.loginInfo.sessionKey,
				longitude: this.longitude,
				latitude: this.latitude,
				pageNo: "1",
				pageSize: "3",
				searchCondition: searchCondition ? searchCondition : "",
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {

				if(data.code == "1") {
					var hosInfo = data.hospInfo;

					if(hosInfo.length == 0) {
						document.getElementById('wp').innerHTML = '<p>搜索结果为空</p>'
					} else {
						var doctorList = document.getElementById('doctorList').innerHTML;
						document.getElementById("wp").innerHTML = template(doctorList, {
							list: hosInfo
						})
					}

				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
			}
		})
	},
	//	医院
	getFamousSpecial: function(obj) {
		if(obj) {
			var searchCondition = obj.searchCondition,
				type = obj.type;
		}

		mui.ajax(config.rootUrl + "ylss/patient/getFamousSpecial.do", {
			data: {
				clientId: this.loginInfo.clientId,
				phoneNo: this.loginInfo.phoneNo,
				sessionKey: this.loginInfo.sessionKey,
				longitude: this.longitude,
				latitude: this.latitude,
				pageNo: "1",
				pageSize: "3",
				type: type ? type : "",
				searchCondition: searchCondition ? searchCondition : "",

			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {

				if(data.code == "1") {
					var hosInfo = data.hospInfo;
					console.log(hosInfo);
					if(hosInfo.length == 0) {
						document.getElementById('wp').innerHTML = '<p>搜索结果为空</p>'
					} else {
						var doctorList = document.getElementById('doctorList').innerHTML;
						document.getElementById("wp").innerHTML = template(doctorList, {
							list: hosInfo
						})
					}

				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
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
		/*if(sessionStorage.getItem("history") && firstTime) {
			var history = JSON.parse(sessionStorage.getItem("history"));
			if(type == history.type) {
				rows = history.page * history.rows;
				page = 1;
				title = history.title;
				sayStatus = history.sayStatus;
				type = history.type;
			} else {
				sessionStorage.removeItem("history");
			}
		} else if(sessionStorage.getItem("history") && flag == "up") {
			var history = JSON.parse(sessionStorage.getItem("history"));
			page = history.page * history.rows / rows + 1;
			title = history.title;
			sayStatus = history.sayStatus;
			type = history.type;
		}*/
		//首次
		/*if(title != "") {
			mui("#keyword")[0].focus();
			mui("#keyword")[0].value = title;
		}*/
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
				clientId: this.loginInfo.clientId,
				phoneNo: this.loginInfo.phoneNo,
				sessionKey: this.loginInfo.sessionKey,
				longitude: this.longitude,
				latitude: this.latitude,
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
				clientId: this.loginInfo.clientId,
				phoneNo: this.loginInfo.phoneNo,
				sessionKey: this.loginInfo.sessionKey,
				longitude: this.longitude,
				latitude: this.latitude,
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
	var info = data.info;
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
	var info = data.info;
	var listScript = document.getElementById('listScript').innerHTML;
	var wp = document.getElementById("wp");
	wp.innerHTML += template(listScript, {
		list: info
	});

}