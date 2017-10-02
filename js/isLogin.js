var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
if(loginInfo) {
	checkLogin()
}else{
	window.location.href = "login.html";
}

function checkLogin() {

	mui.ajax(config.rootUrl + "ylss/user/checkLogin.do", {
		data: {
			phoneNo: loginInfo.phoneNo,
			sessionKey: loginInfo.sessionKey,
			clientId: loginInfo.clientId,
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {

			if(data.code == "1") {
				console.log(data.msg);
//								window.location.href = "personal_msg.html";

				return true;
			} else {
				mui.toast(data.msg);

				var _temp = window.location.pathname.split("/");
				var filename = _temp[_temp.length - 1];
				if(filename == "login.html") {
					console.log(filename)
				} else {
					window.location.href = "login.html";
				}
				return false;
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.toast('网络异常，请稍后再试！');
			return false;

		}
	})
}