var search = {
	longitude: localStorage.getItem("longitude"),
	latitude: localStorage.getItem("latitude"),
	//	医生护士上门
	findDoctorByType: function(doctorType, searchCondition) {
		if(localStorage.getItem("loginInfo")) {
			var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		} else {
			loginInfo = {
				clientId: "1172",
				sessionKey: "11",
				phoneNo: "15201251945"
			}
		}
		mui.ajax("http://ylss.ss0120.com:8080/ylss/patient/findDoctorByType.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
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
		if(localStorage.getItem("loginInfo")) {
			var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		} else {
			loginInfo = {
				clientId: "1172",
				sessionKey: "11",
				phoneNo: "15201251945"
			}
		}
		mui.ajax("http://ylss.ss0120.com:8080/ylss/patient/getFamousDoctor.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
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
	getFamousSpecial: function(searchCondition) {
		if(localStorage.getItem("loginInfo")) {
			var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		} else {
			loginInfo = {
				clientId: "1172",
				sessionKey: "11",
				phoneNo: "15201251945"
			}
		}
		mui.ajax("http://ylss.ss0120.com:8080/ylss/patient/getFamousSpecial.do", {
			data: {
				clientId: loginInfo.clientId,
				phoneNo: loginInfo.phoneNo,
				sessionKey: loginInfo.sessionKey,
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
	}
}