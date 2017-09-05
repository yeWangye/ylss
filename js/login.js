/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(loginInfo.account.length != 11) {
			return mui.toast('手机号不正确');
		}
		if(loginInfo.password.length != 4) {
			return mui.toast('验证码不正确');
		}
		mui.ajax("http://192.168.0.166:8080/ylss/user/clientlogin.do", {
			data: {
				phoneNo: loginInfo.account,
				password: loginInfo.password,
				platform: "html5",
				deviceToken: "",
				userType: "patient"
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//							plus.nativeUI.closeWaiting();
				console.log("login begain:" + JSON.stringify(data));
				if(data.code == "1") {
					mui.toast(data.msg);
					var info=JSON.stringify(data.info);
					localStorage.setItem("loginInfo",info);
					localStorage.setItem("loginInfo_temp",info);
					window.location.href="index.html";

				} else if(data.code == "0") {
					mui.toast("验证失败，请重新获取");
				}

			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
			}
		})

	};

}(mui, window.app = {}));