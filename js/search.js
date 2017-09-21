var search = {
	longitude: localStorage.getItem("longitude"),
	latitude: localStorage.getItem("latitude"),
	loginInfo: loginInfo,
	//	医生护士上门
	findDoctorByType: function(doctorType, searchCondition) {
		mui.ajax(config.rootUrl+"ylss/patient/findDoctorByType.do", {
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
				console.log(JSON.stringify(data));
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
		mui.ajax(config.rootUrl+"ylss/patient/getFamousDoctor.do", {
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
				console.log(JSON.stringify(data));
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
	//	中国名院
	getFamousSpecial: function(searchCondition) {
		mui.ajax(config.rootUrl+"ylss/patient/getFamousSpecial.do", {
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
				console.log(JSON.stringify(data));
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
	//	找医院
	getHospitalList: function(data) {
		var searchCondition = data.searchCondition || {};
		var callback = data.callback;
		var pageSize = data.pageSize;
		var pageNo = data.pageNo;
		var flag = data.flag;
		mui.ajax(config.rootUrl+"ylss/patient/getHospitalList.do", {
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
				console.log(JSON.stringify(data));
				if(data.code == "1") {
					var hosInfo = data.info;
					var pageCount = data.pageCount;
					if(hosInfo.length == 0) {
						
						if(callback) {
							callback(pageCount == pageNo)
						};
					} else {
						if(flag == "down") {
							console.log(pageNo);
							var doctorList = document.getElementById('doctorList').innerHTML;
							document.getElementById("wp").innerHTML = template(doctorList, {
								list: hosInfo
							})
						} else {
							console.log(pageNo);
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