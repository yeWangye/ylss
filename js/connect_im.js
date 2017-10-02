//	注册

function imReg() {
	var options = {
		username: loginInfo.phoneNo,
		password: loginInfo.hxPwd,
		nickname: loginInfo.hxNick,
		appKey: Easemob.im.config.appkey,
		success: function(result) {
			//注册成功;
			console.log(JSON.stringify(result))
		},
		error: function(e) {
			//如果用户存在就直接跳转
			if(e.error == "duplicate_unique_property_exists") {
				console.log('用户已经存在');

			}
		}
	};
	Easemob.im.Helper.registerUser(options);
}
//登陆
function imLog() {
	var options = {
		user: loginInfo.phoneNo,
		pwd: loginInfo.hxPwd,
		appKey: Easemob.im.config.appkey,
		success: function(data) {
			var imLogInfo = JSON.stringify(data);
			sessionStorage.setItem("imLogInfo", imLogInfo);
			mui.toast("聊天服务器连接成功!");

		},
		error: function(e) {
			console.log("1次登录失败 :" + e.error_description);
		}
	};
	Easemob.im.Helper.login2UserGrid(options);
}
if(sessionStorage.getItem("imLogInfo")) {
	var imLogInfo = JSON.parse(sessionStorage.getItem("imLogInfo")),
		expires_in = imLogInfo.expires_in;
	/*if(){
		
	}*/

} else {
	imReg();
	imLog();

	// 页面传参数事件监听

}
var conn = new Easemob.im.Connection();
conn.init({
	onOpened: function() {
//		mui.toast("成功登录");
		conn.setPresence();
	},
	// 收到文本消息时的回调函数
	onTextMessage: function(message) {
		console.log(message);
	},
	// 收到图片消息时的回调函数
	onPictureMessage: function(message) {
		console.log(message);
	},

});
// 打开连接
conn.open({
	user: loginInfo.phoneNo,
	pwd: loginInfo.hxPwd,
	appKey: Easemob.im.config.appkey
});